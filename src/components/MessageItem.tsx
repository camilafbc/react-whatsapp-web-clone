import type { User } from "../types/User";
import { formatDate } from "../utils/utils";
import type { Message } from "../types/Chats";

type MessageItemProps = {
  data: Message;
  user: User;
};

export const MessageItem = ({ data, user }: MessageItemProps) => {
  const time = formatDate(data.date);

  return (
    <div
      className={`flex mb-2.5 ${
        user.id === data.author ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex ${
          user.id === data.author ? "bg-[#DCF8CC]" : "bg-white"
        } rounded-lg shadow flex-col p-1 max-w-[90%]`}
      >
        <div className="text-base my-1 mr-14 ml-1">{data.body}</div>
        <div className="text-xs text-right text-[#999999] mr-1 h-4 -mt-4">
          {time}
        </div>
      </div>
    </div>
  );
};
