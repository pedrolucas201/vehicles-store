import AnuncioForm from '../components/AnuncioForm';
import { useState } from 'react';
import AnuncioCard from '../components/AnuncioCard';
import withAuth from '../hocs/withAuth';

function Admin() {
  const [anuncios, setAnuncios] = useState([]);

  return (
    <>
      <div className="container mx-auto p-6 space-y-8">
        <h2 className="text-2xl font-bold text-white">Criar anúncio</h2>
        <AnuncioForm onCreated={n=>setAnuncios([n, ...anuncios])} />
        {anuncios.length>0 && (
          <>
            <h2 className="text-2xl font-bold text-white mt-8">Anúncios criados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {anuncios.map(a=> <AnuncioCard key={a._id} anuncio={a} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default withAuth(Admin, { admin: true });
