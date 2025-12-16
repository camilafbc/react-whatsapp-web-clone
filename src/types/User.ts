export type UserChat = {
  chatId: string;
  image: string;
  title: string;
  with: string;
  lastMessage: string;
  lastMessageDate: number;
};

export type User = {
  id: string;
  avatar: string;
  name: string;
  chats?: [] | UserChat[];
};
