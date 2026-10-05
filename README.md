# Studio Lar & Luz — E-Commerce Headless de Alta Performance

> Loja online moderna, responsiva e pronta para produção para a marca **Studio Lar & Luz** (artigos para cozinha, mesa posta, faqueiros, cerâmicas artesanais, panelas esmaltadas e marmitas herméticas).

---

## 🏛️ Arquitetura & Stack Tecnológica

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Interatividade & 3D**: Three.js Turntable 3D Viewer com lazy-loading (`ssr: false`), iluminação de estúdio e fallback automático
- **E-Commerce Backend**: Arquitetura desacoplada via **Adapter Provider Pattern** (`lib/commerce`):
  - `ShopifyCommerceProvider`: Integração direta com Shopify Storefront GraphQL API & Admin REST API
  - `MockCommerceProvider`: Catálogo rico em pt-BR pré-configurado para desenvolvimento imediato sem bloqueios
- **Pagamentos Brasil (Stripe & Shopify)**:
  - Pix com QR Code dinâmico, código Copia e Cola e 5% de desconto automático
  - Cartão de Crédito com parcelamento em até 6x sem juros
  - Apple Pay & Google Pay
  - Opção de redirecionamento direto para Shopify Checkout
- **AliExpress / DSers Sync**:
  - Motor de cálculo de margem e precificação: `(Custo_USD * Câmbio_BRL * Multiplicador) + Frete + Imposto Remessa Conforme`
  - Sanitizador de títulos poluídos de fornecedores em copy elegante em português
  - Script CLI autônomo: `npm run sync:aliexpress`
- **SEO & AIO (AI Answer Optimization)**:
  - JSON-LD estruturado: `HomeGoodsStore`, `Product`, `Offer`, `BreadcrumbList`, `FAQPage`
  - Manifest `/llms.txt` e `robots.txt` otimizados para motores de IA (Perplexity, ChatGPT, Claude)
  - Sitemap XML dinâmico (`/sitemap.xml`) e Open Graph / Twitter Cards

---

## 🚀 Como Executar o Projeto

### 1. Instalação e Inicialização Local

```bash
# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Iniciar servidor de produção
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🔑 O Que Você Precisa Configurar (Checklist de Produção)

No arquivo `.env.local` (ou no painel da Vercel em *Settings > Environment Variables*), preencha as seguintes chaves:

### 1. Shopify Storefront & Admin API
1. Acesse o seu painel Shopify: `https://sua-loja.myshopify.com/admin`
2. Vá em **Configurações (Settings) > Aplicativos e canais de vendas > Desenvolver aplicativos**.
3. Crie um aplicativo personalizado chamado `Studio Lar & Luz Headless`.
4. Em **Configuração da API da Storefront**, conceda permissões de leitura para produtos, coleções, clientes e finalização de compra. Copie o **Storefront API access token**.
5. Em **Configuração da API Admin**, conceda permissões de leitura/escrita para `read_products`, `write_products`, `read_orders`, `write_orders`.
6. Configure as variáveis:
   ```env
   COMMERCE_PROVIDER="shopify"
   SHOPIFY_STORE_DOMAIN="sua-loja.myshopify.com"
   SHOPIFY_STOREFRONT_ACCESS_TOKEN="seu_token_storefront"
   SHOPIFY_ADMIN_API_TOKEN="shpat_seu_token_admin"
   SHOPIFY_API_VERSION="2024-10"
   ```

### 2. Stripe (Pix e Cartões no Brasil)
1. Acesse o [Dashboard da Stripe](https://dashboard.stripe.com/apikeys).
2. Ative os métodos de pagamento **Pix**, **Cartões de Crédito** e **Carteiras Digitais** em *Configurações > Métodos de Pagamento*.
3. Copie a chave secreta e a chave publicável:
   ```env
   STRIPE_SECRET_KEY="sk_live_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```
4. Configure o endpoint de webhook apontando para:
   `https://studiolarluz.com.br/api/webhooks/stripe` escutando o evento `payment_intent.succeeded`.

### 3. AliExpress & DSers Import
1. Conecte sua conta do AliExpress ao aplicativo **DSers** em sua loja Shopify.
2. Defina suas regras de margem em `.env.local`:
   ```env
   ALIEXPRESS_MARKUP_MULTIPLIER=2.8
   ALIEXPRESS_SHIPPING_BUFFER_BRL=18.50
   ALIEXPRESS_USD_BRL_RATE=5.70
   REMESSA_CONFORME_TAX_PERCENT=20.0
   ```
3. Para rodar a sincronização manual:
   ```bash
   npm run sync:aliexpress
   ```

---

## 🎨 Paleta de Cores e Tokens de Design

Extraídos diretamente da logo oficial do Studio Lar & Luz e referências:

- **Fundo Creme / Warm Off-White**: `#F8F6F0` (base) e `#ECE9E3` (papel texturizado)
- **Texto Principal**: `#201F1E` (carvão escuro de alto contraste)
- **Tipografia da Logo**: `#55534F` (cinza carvão mineral)
- **Ação / CTA Terracota**: `#B56339` (hover `#9E542E`)
- **Verde Oliva Secundário**: `#5D6041` (acento natural de biofilia)
- **Dourado Nobre Escovado**: Gradiente `linear-gradient(135deg, #CEAC6F, #B89C68, #A38B63)`
- **Rodapé**: `#201F1E`

---

## 📄 Páginas Implementadas

| Rota | Descrição |
|:---|:---|
| `/` | Homepage com 10 seções da referência, hero com 3D, bestsellers e UGC |
| `/colecoes` | Catálogo completo de categorias |
| `/colecoes/[handle]` | Página da categoria com ordenação e filtros |
| `/produtos/[handle]` | PDP com visualizador 3D 360°, calculadora de CEP, parcelamento e Pix |
| `/carrinho` | Sacola completa com barra progressiva de frete grátis e cupons |
| `/checkout` | Checkout brasileiro com Pix QR / Copia e Cola e Cartão |
| `/checkout/sucesso` | Confirmação de pedido com animação de confetes e código Pix |
| `/rastreio` | Rastreamento em tempo real por pedido `#LL1042` e transportadoras |
| `/conta` | Painel do cliente com histórico de pedidos e endereços |
| `/lista-de-desejos` | Wishlist salva em localStorage |
| `/journal` | Blog de conteúdo e marketing orgânico para SEO/AIO |
| `/journal/[slug]` | Artigo detalhado com produtos compráveis integrados |
| `/sobre` | Manifesto da marca, sustentabilidade e artesanato |
| `/contato` | SAC com WhatsApp oficial, formulário e FAQ com accordion |
| `/politicas/privacidade` | Política de Privacidade compatível com a LGPD |
| `/politicas/termos` | Termos e condições gerais de contratação |
| `/politicas/trocas-e-devolucoes` | Código de Defesa do Consumidor e 30 dias de troca grátis |
| `/politicas/envio-e-prazos` | Política de frete e prazos para todas as regiões do Brasil |
| `/llms.txt` | Conhecimento estruturado da marca para inteligências artificiais |
| `/robots.txt` & `/sitemap.xml` | Diretrizes de indexação para motores de busca |
# studio-lar-luz-beta
# studio-lar-luz
