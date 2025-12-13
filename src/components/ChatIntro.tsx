export const ChatIntro = () => {
  return (
    <div className="bg-[#F8F9FA] flex flex-col justify-center items-center h-screen">
      <img
        src="https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg"
        alt="fsdfsfd"
        className="w-[250px] h-auto"
      />
      <h1 className="text-3xl text-[#525252] mt-8">
        Mantenha seu celular conectado
      </h1>
      <h2 className="text-xl text-[#777777] mt-5 leading-8 text-center">
        O WhatsApp conecta ao seu telefone para sincronizar suas mensagens.
        <br />
        Para reduzir o uso de dados, conecte seu telefone a ua rede Wi-Fi.
      </h2>
    </div>
  );
};
