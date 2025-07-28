import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AnuncioDetalhe() {
  const router = useRouter();
  const { id } = router.query;
  const [anuncio, setAnuncio] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/anuncios/${id}`).then((res) => setAnuncio(res.data));
  }, [id]);

  if (!anuncio) return <p className="text-white">Carregando...</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className="container mx-auto p-6 text-white max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">
        {anuncio.marca} {anuncio.modelo}
      </h1>

      {anuncio.fotos && anuncio.fotos.length > 0 ? (
        <Slider {...settings} className="mb-8 rounded-lg shadow-lg">
          {anuncio.fotos.map((foto, i) => (
            <div key={i}>
              <img
                src={`http://localhost:5000${foto}`}
                alt={`Foto ${i + 1}`}
                className="w-full max-h-[500px] object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="mb-8 text-neutral-400">Sem fotos disponíveis</p>
      )}

      <div className="grid grid-cols-2 gap-6 text-lg">
        <div>
          <span className="font-semibold">Preço: </span>
          <span className="text-brand-500">R$ {anuncio.preco.toLocaleString()}</span>
        </div>
        <div>
          <span className="font-semibold">Ano: </span>
          <span>{anuncio.ano}</span>
        </div>
        <div>
          <span className="font-semibold">KM: </span>
          <span>{anuncio.km.toLocaleString()} km</span>
        </div>
        <div>
          <span className="font-semibold">WhatsApp: </span>
          <a
            href={`https://wa.me/${anuncio.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            {anuncio.whatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
