import { NextSeo } from "next-seo";

export default function Disable() {
  return (
    <>
      <NextSeo
        title="L-Marcel"
        defaultTitle="L-Marcel"
        titleTemplate="L-Marcel - %s"
      />
      <section className="flex flex-wrap sm:flex-nowrap gap-4 p-10 items-center justify-center">
        <h2>PÁGINA DESATIVADA</h2>
        <p>
          Se o seu interesse é dar uma olhada nos meus projetos, 
          peço que passe no meu perfil do GitHub: <a href="https://github.com/l-marcel" target="_blank">l-marcel</a>.
        </p>
      </section>
      <div className="flex-col min-h-full p-10 bg-gray-500"></div>
    </>
  );
};