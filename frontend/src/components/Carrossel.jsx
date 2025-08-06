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
      className={`${className} absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-neutral-800/60 p-2 rounded-full hover:bg-neutral-800/90 transition-colors opacity-0 group-hover:opacity-100 duration-300`}
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
      className={`${className} absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-neutral-800/60 p-2 rounded-full hover:bg-neutral-800/90 transition-colors opacity-0 group-hover:opacity-100 duration-300`}
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
    adaptiveHeight: false,
    lazyLoad: 'ondemand',
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    // Customiza a aparência dos pontos de paginação e garante visibilidade
    appendDots: dots => (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full text-center">
        <ul className="flex justify-center m-5 p-2 rounded-full bg-black/30 w-fit mx-auto space-x-3">
          {dots}
        </ul>
      </div>
    ),
    customPaging: i => (
      // Agora o ponto é um <div> com um estilo mais claro
      <div className="w-2.5 h-2.5 bg-white/50 rounded-full mx-auto mb-10 hover:bg-white transition-colors"></div>
    )
  };
  
  // Não renderiza o carrossel se não houver slides
  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative mb-12 w-full rounded-lg overflow-hidden group">
      <Slider {...settings}>
        {slides.map((fotoUrl, i) => (
          <div key={i} className="relative w-full aspect-[21/9]">
            <Image
              src={fotoUrl.image}
              alt={fotoUrl.title}
              layout="fill"
              objectFit="cover"
              priority={i === 0}
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
}