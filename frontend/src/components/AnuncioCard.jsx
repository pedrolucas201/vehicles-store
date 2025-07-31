// components/AnuncioCard.js

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../services/api';

export default function AnuncioCard({ anuncio, isAdmin, onAnuncioExcluido }) {
  const router = useRouter();

  // URL base da API para as imagens
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL.replace('/api', '');

  const handleExcluir = async () => {
    if (confirm('Tem certeza que deseja excluir este anúncio?')) {
      try {
        await api.delete(`/anuncios/${anuncio._id}`);
        onAnuncioExcluido(anuncio._id); // Informa o componente pai sobre a exclusão
      } catch (error) {
        console.error('Erro ao excluir anúncio:', error);
        alert('Falha ao excluir o anúncio. Tente novamente.');
      }
    }
  };

  return (
    <div className="bg-neutral-800 rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
      {/* Container da imagem para controle do layout com next/image */}
      <div className="relative w-full h-48">
        {anuncio.fotos?.[0] ? (
          <Image
            src={`${API_BASE_URL}${anuncio.fotos[0]}`}
            alt={`${anuncio.marca} ${anuncio.modelo}`}
            layout="fill"
            objectFit="cover"
            priority={false} // Defina como true para os primeiros itens da lista se desejar
          />
        ) : (
          // Placeholder caso não haja foto
          <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
            <span className="text-neutral-500">Sem foto</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-white">
          {anuncio.marca} {anuncio.modelo}
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          {anuncio.ano} • {anuncio.km.toLocaleString('pt-BR')} KM
        </p>
        <p className="text-brand-400 mt-2 text-lg font-bold">
          {anuncio.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>

        {/* Espaçador para empurrar os botões para baixo */}
        <div className="flex-grow" />

        <div className="mt-4 flex justify-between items-center text-sm">
          <Link href={`/anuncio/${anuncio._id}`}
            className="text-white hover:text-blue-300 transition-colors">
              Ver Anúncio
          </Link>
          {isAdmin && (
            <div className="flex gap-4">
              <button
                className="text-white hover:text-yellow-300 transition-colors"
                onClick={() => router.push(`/anuncio/${anuncio._id}/editar`)}
              >
                Editar
              </button>
              <button
                className="text-white hover:text-red-400 transition-colors"
                onClick={handleExcluir}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}