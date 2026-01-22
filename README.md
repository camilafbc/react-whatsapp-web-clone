# 💬 WhatsApp Web Clone

Projeto desenvolvido como parte da trilha front-end do curso Fullstack da B7Web, com foco em entender na prática como funciona a construção de uma aplicação de chat em tempo real, desde a componentização até a integração com um backend.

<img width="100%" src="https://raw.githubusercontent.com/camilafbc/react-whatsapp-web-clone/refs/heads/main/to_readme.gif"/>

## Tecnologias utilizadas

**Front-end:** React, TailwindCSS, React Emoji Picker, Material UI Icons

**Back-end:** Firebase (Auth e Firestore)

## Funcionalidades

- Login com Google utilizando Firebase Authentication
- Lista de conversas em tempo real
- Envio e recebimento de mensagens
- Filtro de conversas
- Envio de emojis
- Transcrição de áudio
- Início de novos chats com outros usuários já cadastrados na base

## Uso

    1. O usuário realiza login com sua conta Google.
    2. Após a autenticação, a lista de conversas é carregada.
    3. O usuário pode iniciar um novo chat ou selecionar uma conversa existente.
    4. As mensagens são trocadas em tempo real na interface.

> Alguns ícones presentes na interface (como status e envio de arquivos) fazem parte do layout,
> mas não possuem funcionalidade implementada neste projeto.

## Variáveis de Ambiente

O projeto utiliza variáveis de ambiente (.env) para configuração do Firebase.

Para testar localmente, é necessário configurar um projeto Firebase e habilitar:

- Authentication (Google)
- Firestore Database

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/camilafbc/react-whatsapp-web-clone
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

Crie um arquivo .env na raiz do projeto seguindo o padrão

```bash
    VITE_FIREBASE_API_KEY=...
    VITE_FIREBASE_AUTH_DOMAIN=...
    VITE_FIREBASE_PROJECT_ID=...
    VITE_FIREBASE_STORAGE_BUCKET=...
    VITE_FIREBASE_MESSAGING_SENDER_ID=...
    VITE_FIREBASE_APP_ID=...
```
