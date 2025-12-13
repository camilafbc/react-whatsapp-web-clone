import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";

export const ChatWindow = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* header */}
      <div className="h-16 border-b border-[#CCCCCC] flex justify-between items-center px-4">
        <div className="flex items-center cursor-pointer">
          <img
            src="https://avatars.githubusercontent.com/u/97132028?v=4"
            alt="user avatar"
            className="rounded-full size-10 cursor-pointer mx-4"
          />
          <div className="font-semibold text-lg">Camila</div>
        </div>

        <div className="flex">
          <button className="size-10 rounded-full cursor-pointer flex justify-center items-center">
            <SearchIcon style={{ color: "#919191" }} />
          </button>
          <button className="size-10 rounded-full cursor-pointer flex justify-center items-center">
            <AttachFileIcon style={{ color: "#919191" }} />
          </button>
          <button className="size-10 rounded-full cursor-pointer flex justify-center items-center">
            <MoreVertIcon style={{ color: "#919191" }} />
          </button>
        </div>
      </div>
      {/* body */}
      <div className="flex-1 bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)] overflow-y-auto  bg-cover bg-center"></div>
      {/* footer */}
      <div className="flex justify-between h-20 items-center px-4">
        <div className="flex">
          <button className="size-10 rounded-full cursor-pointer flex justify-center items-center">
            <InsertEmoticonIcon style={{ color: "#919191" }} />
          </button>
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Digite uma mensagem"
            className="w-full h-10 border-none outline-none rounded-full bg-white font-size-[15px] pl-4 text-[#4A4A4A]"
          />
        </div>

        <div className="flex">
          <button className="size-10 rounded-full cursor-pointer flex justify-center items-center">
            <SendIcon style={{ color: "#919191" }} />
          </button>
        </div>
      </div>
    </div>
  );
};
