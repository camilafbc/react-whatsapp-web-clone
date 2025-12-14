import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import { useState, useRef, type SetStateAction, useEffect } from "react";
import { MessageItem } from "./MessageItem";
import type { User } from "../types/User";

type ChatWindowProps = () => {
  user: User;
};

export const ChatWindow = ({ user }: ChatWindowProps) => {
  const body = useRef<HTMLDivElement>(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  if (recognitionRef.current === null && SpeechRecognition !== undefined) {
    recognitionRef.current = new SpeechRecognition();
  }

  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([
    { author: 123, body: "Bora, cruzeiro!!!" },
    { author: 1234, body: "Te amo, Dua Lipa" },
    { author: 123, body: "Bla bla bla" },
    { author: 123, body: "Bora, cruzeiro!!!" },
    { author: 1234, body: "Te amo, Dua Lipa" },
    { author: 123, body: "Bla bla bla" },
    { author: 123, body: "Bora, cruzeiro!!!" },
    { author: 1234, body: "Te amo, Dua Lipa" },
    { author: 123, body: "Bla bla bla" },
    { author: 123, body: "Bora, cruzeiro!!!" },
    { author: 1234, body: "Te amo, Dua Lipa" },
    { author: 123, body: "Bla bla bla" },
    { author: 123, body: "Bora, cruzeiro!!!" },
    { author: 1234, body: "Te amo, Dua Lipa" },
    { author: 123, body: "Bla bla bla" },
    { author: 123, body: "Bora, cruzeiro!!!" },
    { author: 1234, body: "Te amo, Dua Lipa" },
    { author: 123, body: "Bla bla bla" },
    { author: 123, body: "Bora, cruzeiro!!!" },
    { author: 1234, body: "Te amo, Dua Lipa" },
    { author: 123, body: "Bla bla bla" },
    { author: 123, body: "Bora, cruzeiro!!!" },
    { author: 1234, body: "Te amo, Dua Lipa" },
    { author: 123, body: "Bla bla bla" },
  ]);

  useEffect(() => {
    // Verifica se a altura do scroll é maior do que a altura do elemento (ou seja, há conteúdo)
    // Se sim, subtrai essa altura para definir a posição inicial do scroll
    if (body.current && body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [list]);

  const handleEmojiClick = (emojiData: EmojiClickData, e: MouseEvent) => {
    setText(text + emojiData.emoji);
  };

  const handleSendClick = () => {
    console.log("enviando");
  };

  const handleMicClick = () => {
    if (recognitionRef.current !== null) {
      recognitionRef.current.onstart = () => {
        setListening(true);
      };
      recognitionRef.current.onend = () => {
        setListening(false);
      };
      recognitionRef.current.onresult = (e: {
        results: { transcript: SetStateAction<string> }[][];
      }) => {
        setText(e.results[0][0].transcript);
      };

      recognitionRef.current.start();
    }
  };

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
      <div
        ref={body}
        className="flex-1 bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)] overflow-y-auto  bg-cover bg-center py-5 px-8 chat-window"
      >
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>

      {/* Emoji Picker */}
      <div>
        <EmojiPicker
          skinTonesDisabled
          searchDisabled
          previewConfig={{
            showPreview: false,
          }}
          width={"auto"}
          height={openEmojiPicker ? 300 : 0}
          onEmojiClick={handleEmojiClick}
          style={{
            background: "none",
            overflowY: "hidden",
            transition: "all ease 0.3s",
          }}
        />
      </div>
      {/* footer */}
      <div className="flex justify-between h-20 items-center px-4">
        <div className="flex">
          <button
            onClick={() => setOpenEmojiPicker(false)}
            className="rounded-full cursor-pointer flex justify-center items-center"
          >
            <CloseIcon
              style={{
                color: "#919191",
                width: openEmojiPicker ? "40px" : "0",
                transition: "all ease 0.3s",
              }}
            />
          </button>

          <button
            onClick={() => setOpenEmojiPicker(true)}
            className="size-10 rounded-full cursor-pointer flex justify-center items-center"
          >
            <InsertEmoticonIcon
              style={{ color: openEmojiPicker ? "#009688" : "#919191" }}
            />
          </button>
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-10 border-none outline-none rounded-full bg-white font-size-[15px] pl-4 text-[#4A4A4A]"
          />
        </div>

        <div className="flex">
          {text !== "" && (
            <button
              onClick={handleSendClick}
              className="size-10 rounded-full cursor-pointer flex justify-center items-center"
            >
              <SendIcon style={{ color: "#919191" }} />
            </button>
          )}
          {text === "" && (
            <button
              onClick={() => handleMicClick()}
              className="size-10 rounded-full cursor-pointer flex justify-center items-center"
            >
              <MicIcon style={{ color: listening ? "#126ECE" : "#919191" }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
