import Link from "next/link"

export default function PendingPage() {
  return <main className="grid min-h-screen place-items-center bg-[#f7f8fa] p-6"><section className="max-w-lg rounded-3xl bg-white p-8 shadow-xl"><p className="font-bold text-[#c37800]">PAGAMENTO PENDENTE</p><h1 className="mt-3 text-3xl font-black">Estamos aguardando a confirmação</h1><p className="mt-4 leading-7 text-slate-600">Quando o Mercado Pago confirmar o pagamento, seu pedido será atualizado.</p><Link className="mt-7 inline-block rounded-xl bg-[#298edd] px-5 py-3 font-black text-white" href="/">Voltar ao início</Link></section></main>
}
