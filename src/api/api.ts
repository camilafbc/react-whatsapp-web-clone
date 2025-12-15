import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();


export const loginGoogle = async () => {
    try {
        // Chama a função signInWithPopup passando a instância do Auth e o Provedor
        const result = await signInWithPopup(auth, googleProvider);

        // O 'result' contém as credenciais e as informações do usuário logado
        const user = result.user;
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        
        // Se precisar do Token de Acesso do Google (para usar outras APIs do Google):
        // const token = credential.accessToken;
        
        return user; // Retorna o objeto do usuário logado

    } catch (error: any) {
        // Trata Erros (Ex: o usuário fechou o pop-up, erro de rede, etc.)
        console.error("Erro no login com Google:", error.code, error.message);
        
        // Se você precisar de informações específicas do erro do Google Auth:
        if (error.code === 'auth/popup-closed-by-user') {
            console.log("Pop-up de login fechado pelo usuário.");
        }
        
        return null; 
    }
};