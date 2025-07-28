// pages/vender.jsx
import Navbar from "../src/components/Navbar";
import ImageUpload from "../src/components/ImageUpload";
import { useState } from "react";
import api from "../src/services/api";

export default function Vender() {
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "",
    marca: "", modelo: "", ano: "", preco: "", obs: ""
  });
  const [fotos, setFotos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    fotos.forEach((f) => data.append("fotos", f));

    await api.post("/anuncios", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Anúncio enviado!");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 text-white">
        <h1 className="text-3xl font-bold mb-6">Venda seu veículo</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-800 p-6 rounded-lg space-y-4"
        >
          {Object.entries(form).map(([k, v]) => (
            <input
              key={k}
              name={k}
              type={k === "email" ? "email" : "text"}
              placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
              value={v}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [k]: e.target.value }))
              }
              className="w-full p-3 bg-neutral-700 rounded"
            />
          ))}

          <ImageUpload onFiles={(files) => setFotos(files)} />

          <button
            type="submit"
            className="w-full px-6 py-2 bg-brand-500 hover:bg-brand-600 rounded font-semibold"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
