'use client';
import { useState } from 'react';
import api from '../services/api';

export default function AnuncioForm({ onCreated }) {
  const [form, setForm] = useState({
    marca: '',
    modelo: '',
    ano: '',
    preco: '',
    km: '',
    whatsapp: '',
  });
  const [fotos, setFotos] = useState([]);           // Arquivos selecionados
  const [previewUrls, setPreviewUrls] = useState([]); // URLs para pré‑visualização

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFiles = e => {
    const filesArray = Array.from(e.target.files);
    setFotos(filesArray);

    // Gera URLs de preview
    const urls = filesArray.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Faça login antes de criar um anúncio.');

    const data = new FormData();
    // Campos de texto
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    // Fotos
    fotos.forEach(file => data.append('fotos', file));

    try {
      const res = await api.post('/anuncios', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      onCreated(res.data);
      // limpa form e previews
      setForm({ marca: '', modelo: '', ano: '', preco: '', km: '', whatsapp: '' });
      setFotos([]);
      setPreviewUrls([]);
    } catch (err) {
      console.error(err);
      alert('Erro ao criar anúncio');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-6 rounded-lg shadow-md space-y-6 max-w-xl mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {['marca','modelo','ano','preco','km','whatsapp'].map(k => (
          <div key={k}>
            <label className="block mb-1 capitalize text-neutral-300">{k}</label>
            <input
              type={k==='ano' || k==='preco' || k==='km' ? 'number' : 'text'}
              name={k}
              value={form[k]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded focus:border-brand-500"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block mb-1 text-neutral-300">Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={e=> setForm({...form, descricao: e.target.value})}
          rows={4}
          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded focus:border-brand-500 text-white"
          placeholder="Descreva detalhes do veículo, estado, opcionais..."
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-neutral-300">Fotos</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="w-full text-neutral-200"
        />
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {previewUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Preview ${i+1}`}
              className="h-32 w-full object-cover rounded"
            />
          ))}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold"
      >
        Criar anúncio
      </button>
    </form>
  );
}
