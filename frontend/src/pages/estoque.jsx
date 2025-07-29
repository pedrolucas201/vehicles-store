// pages/estoque.jsx
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";
import Link from "next/link";

export default function Estoque() {
  const [anuncios, setAnuncios] = useState([]);
  const [filtros, setFiltros] = useState({
    busca: "", tipo: "", marca: "", modelo: "", ano: "", preco: ""
  });

  useEffect(() => api.get("/anuncios").then(res => setAnuncios(res.data)), []);

  const filtrados = anuncios.filter(a => {
    return (
      (!filtros.busca || `${a.marca} ${a.modelo}`.toLowerCase().includes(filtros.busca.toLowerCase())) &&
      (!filtros.tipo || a.tipo === filtros.tipo) &&
      (!filtros.marca || a.marca === filtros.marca) &&
      (!filtros.modelo || a.modelo === filtros.modelo) &&
      (!filtros.ano || a.ano === parseInt(filtros.ano)) &&
      (!filtros.preco || (
        filtros.preco === "1" ? a.preco <= 50000 :
        filtros.preco === "2" ? a.preco <= 100000 : a.preco > 100000
      )))
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6 lg:grid lg:grid-cols-4 gap-6">
        {/* sidebar */}
        <aside className="bg-neutral-800 p-4 rounded-lg text-white lg:block hidden">
          <h2 className="text-xl font-semibold mb-4">Busca Rápida</h2>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full mb-4 p-2 bg-neutral-700 rounded"
            value={filtros.busca}
            onChange={e => setFiltros(prev => ({...prev, busca: e.target.value}))}
          />
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          {["tipo","marca","modelo","ano","preco"].map(key => (
            <select
              key={key}
              className="w-full mb-3 p-2 bg-neutral-700 rounded"
              value={filtros[key]}
              onChange={e => setFiltros(prev => ({...prev, [key]: e.target.value}))}
            >
              <option value="">{key.charAt(0).toUpperCase()+key.slice(1)}</option>
              {/* gerar options dinamicamente com base em anúncios */}
            </select>
          ))}
          <button onClick={() => setFiltros({
            busca:"", tipo:"", marca:"", modelo:"", ano:"", preco:""
          })} className="mt-2 underline">Limpar filtros</button>
        </aside>
        
        {/* grid anúncios */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map(a => (
            <div key={a._id} className="bg-neutral-800 rounded-lg shadow overflow-hidden hover:shadow-xl">
              {a.fotos?.[0] && (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL.replace('/api','')}${a.fotos[0]}`}
                  alt={a.modelo}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 text-white">
                <h3 className="font-semibold">{a.marca} {a.modelo}</h3>
                <p className="text-brand-500 mt-1 font-bold">
                  {a.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <p className="text-neutral-400 mt-1">{a.ano} • {a.km} km</p>
                <Link href={`/anuncio/${a._id}`} className="mt-4 inline-block px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600">
                  Ver mais
                </Link>
              </div>
            </div>
          ))}
          {filtrados.length === 0 && (
            <p className="text-neutral-400 col-span-full">Nenhum veículo encontrado.</p>
          )}
        </div>
      </div>
    </>
  );
}
