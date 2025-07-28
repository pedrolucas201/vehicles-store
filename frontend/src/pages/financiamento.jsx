// pages/financiamento.jsx
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Financiamento() {
  const [form, setForm] = useState({ nome:'', email:'', cpf:'', telefone:'', estadoCivil:'', endereco:'', salario:'', modelo:'', ano:'', preco:'', entrada:'', parcelas:'6' });

  const ufOptions = ["AC","AL","AP","BA","CE","PE", /*...*/];
  const parcelasOpts = ["6","12","24","36","48"];

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 text-white">
        <h1 className="text-3xl font-bold mb-6">Simulação de Financiamento</h1>
        <form className="bg-neutral-800 p-6 rounded-lg space-y-4">
          {["nome","email","cpf","telefone","estadoCivil","endereco","salario","modelo","ano","preco","entrada"].map(key => (
            <input
              key={key}
              type={key==="email"?"email":"text"}
              placeholder={key.charAt(0).toUpperCase()+key.slice(1)}
              value={form[key]}
              onChange={e=>setForm(prev=>({...prev,[key]:e.target.value}))}
              className="w-full p-3 bg-neutral-700 rounded"
            />
          ))}
          <select
            value={form.parcelas}
            onChange={e=>setForm(prev=>({...prev, parcelas:e.target.value}))}
            className="w-full p-3 bg-neutral-700 rounded"
          >
            {parcelasOpts.map(n=> <option key={n} value={n}>{n} vezes</option> )}
          </select>
          <button type="submit" className="px-6 py-2 bg-brand-500 hover:bg-brand-600 rounded font-semibold">
            Solicitar Financiamento
          </button>
        </form>
      </div>
    </>
  );
}
