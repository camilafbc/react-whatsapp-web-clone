import { loginGoogle } from "../api/api";

type LoginProps = {
  onReceive: (result: any) => void;
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
    <div className="">
      <button onClick={handleLogin}>Logar com Google</button>
    </div>
  );
};
