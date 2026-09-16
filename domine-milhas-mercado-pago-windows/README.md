# Domine Milhas

MVP do curso Domine Milhas com Checkout Pro do Mercado Pago.

## Configurar o pagamento

1. Copie `.env.example` para `.env.local`.
2. Use inicialmente um `MERCADOPAGO_ACCESS_TOKEN` de **teste**.
3. Em produção, defina `NEXT_PUBLIC_SITE_URL` como `https://modelo-mvp-domine-milhas.vercel.app`.
4. No painel Mercado Pago, em **Suas integrações > Webhooks**, cadastre:

   ```text
   https://modelo-mvp-domine-milhas.vercel.app/api/webhooks/mercadopago
   ```

5. Copie o segredo gerado para `MERCADOPAGO_WEBHOOK_SECRET`.
6. Na Vercel, cadastre as três variáveis no ambiente de produção e publique o projeto.

O botão **Comprar agora** cria uma preferência no servidor e abre o ambiente seguro do Mercado Pago. O webhook valida a assinatura recebida e consulta o pagamento antes de tratá-lo como aprovado. A página de retorno não é confirmação suficiente.

Este MVP ainda não possui cadastro de aluno nem banco de dados. Para liberar o curso automaticamente, conecte a área indicada no webhook a um banco de dados que associe o pagamento aprovado ao aluno.

## Desenvolvimento local

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).
