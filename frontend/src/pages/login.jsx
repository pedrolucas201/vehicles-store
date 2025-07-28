import { useState } from "react";
import { useRouter } from "next/router";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch {
      alert("Erro no login");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">União Motos</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm text-neutral-300">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:border-brand-500"
          />
          <label className="block mb-2 text-sm text-neutral-300">Senha</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 rounded-full font-semibold text-white transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
