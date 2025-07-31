// components/Carrossel.jsx

import Slider from 'react-slick';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// CSS para o react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Componente de seta para a Esquerda
function PrevArrow({ className, style, onClick }) {
  return (
    <button
      className={`${className} absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-neutral-800/60 p-2 rounded-full hover:bg-neutral-800/90 transition-colors`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Anterior"
    >
      <ChevronLeft size={24} className="text-white" />
    </button>
  );
}

// Componente de seta para a Direita
function NextArrow({ className, style, onClick }) {
  return (
    <button
      className={`${className} absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-neutral-800/60 p-2 rounded-full hover:bg-neutral-800/90 transition-colors`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Próximo"
    >
      <ChevronRight size={24} className="text-white" />
    </button>
  );
}

export default function Carrossel({ slides = [] }) {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    lazyLoad: 'ondemand',
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    // Customiza a aparência dos pontos de paginação
    appendDots: dots => (
      <div>
        <ul className="m-0 bottom-[-25px]">{dots}</ul>
      </div>
    ),
  };
  
  // URL base da API para as imagens
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL.replace('/api', '');

  // Não renderiza o carrossel se não houver slides
  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative mb-12 w-full h-[350px] sm:h-[500px] md:h-[650px] rounded-lg overflow-hidden group">
      <Slider {...settings}>
        {slides.map((fotoUrl, i) => (
          <div key={i} className="relative w-full h-[350px] sm:h-[500px] md:h-[650px]">
            <Image
              src={fotoUrl.image}
              alt={fotoUrl.title}
              layout="fill"
              objectFit="cover"
              priority={i === 0} // Carrega a primeira imagem com prioridade
              className="transition-transform duration-500 group-hover:scale-105"
            />
             {/* Overlay para escurecer a imagem e melhorar a legibilidade dos controles */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
}