# Festa de Natal 2026 · Sonhar Acordado SJC

Site de inscrição de voluntários. HTML, CSS e JavaScript puros, sem build.
Para ver localmente, abra `index.html` no navegador. Com o arquivo aberto direto (`file://`), o player do YouTube mostra erro 153 e o site avisa; para ver o vídeo localmente, rode `python -m http.server` na pasta e abra `http://localhost:8000`.

## Editar os dados do ano

Quase tudo fica no objeto `CONFIG`, no topo de [`js/main.js`](js/main.js):

| O que muda | Onde |
|---|---|
| Data, horário, local, endereço, link do Maps | `CONFIG.evento` |
| Prazo de inscrição | `CONFIG.prazoInscricao` |
| Valor da inscrição e da camiseta | `CONFIG.inscricaoPreco` e `CONFIG.camisetaPreco` |
| Links dos Google Forms | `CONFIG.FORM_APOIO` e `CONFIG.FORM_CRIANCA` (com `''` ou `'#'` o botão vira "Em breve") |
| Formações obrigatórias | `CONFIG.formacoes` (lista vazia mostra "Datas das formações em breve") |
| Vídeo da festa (ID do YouTube; vazio esconde a seção) | `CONFIG.videoYoutube` |
| WhatsApp, Instagram, e-mail | `CONFIG.contato` |

Exemplo de formação:

```js
formacoes: [
  { data: '2026-11-07', horario: '09:00 às 12:00', local: 'Nome do local', endereco: 'Rua, número – bairro' }
]
```

Fora do `CONFIG`, revise também:

- `evento-natal.ics`: data, horário e local do arquivo de calendário (datas em UTC; 09:00 em Brasília = 12:00Z).
- `index.html`: o ano no rodapé e o tema no título e no hero; as respostas do FAQ marcadas com `<!-- CONFIRMAR -->`.
- Legendas e `alt` das fotos na galeria (em `index.html` e na lista `fotos` do `main.js`).

## Cores e fontes

Variáveis em `:root`, no início de [`css/style.css`](css/style.css). Fontes (Grandstander e Figtree) vêm do Google Fonts.

## Imagens

`assets/img/` guarda os originais (não são usados pelo site). O site usa `assets/img/optimized/` (WebP em vários tamanhos).
Para trocar uma foto, gere novas versões em WebP nas larguras usadas no `srcset`.

## Publicar no GitHub Pages

1. Envie o conteúdo desta pasta para um repositório no GitHub.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, a branch `main` e a pasta `/ (root)`.
3. Aguarde um ou dois minutos. O endereço será `https://<organizacao>.github.io/<repositorio>/`.

Dica: o site usa só caminhos relativos, então funciona em qualquer subpasta. Os originais em `assets/img/*.JPG` (~70 MB)
não precisam ir para o repositório; só `assets/img/optimized/`.
