import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const loginGoogle = async () => {
  try {
    // Chama a função signInWithPopup passando a instância do Auth e o Provedor
    const result = await signInWithPopup(auth, googleProvider);

    // Contém as credenciais e as informações do usuário logado
    const user = result.user;

    return user;
  } catch (error: any) {
    console.error("Erro no login com Google:", error.code, error.message);
    return null;
  }
};

export const addUser = async (user) => {
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
