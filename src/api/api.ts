import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import type { User, UserChat } from "../types/User";
import type { Dispatch, SetStateAction } from "react";
import { firebaseConfig } from "../firebaseConfig.ts";

console.log("firebaseConfig: ", firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const loginGoogle = async (): Promise<{
  uid: string;
  displayName: string | null;
  photoURL: string | null;
} | null> => {
  try {
    // Chama a função signInWithPopup passando a instância do Auth e o Provedor
    const result = await signInWithPopup(auth, googleProvider);

    // Contém as credenciais e as informações do usuário logado
    const user = result.user;

    return user;
  } catch (error: unknown) {
    console.error("Erro no login com Google:", error);
    return null;
  }
};

export const addUser = async (user: User) => {
  // Cria uma referência ao documento (instância do db, nome da coleção, id)
  const userRef = doc(db, "users", user.id);

  // faz o envio dos dados
  await setDoc(
    userRef,
    {
      name: user.name,
      avatar: user.avatar,
    },
    { merge: true } // preserva o documento atualizando os campos necessários
  );
};

export const getContactList = async (userId: string) => {
  const usersRef = collection(db, "users");
  const usersList = (await getDocs(usersRef)).docs.map((userDoc) => {
    return {
      id: userDoc.id,
      name: userDoc.data().name,
      avatar: userDoc.data().avatar,
    };
  });

  const list = usersList.filter((c) => c.id !== userId);
  return list;
};

export const addNewChat = async (user: User, contact: User) => {
  const chatsRef = collection(db, "chats");
  const newChatRef = doc(chatsRef);
  const userRef = doc(db, "users", user.id);
  const contactRef = doc(db, "users", contact.id);

  await setDoc(newChatRef, {
    messages: [],
    users: [user.id, contact.id],
  });

  await updateDoc(userRef, {
    chats: arrayUnion({
      chatId: newChatRef.id,
      title: contact.name,
      image: contact.avatar,
      with: contact.id,
    }),
  });

  await updateDoc(contactRef, {
    chats: arrayUnion({
      chatId: newChatRef.id,
      title: user.name,
      image: user.avatar,
      with: user.id,
    }),
  });
};

export const onChatList = (
  userId: string,
  setChatList: Dispatch<SetStateAction<UserChat[]>>
) => {
  const userRef = doc(db, "users", userId);

  // Configura o listener em tempo real (onSnapshot)
  const unsubscribe = onSnapshot(userRef, (docSnap) => {
    // Verifica se o documento existe
    if (docSnap.exists()) {
      const userData = docSnap.data();

      // Verifica e atualiza a lista de chats
      if (userData.chats) {
        const chats = [...userData.chats];
        chats.sort((a, b) => {
          if (!a.lastMessageDate && !b.lastMessageDate) return 0;
          if (!a.lastMessageDate) return 1; // a vai para o final
          if (!b.lastMessageDate) return -1; // b vai para o final

          return b.lastMessageDate.seconds - a.lastMessageDate.seconds;
        });

        setChatList(chats);
      }
    }
  });

  return unsubscribe;
};

export const onChatContent = (
  chatId: string,
  setList: Dispatch<SetStateAction<never[]>>,
  setUsers: Dispatch<SetStateAction<never[]>>
) => {
  const chatsRef = doc(db, "chats", chatId);

  // Configura o listener em tempo real (onSnapshot)
  const unsubscribe = onSnapshot(chatsRef, (docSnap) => {
    // Verifica se o documento existe
    if (docSnap.exists()) {
      const chatsData = docSnap.data();

      // Verifica e atualiza a lista de chats
      if (chatsData.messages) {
        setList(chatsData.messages);
        setUsers(chatsData.users);
      }
    }
  });

  return unsubscribe;
};

export const sendMessage = async (
  chatData: UserChat,
  userId: string,
  type: string,
  body: string,
  users: string[]
) => {
  const chatsRef = doc(db, "chats", chatData.chatId);
  const now = new Date();

  updateDoc(chatsRef, {
    messages: arrayUnion({
      type: type,
      author: userId,
      body: body,
      date: now,
    }),
  });

  for (const i in users) {
    const uId = users[i];

    // Obtém o documento do usuário
    const userRef = doc(db, "users", uId);
    const userSnap = await getDoc(userRef);

    // Verifica se o documento existe
    if (userSnap.exists()) {
      const uData = userSnap.data();

      if (uData.chats) {
        // Cria uma cópia do array 'chats'
        const chats = [...uData.chats];

        // Itera sobre os chats do usuário
        for (const e in chats) {
          // Se o chatId corresponder, atualiza as informações da última mensagem
          if (chats[e].chatId === chatData.chatId) {
            chats[e].lastMessage = body;
            chats[e].lastMessageDate = now;
          }
        }

        // 3. ATUALIZA o documento do usuário no Firestore com o array 'chats' modificado
        updateDoc(userRef, {
          chats: chats,
        });
      }
    }
  }
};
