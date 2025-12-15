import "./App.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { ChatListItem } from "./components/ChatListItem";
import { ChatIntro } from "./components/ChatIntro";
import { ChatWindow } from "./components/ChatWindow";
import { NewChat } from "./components/NewChat";
import { Login } from "./components/Login";
import type { User } from "./types/User";
import { addUser } from "./api/api";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [chatList, setChatList] = useState([
    {
      chatId: 1,
      title: "Dua Lipa",
      image: "https://avatars.githubusercontent.com/u/97132028?v=4",
    },
    {
      chatId: 2,
      title: "Dua Lipa",
      image: "https://avatars.githubusercontent.com/u/97132028?v=4",
    },
    {
      chatId: 3,
      title: "Dua Lipa",
      image: "https://avatars.githubusercontent.com/u/97132028?v=4",
    },
    {
      chatId: 4,
      title: "Dua Lipa",
      image: "https://avatars.githubusercontent.com/u/97132028?v=4",
    },
  ]);

  const [activeChat, setActiveChat] = useState({});
  const [showNewChat, setShowNewChat] = useState(false);

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  const handleLoginData = async (user: {
    uid: number;
    displayName: string;
    photoURL: string;
  }) => {
    const newUser = {
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
    };

    await addUser(newUser);

    if (newUser) {
      setUser(newUser);
    }
  };

  if (user === null) {
    return <Login onReceive={handleLoginData} />;
  }

  return (
    <div className="flex h-screen bg-[#EDEDED]">
      {/* Sidebar */}
      <aside className="w-[35%] max-w-[415px] flex flex-col border-r border-[#DDD]">
        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header className="h-16 flex items-center justify-between px-4 w-full">
          <img
            src={user.avatar}
            alt="imagem de perfil do usuário"
            className="rounded-full size-10 cursor-pointer"
          />
          <div className="flex">
            <button className="size-10 rounded-full cursor-pointer flex justify-center items-center">
              <DonutLargeIcon style={{ color: "#919191" }} />
            </button>
            <button
              onClick={handleNewChat}
              className="size-10 rounded-full cursor-pointer flex justify-center items-center"
            >
              <ChatIcon style={{ color: "#919191" }} />
            </button>
            <button className="size-10 rounded-full cursor-pointer flex justify-center items-center">
              <MoreVertIcon style={{ color: "#919191" }} />
            </button>
          </div>
        </header>
        <div className="bg-[#F6F6F6] border-b border-[#EEE] py-2 px-4">
          <div className=" bg-white h-10 rounded-full flex items-center px-3">
            <SearchIcon fontSize="small" style={{ color: "#919191" }} />
            <input
              type="search"
              placeholder="Procurar ou começar nova conversa"
              className="flex-1 border-none outline-none bg-transparent ml-2"
            />
          </div>
        </div>
        <div className="flex-1 bg-white overflow-y-auto chat-list">
          {chatList.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </aside>
      {/* Content */}
      <div className="flex-1">
        {activeChat.chatId !== undefined && <ChatWindow user={user} />}
        {activeChat.chatId == undefined && <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
