import Link from "next/link"

export default function FailurePage() {
  return <main className="grid min-h-screen place-items-center bg-[#f7f8fa] p-6"><section className="max-w-lg rounded-3xl bg-white p-8 shadow-xl"><p className="font-bold text-red-600">PAGAMENTO NÃO CONCLUÍDO</p><h1 className="mt-3 text-3xl font-black">Você pode tentar novamente</h1><p className="mt-4 leading-7 text-slate-600">Nenhuma cobrança foi confirmada. Retorne ao site e inicie outra tentativa quando quiser.</p><Link className="mt-7 inline-block rounded-xl bg-[#298edd] px-5 py-3 font-black text-white" href="/">Voltar ao início</Link></section></main>
}
