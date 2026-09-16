import {
  InvalidWebhookSignatureError,
  MercadoPagoConfig,
  Payment,
  WebhookSignatureValidator,
} from "mercadopago"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

// Demonstração: ao adicionar contas/alunos, grave payment.id em um banco com chave única.
// Isso torna a entrega do curso idempotente mesmo quando a função reinicia.
const processedPaymentIds = new Set<string>()

export async function POST(request: NextRequest) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
  const paymentId = request.nextUrl.searchParams.get("data.id")

  if (!accessToken || !secret || !paymentId) return new NextResponse(null, { status: 400 })

  try {
    WebhookSignatureValidator.validate({
      xSignature: request.headers.get("x-signature") ?? "",
      xRequestId: request.headers.get("x-request-id") ?? "",
      dataId: paymentId,
      secret,
    })
  } catch (error) {
    if (error instanceof InvalidWebhookSignatureError) return new NextResponse(null, { status: 401 })
    console.error("Erro ao validar assinatura do webhook:", error)
    return new NextResponse(null, { status: 500 })
  }

  try {
    const client = new MercadoPagoConfig({ accessToken })
    const payment = await new Payment(client).get({ id: paymentId })

    const paymentKey = String(payment.id)

    if (payment.status === "approved" && !processedPaymentIds.has(paymentKey)) {
      processedPaymentIds.add(paymentKey)
      // Produção: registre o pedido e libere o acesso do aluno neste ponto.
      console.log(`Pagamento aprovado: ${payment.id}; pedido: ${payment.external_reference}`)
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error("Erro ao consultar pagamento:", error)
    return new NextResponse(null, { status: 500 })
  }
}
