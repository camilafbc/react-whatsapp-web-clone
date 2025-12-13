type ChatListItemProps = {
  onClick: VoidFunction;
  active: boolean;
  data: {
    chatId: number;
    title: string;
    image: string;
  };
};

export const ChatListItem = ({ onClick, active, data }: ChatListItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center h-18 hover:bg-[#F5F5F5] ${
        active ? "bg-[#EBEBEB]" : ""
      }`}
    >
      <img
        src={data.image}
        alt="user avatar"
        className="rounded-full size-12 ml-4"
      />
      <div className="flex-1 flex flex-col justify-center border-b border-[#EEE] pr-4 ml-4 flex-wrap min-w-0 h-full">
        <div className="flex justify-between items-center w-full">
          <div className="font-bold text-lg">{data.title}</div>
          <div className="text-xs text-[#999]">18:09</div>
        </div>
        <div className="text-sm text-[#999] flex max-w-full">
          <p className="truncate m-0">
            Dua
            Lipaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>
        </div>
      </div>
    </div>
  );
};
