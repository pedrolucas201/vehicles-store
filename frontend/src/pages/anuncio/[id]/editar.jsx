"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../../../src/services/api";
import { ArrowLeft } from "lucide-react";
import ImageUpload from "../../../components/ImageUpload";
import withAuth from "../../../hocs/withAuth";

function EditarAnuncio() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    marca: "", modelo: "", ano: "", preco: "", km: "", whatsapp: "", descricao: ""
  });
  const [fotosAtuais, setFotosAtuais] = useState([]);
  const [fotosParaRemover, setFotosParaRemover] = useState([]);
  const [novasFotos, setNovasFotos] = useState([]);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    api.defaults.headers.Authorization = `Bearer ${token}`;
    api.get(`/anuncios/${id}`)
      .then((res) => {
        setForm({
          marca: res.data.marca || "",
          modelo: res.data.modelo || "",
          ano: res.data.ano || "",
          preco: res.data.preco || "",
          km: res.data.km || "",
          whatsapp: res.data.whatsapp || "",
          descricao: res.data.descricao || ""
        });
        setFotosAtuais(res.data.fotos || []);
      })
      .catch(() => {
        alert("Erro ao carregar anúncio");
        router.push("/dashboard");
      });
  }, [id, router]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleRemoverFoto = (foto) => 
    setFotosParaRemover((prev) =>
      prev.includes(foto) 
        ? prev.filter((f) => f !== foto) 
        : [...prev, foto]
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    const formData = new FormData();
    // campos texto
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    // fotos a remover
    if (fotosParaRemover.length)
      formData.append("fotosParaRemover", JSON.stringify(fotosParaRemover));
    // novas fotos
    novasFotos.forEach((f) => formData.append("fotos", f));

    try {
      await api.put(`/anuncios/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Anúncio atualizado com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar o anúncio.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 p-6 rounded-lg shadow-md space-y-6 max-w-lg mx-auto mt-10 text-white"
    >
      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="flex items-center text-neutral-300 hover:text-white"
      >
        <ArrowLeft className="mr-2" size={18} /> Voltar
      </button>

      <h2 className="text-2xl font-bold">Editar Anúncio</h2>

      {["marca","modelo","ano","preco","km","whatsapp","descricao"].map((field) => (
        <div key={field}>
          <label className="block mb-1 capitalize text-neutral-300">
            {field}
          </label>
          <input
            name={field}
            type={["ano","preco","km"].includes(field) ? "number" : "text"}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded focus:border-brand-500"
          />
        </div>
      ))}

      {/* Fotos atuais com toggle de remoção */}
      <div>
        <label className="block mb-1 text-neutral-300">
          Fotos atuais (clique para remover)
        </label>
        <div className="flex space-x-2 overflow-x-auto">
          {fotosAtuais.length === 0 && (
            <p className="text-neutral-400">Sem fotos</p>
          )}
          {fotosAtuais.map((foto) => {
            const removida = fotosParaRemover.includes(foto);
            return (
              <img
                key={foto}
                src={`http://localhost:5000${foto}`}
                alt=""
                className={`h-32 w-32 object-cover rounded cursor-pointer transition-opacity ${
                  removida ? "opacity-30 grayscale" : "opacity-100"
                }`}
                onClick={() => toggleRemoverFoto(foto)}
                title={removida ? "Restaurar" : "Remover"}
              />
            );
          })}
        </div>
      </div>

      {/* Novo uploader sem form aninhado */}
      <ImageUpload onFiles={(files) => setNovasFotos(files)} />

      <button
        type="submit"
        className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold"
      >
        Atualizar anúncio
      </button>
    </form>
  );
}

export default withAuth(EditarAnuncio);