// pages/quemsomos.jsx
import Navbar from "../components/Navbar";
export default function QuemSomos() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 text-white">
        <h1 className="text-3xl font-bold mb-4">Quem Somos</h1>
        <p className="mb-4">
          Somos a União Motos, especializada na compra, venda e troca de veículos novos e usados, nacionais e importados.
          Com mais de 10 anos de experiência, atendemos centenas de clientes por ano e revisamos criteriosamente todos os veículos para garantir tranquilidade e segurança na sua compra.
        </p>
        <p>Estamos localizados em Vitória de Santo Antão, e aguardamos você em nossa loja ou online!</p>
      </div>
    </>
  );
}
