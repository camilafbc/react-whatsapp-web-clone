import { loginGoogle } from "../api/api";

type LoginProps = {
  onReceive: (user: {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
  }) => void;
};

export const Login = ({ onReceive }: LoginProps) => {
  const handleLogin = async () => {
    const user = await loginGoogle();

    if (user) {
      onReceive(user);
    } else {
      console.log("Falha no login ou usuário cancelou.");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <button onClick={handleLogin}>Logar com Google</button>
    </div>
  );
};
