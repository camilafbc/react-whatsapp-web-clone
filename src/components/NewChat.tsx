import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import type { User } from "../types/User";

type NewChatProps = {
  chatList: any[];
  user: User;
  show: boolean;
  setShow: (v: boolean) => void;
};

export const NewChat = ({ show, setShow }: NewChatProps) => {
  const [list, setList] = useState([
    {
      id: 12,
      avatar:
        "https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg",
      nome: "Teste",
    },
    {
      id: 12,
      avatar:
        "https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg",
      nome: "Teste",
    },
    {
      id: 12,
      avatar:
        "https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg",
      nome: "Teste",
    },
    {
      id: 12,
      avatar:
        "https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg",
      nome: "Teste",
    },
  ]);

  const handleBack = () => {
    setShow(false);
  };

  return (
    <div
      className={`w-[35%] max-w-[415px] fixed ${
        show ? "left-0 " : "left-[-415px]"
      } top-0 bottom-0 bg-white flex flex-col border-r border transition`}
    >
      <div className="flex bg-[#00BFA5] items-center px-4 pt-14 pb-4">
        <button
          onClick={handleBack}
          className="rounded-full  flex justify-center items-center "
        >
          <ArrowBackIcon
            style={{
              color: "#FFFFFF",
              height: 40,
              width: 40,
              cursor: "pointer",
            }}
          />
          <div className="text-white text-lg h-10 flex-1 font-bold ml-5 leading-10">
            Nova Conversa
          </div>
        </button>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto new-chat-list">
        {list.map((item, key) => (
          <div
            key={key}
            className="flex items-center p-4 cursor-pointer hover:bg-[#F5F5F5]"
          >
            <img src={item.avatar} className="rounded-full size-12 mr-4" />
            <div className="text-lg font-semibold">{item.nome}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
