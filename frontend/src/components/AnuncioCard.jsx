import Link from 'next/link';
export default function AnuncioCard({ anuncio }) {
    return (
        <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
        { anuncio.fotos[0] && (
            <img src={anuncio.fotos[0]} alt="" className="w-full h-48 object-cover" />
        )}
        <div className="p-4">
            <h2 className="text-lg font-semibold">{anuncio.marca} {anuncio.modelo}</h2>
            <p className="text-neutral-400 text-sm mb-2">{anuncio.ano} • {anuncio.km} km</p>
            <p className="text-brand-500 font-bold text-xl mb-4">R$ {anuncio.preco}</p>
            <Link href={`/anuncio/${anuncio._id}`}
            className="inline-block bg-brand-500 text-white px-4 py-2 rounded-full hover:bg-brand-600 transition">
            Ver detalhes
            </Link>
        </div>
        </div>
    );
  }
  