export type Message = {
  author: string;
  body: string;
  date: number;
  type: string;
};

export type Chats = {
  messages: Message[];
  users: string[];
};
