import { MercadoPagoConfig, Preference } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

const course = {
  id: "CURSO-DOMINE-MILHAS-001",
  title: "Curso Domine Milhas",
  description: "Curso completo de milhas aéreas para iniciantes",
  price: 49.9,
}

export async function POST(request: NextRequest) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!accessToken) {
    return NextResponse.json({ message: "Pagamento ainda não configurado." }, { status: 503 })
  }

  const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } })
  const preference = new Preference(client)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin
  const orderId = crypto.randomUUID()
  const canReceiveWebhook = siteUrl.startsWith("https://")

  try {
    const result = await preference.create({
      body: {
        items: [{
          id: course.id,
          title: course.title,
          description: course.description,
          quantity: 1,
          currency_id: "BRL",
          unit_price: course.price,
        }],
        back_urls: {
          success: `${siteUrl}/sucesso`,
          failure: `${siteUrl}/falha`,
          pending: `${siteUrl}/pendente`,
        },
        auto_return: "approved",
        external_reference: orderId,
        statement_descriptor: "DOMINEMILHAS",
        payment_methods: { installments: 12 },
        ...(canReceiveWebhook ? { notification_url: `${siteUrl}/api/webhooks/mercadopago` } : {}),
      },
    })

    return NextResponse.json({ init_point: result.init_point })
  } catch (error) {
    console.error("Erro ao criar preferência do Mercado Pago:", error)
    return NextResponse.json({ message: "Não foi possível iniciar o checkout." }, { status: 500 })
  }
}
