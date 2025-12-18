import { loginGoogle } from "../api/api";
import GoogleIcon from "@mui/icons-material/Google";

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
    <div className="h-screen w-full flex items-center justify-center ">
      <button
        className="bg-[#00BFA5] w-[250px] h-12 flex items-center justify-center cursor-pointer text-white font-semibold text-lg gap-2 shadow rounded-full hover:bg-[#00BFA5]/90 outline-none"
        onClick={handleLogin}
      >
        <GoogleIcon /> Logar com Google
      </button>
    </div>
  );
};
