import type { User } from "../types/User";

type MessageItemProps = {
  data: {
    author: number;
    body: string;
  };
  user: User;
};

export const MessageItem = ({ data, user }: MessageItemProps) => {
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
        <div className="text-base my-1 mr-10 ml-1">{data.body}</div>
        <div className="text-xs text-right text-[#999999] mr-1 h-4 -mt-4">
          18:13
        </div>
      </div>
    </div>
  );
};
