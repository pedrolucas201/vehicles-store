"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeft, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../../services/api";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow({ className, style, onClick }) {
  return (
    <button
      className={`${className} absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-neutral-800/60 p-2 rounded-full`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Anterior"
    >
      <ChevronLeft size={24} className="text-white" />
    </button>
  );
}

function NextArrow({ className, style, onClick }) {
  return (
    <button
      className={`${className} absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-neutral-800/60 p-2 rounded-full`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Próximo"
    >
      <ChevronRight size={24} className="text-white" />
    </button>
  );
}

export default function AnuncioDetalhe() {
  const router = useRouter();
  const { id } = router.query;
  const [anuncio, setAnuncio] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/anuncios/${id}`).then((res) => setAnuncio(res.data));
  }, [id]);

  if (!anuncio) {
    return <p className="text-white text-center mt-20">Carregando...</p>;
  }

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <style jsx global>{`
        /* Esconde os ícones nativos do slick */
        .slick-prev:before,
        .slick-next:before {
          display: none !important;
        }
      `}</style>
      <div className="container mx-auto p-6 text-white max-w-4xl">
        {/* Voltar */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center text-neutral-300 hover:text-white mb-4"
        >
          <ArrowLeft className="mr-2" size={18} /> Voltar ao Painel
        </button>

        {/* Título */}
        <h1 className="text-4xl font-bold mb-4">
          {anuncio.marca} {anuncio.modelo}
        </h1>

        {/* Carrossel com botões */}
        {anuncio.fotos && anuncio.fotos.length > 0 ? (
          <div className="relative mb-6">
            <Slider {...settings}>
              {anuncio.fotos.map((foto, i) => (
                <div key={i}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL.replace(
                      "/api",
                      ""
                    )}${foto}`}
                    alt={`Foto ${i + 1}`}
                    className="w-full h-[500px] object-cover rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="mb-6 p-6 bg-neutral-700 rounded text-center">
            <p className="text-neutral-400">Sem fotos disponíveis</p>
          </div>
        )}

        {/* Destaques */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-neutral-700 p-4 rounded text-center">
            <p className="text-neutral-400">Preço</p>
            <p className="text-brand-500 text-xl font-semibold">
              R$ {anuncio.preco.toLocaleString()}
            </p>
          </div>
          <div className="bg-neutral-700 p-4 rounded text-center">
            <p className="text-neutral-400">Ano</p>
            <p className="text-lg font-medium">{anuncio.ano}</p>
          </div>
          <div className="bg-neutral-700 p-4 rounded text-center">
            <p className="text-neutral-400">KM</p>
            <p className="text-lg font-medium">{anuncio.km.toLocaleString()}</p>
          </div>
          <div className="bg-neutral-700 p-4 rounded text-center">
            <p className="text-neutral-400">Contato</p>
            <a
              href={`https://wa.me/${anuncio.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-1 text-green-400 hover:underline"
            >
              <Phone className="mr-1" size={16} /> {anuncio.whatsapp}
            </a>
          </div>
        </div>

        {/* Descrição / CTA */}
        <div className="bg-neutral-800 p-6 rounded-lg shadow-inner mt-6">
          <h2 className="text-2xl font-semibold mb-2">Descrição</h2>
          <p className="text-neutral-300 whitespace-pre-wrap mb-6 mt-6">
            {anuncio.descricao}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              const mensagem = `Olá, estou interessado em saber mais sobre ${anuncio.marca} ${anuncio.modelo}`;
              const whatsapp = `https://api.whatsapp.com/send?phone=${anuncio.whatsapp}&text=${encodeURIComponent(
                mensagem
              )}`;
              window.open(whatsapp, "_blank");
            }}
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold flex items-center justify-center"
          >
            <Phone className="mr-2" size={18} /> Falar no WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}
