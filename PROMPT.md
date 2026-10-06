# Prompt — Site de inscrições da Festa de Natal 2026 · Sonhar Acordado SJC

> Use a skill `frontend-design` ao construir. Trabalhe como designer e desenvolvedor front-end sênior.

## 1. Contexto

A ONG **Sonhar Acordado SJC** (São José dos Campos – SP) realiza todo ano uma festa de Natal para crianças, feita por voluntários. Preciso de um novo site de inscrição de voluntários para a edição **2026**, substituindo o de 2024.

- Site atual (referência do conteúdo, **não** do visual): https://sonhar-acordado-sjc.github.io/festa-de-natal-2024/
- Código de 2024 (somente leitura): `../festa-de-natal-2024/` (`index.html`, `inscricoes.html`, `style.css`)
- Pasta de trabalho: esta (`inscricoes-festa-de-natal-2026`). Os assets estão em `assets/img/` (`Logo.png`, `Logo.jpg` e 8 fotos reais `DSC_*.JPG`). **Abra e olhe cada imagem** antes de decidir como usá-las.

### Problemas do site atual a resolver
- Parece um Bootstrap 4 padrão: cards vermelhos empilhados, tudo com o mesmo peso, Arial, muito texto corrido.
- O botão de inscrição só aparece no fim da página; as 2 formas de participar ficam separadas em outra página.
- Não usa fotos reais nem a identidade da logo.
- Acessibilidade fraca: links sem destaque, contraste irregular.
- Depende de jQuery, Bootstrap e de um script de terceiros para o WhatsApp.

## 2. Tema e direção de arte

**Tema 2026: "Super-heróis salvam o Natal".** Os voluntários são os super-heróis do dia; as crianças são quem eles ajudam a ter um Natal especial.

Direção visual:
- **Alegre, clean, acolhedor e leve.** Muito respiro, tipografia bem escolhida, fotos reais como protagonistas.
- **Proibido:** cores vibrantes ou neon, gradientes chamativos, elementos piscando, pulsando ou em loop, carrosséis automáticos, emojis decorativos em excesso, glassmorphism, ícones genéricos em cards idênticos, e qualquer cara de "template gerado por IA".
- **Super-herói com sutileza:** referências elegantes, como capa, estrela, escudo/emblema, balões de quadrinho e meio-tom (halftone) discreto em cantos ou divisores. Nada de HQ gritante. O emblema pode usar o arco-íris da logo como símbolo de herói.
- **Paleta:** derivada da logo (vermelho-coral `#EF4A4A`, laranja `#F68B5A`, amarelo `#F5E637`), mas **suavizada e harmonizada**: tons terrosos/dessaturados, por exemplo coral queimado, terracota, mostarda suave e um azul-petróleo ou azul-marinho discreto para equilibrar o clima "herói + Natal". Fundo em off-white/creme quente, texto em um quase-preto quente. Defina tudo como variáveis CSS e **valide o contraste WCAG AA**. Nunca use amarelo como cor de texto sobre fundo claro.
- **Tipografia:** um par de fontes do Google Fonts com personalidade e boa legibilidade (títulos amigáveis e arredondados com leve toque de quadrinho, mas sóbrios; texto corrido limpo). Evite Inter, Roboto, Arial e a escolha "default" de IA. Carregue com `display=swap`.
- **Tom do texto (pt-BR):** acolhedor, caloroso e direto, mantendo um pouco da alegria de 2024, mas **sem** "UHUUUUUL!!!" e sem exclamações em excesso. Fale com o voluntário na 2ª pessoa ("você"). Use a skill/critério de UX copy para microcopy, botões e FAQ.
- **Movimento:** só transições suaves e discretas (hover, foco, revelar ao rolar com `IntersectionObserver` e fade curto). Tudo deve respeitar `prefers-reduced-motion`. Nada que fique se mexendo sozinho.

## 3. Stack e restrições técnicas

- **HTML5 + CSS3 + JavaScript puro (vanilla).** Sem frameworks, sem build, sem jQuery/Bootstrap. Deve rodar abrindo `index.html` e publicar direto no **GitHub Pages**.
- **Página única** com navegação por âncoras (menu enxuto que vira botão/menu no mobile, rolagem suave).
- **Mobile-first** (a maioria acessará pelo celular via WhatsApp/Instagram). Teste em 360px, 768px, 1024px e 1440px. Sem rolagem horizontal.
- CSS organizado: variáveis (`:root`) para cores, tipografia, espaçamentos e raios; layout com CSS Grid/Flexbox; sem `!important`.
- Imagens: converta/gere versões otimizadas (WebP/AVIF quando possível, com `srcset`/`sizes`, `loading="lazy"`, `width`/`height` definidos para evitar layout shift). As fotos originais são grandes; **não** as sirva cruas.
- Acessibilidade: HTML semântico, hierarquia de headings correta, `alt` descritivo, foco visível, navegação por teclado, alvos de toque ≥ 44px, link "pular para o conteúdo", contraste AA.
- SEO e Open Graph **não** são necessários; mantenha apenas `title`, `lang="pt-BR"` e `viewport`. Ícone do site (favicon) a partir da logo.

## 4. Estrutura da página (ordem sugerida)

1. **Cabeçalho/navegação:** logo pequena + âncoras (Sobre, Como participar, Quando e onde, Galeria, Dúvidas) + botão "Quero participar".
2. **Hero:** título do tema ("Super-heróis salvam o Natal"), subtítulo curto, data/local em destaque, prazo "Inscrições até 10/11" **como texto estático** (sem contagem regressiva animada) e **2 CTAs claros** que levam à seção de inscrição. Use uma foto real forte e a logo. Não temos arte de capa do tema, então **crie** a composição com tipografia, formas e as fotos.
3. **Sobre a festa:** o que é, para quem é e por que importa (aproveite o texto de 2024, reescrito com o novo tom e o tema).
4. **Quem pode participar:** faixa etária **16 a 35 anos** em destaque. Quem estiver fora da faixa deve falar conosco (link para o WhatsApp/e-mail/Instagram).
5. **Como participar:** passo a passo visual curto (inscrever-se → ir a **uma** formação obrigatória → participar da festa). Deixe claro que *a inscrição só é efetivada com o comparecimento na formação de abertura*.
6. **Escolha seu papel (seção principal de conversão):** 2 cards lado a lado (empilhados no mobile), com o mesmo peso visual:
   - **Voluntário de Apoio:** auxilia antes e durante o evento (logística: check-in de crianças e voluntários, alimentação, arrecadação de alimentos, transporte das crianças; decoração; elaboração e organização das atividades das estações). Aviso: **não fica com uma criança** ao longo da festa; é uma extensão da coordenação.
   - **Voluntário com Criança:** acompanha uma criança durante todo o evento, o "super tio/tia" de confiança. Os textos completos estão em `../festa-de-natal-2024/inscricoes.html`; reescreva-os mais curtos e escaneáveis.
   - Cada card tem botão "Me inscrever" abrindo o Google Forms em nova aba (`rel="noopener noreferrer"`).
   - **Links dos formulários ainda não existem:** centralize-os em um único objeto de configuração no topo do JS ou em constantes (`FORM_APOIO`, `FORM_CRIANCA`) com placeholder `#`. Se o link estiver vazio, o botão deve aparecer desabilitado, com o texto "Em breve", em vez de levar para `#`.
7. **Quando e onde:**
   - Data: **29 de novembro de 2026 (domingo)**. Confira o dia da semana antes de escrever. Horário: **09:00 às 18:00**.
   - Local: **Conselho Central Sul de São José dos Campos**. Endereço: Av. Ouro Fino, 880 – Bosque dos Eucaliptos, São José dos Campos – SP, 12233-540. Link do Maps: https://maps.app.goo.gl/wE5zNxSRgB67ovay9
   - Botão "Como chegar" e botão "Adicionar ao calendário" (gere um `evento-natal.ics` novo para 2026, com o local correto; use o de 2024 como modelo).
   - Bloco de **Formações obrigatórias**: datas/locais **vazios por enquanto**. Crie uma estrutura de dados simples (array no JS, ou HTML comentado e fácil de editar) para eu preencher depois. Enquanto estiver vazio, mostre "Datas das formações em breve" com um estado vazio bem feito.
   - Prazo final de inscrição: **10/11/2026**.
8. **Quanto custa:** a camiseta é R$ 40,00 *caso você precise*. Explique que o valor é o de compra e que a camiseta é usada na festa e fica de lembrança. **Não mostre Pix nem QR Code.**
9. **Galeria:** use as fotos de `assets/img/DSC_*.JPG`. Grid editorial (tamanhos variados, ou masonry simples em CSS), com **lightbox acessível feito à mão** (teclado, `Esc`, setas, foco preso no diálogo, `alt` descritivo). Sem autoplay. Legenda curta opcional, como "Festa de Natal 2024".
10. **Dúvidas frequentes (FAQ):** acordeão com `<details>/<summary>` ou botões ARIA. Sugestão: *Posso participar se tiver menos de 16 ou mais de 35? Preciso ir à formação? E se eu não puder no dia da formação? Qual a diferença entre os dois papéis? A camiseta é obrigatória? Posso me inscrever em grupo/amigos? Quem posso contatar?* Escreva as respostas com base no conteúdo conhecido e **marque com `<!-- CONFIRMAR -->`** o que eu não informei, em vez de inventar regras.
11. **Contato e rodapé:** WhatsApp (12) 99219-5271, Instagram @sonharacordadosjc (https://www.instagram.com/sonharacordadosjc/), e-mail grandesfestas.sjc@sonharacordado.org.br e "© 2026 Sonhar Acordado SJC".
12. **Botão flutuante de WhatsApp** próprio (sem script de terceiros), link `https://wa.me/5512992195271?text=` + a mensagem "Olá, estou fazendo a inscrição para a Festa de Natal e preciso de ajuda.", codificada com `encodeURIComponent`. Discreto, sem animação, sem cobrir conteúdo importante nem o rodapé no mobile, com `aria-label`.

## 5. Dados centralizados
Coloque em um único lugar (objeto `CONFIG` no JS ou data-attributes) tudo o que muda a cada ano: data, horário, local, endereço, link do Maps, prazo, preço da camiseta, links dos formulários, formações e contatos. O objetivo é que, em 2027, bastem poucas edições.

## 6. Entregáveis
- `index.html`, `css/style.css`, `js/main.js`, `evento-natal.ics`, favicon, `assets/img/` (otimizadas) e um `README.md` curto explicando como editar os dados anuais e como publicar no GitHub Pages.
- Não apague nem altere `assets/` original sem avisar; gere as versões otimizadas em subpasta.

## 7. Como trabalhar e critérios de aceite
1. Antes de codar: leia o site/arquivos de 2024, abra as imagens e **me apresente a direção de arte** (paleta com hex e contraste, fontes, ideia do hero) em poucas linhas.
2. Construa a página e **rode-a no navegador** (Playwright): capture screenshots em 360, 768 e 1440px e corrija o que estiver quebrado.
3. Faça uma revisão final de acessibilidade (contraste, teclado, foco, `alt`) e de performance (peso das imagens, sem JS desnecessário).
4. **Aceite:**
   - Nada pisca nem se mexe sozinho; as animações respeitam `prefers-reduced-motion`.
   - Cores suaves e harmônicas, sem neon; contraste AA.
   - Os 2 caminhos de inscrição aparecem acima da dobra (CTA no hero) e na seção de papéis.
   - Todos os dados do evento estão corretos e centralizados.
   - Funciona bem em celular, com fotos otimizadas e carregamento rápido.
   - Visualmente, o site **não** se parece com um template de IA nem com o site de 2024.

## 8. Pendências (não invente; deixe placeholders claros)
- Links dos 2 Google Forms de 2026.
- Datas e locais das formações.
- Respostas do FAQ marcadas com `CONFIRMAR`.
- Legendas/`alt` das fotos, se não for possível descrevê-las com certeza.
