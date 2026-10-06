/* ==========================================================================
   DADOS DO ANO — edite só este bloco para a próxima edição.
   (Lembre de atualizar também o arquivo evento-natal.ics.)
   ========================================================================== */
const CONFIG = {
  evento: {
    data: '2026-11-29',            // AAAA-MM-DD
    inicio: '09:00',
    fim: '18:00',
    local: 'Conselho Central Sul de São José dos Campos',
    endereco: 'Av. Ouro Fino, 880 – Bosque dos Eucaliptos, São José dos Campos – SP, 12233-540',
    mapa: 'https://maps.app.goo.gl/wE5zNxSRgB67ovay9'
  },
  prazoInscricao: '2026-11-10',     // AAAA-MM-DD
  inscricaoPreco: 60,               // em reais
  camisetaPreco: 40,                // em reais

  // Links dos Google Forms. Deixe '' ou '#' e o botão aparece como "Em breve".
  FORM_APOIO: '#',
  FORM_CRIANCA: '#',

  // Vídeo da festa anterior: só o ID do YouTube (o trecho depois de youtu.be/). Vazio esconde a seção.
  videoYoutube: 'W_ctpeb-MZI',

  // Formações obrigatórias. Enquanto a lista estiver vazia, a página mostra "em breve".
  // Exemplo: { data: '2026-11-07', horario: '09:00 às 12:00', local: 'Nome do local', endereco: 'Rua, número – bairro' }
  formacoes: [],

  contato: {
    whatsapp: '5512992195271',      // só números, com DDI e DDD
    whatsappTexto: '(12) 99219-5271',
    whatsappMensagem: 'Olá, estou fazendo a inscrição para a Festa de Natal e preciso de ajuda.',
    instagram: 'sonharacordadosjc',
    email: 'grandesfestas.sjc@sonharacordado.org.br'
  }
};

/* ========================================================================== */

(function () {
  'use strict';

  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Formatação ---------- */
  const parseData = (iso) => {
    const [a, m, d] = iso.split('-').map(Number);
    return new Date(a, m - 1, d);
  };
  const fmt = (data, opts) => new Intl.DateTimeFormat('pt-BR', opts).format(data);
  const horaCurta = (h) => h; // já no formato HH:MM

  const dataEvento = parseData(CONFIG.evento.data);
  const dataPrazo = parseData(CONFIG.prazoInscricao);
  const { contato } = CONFIG;

  const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const valores = {
    dataExtenso: fmt(dataEvento, { day: 'numeric', month: 'long', year: 'numeric' }),
    dataCurta: fmt(dataEvento, { day: 'numeric', month: 'long' }),
    diaDataCurta: fmt(dataEvento, { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^./, (c) => c.toUpperCase()),
    diaSemana: fmt(dataEvento, { weekday: 'long' }),
    horario: `${horaCurta(CONFIG.evento.inicio)} às ${horaCurta(CONFIG.evento.fim)}`,
    local: CONFIG.evento.local,
    endereco: CONFIG.evento.endereco,
    prazoCurto: fmt(dataPrazo, { day: '2-digit', month: '2-digit' }),
    precoInscricao: brl.format(CONFIG.inscricaoPreco),
    preco: brl.format(CONFIG.camisetaPreco),
    whatsappTexto: contato.whatsappTexto,
    instagramTexto: '@' + contato.instagram,
    email: contato.email
  };

  const urls = {
    mapaUrl: CONFIG.evento.mapa,
    whatsappUrl: `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(contato.whatsappMensagem)}`,
    instagramUrl: `https://www.instagram.com/${contato.instagram}/`,
    emailUrl: `mailto:${contato.email}`
  };

  document.querySelectorAll('[data-bind]').forEach((el) => {
    const v = valores[el.dataset.bind];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-bind-href]').forEach((el) => {
    const u = urls[el.dataset.bindHref];
    if (u) el.setAttribute('href', u);
  });
  // O dia da semana vem de CONFIG; "domingo" -> "Domingo" na capa do ingresso via CSS.

  /* ---------- Formulários (desabilita se não houver link) ---------- */
  const formularios = { apoio: CONFIG.FORM_APOIO, crianca: CONFIG.FORM_CRIANCA };
  document.querySelectorAll('[data-form]').forEach((a) => {
    const url = (formularios[a.dataset.form] || '').trim();
    if (url && url !== '#') {
      a.href = url;
      return;
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.disabled = true;
    btn.className = a.className + ' btn--off';
    btn.textContent = 'Em breve';
    a.replaceWith(btn);
  });

  /* ---------- Vídeo ---------- */
  const secVideo = document.getElementById('video');
  const idVideo = (CONFIG.videoYoutube || '').trim();
  if (idVideo) {
    secVideo.hidden = false;
    document.getElementById('video-link').href = `https://youtu.be/${idVideo}`;
    const frame = document.getElementById('video-frame');
    if (location.protocol === 'file:') {
      // O YouTube recusa o player (erro 153) em páginas abertas como arquivo local. Online funciona.
      const aviso = document.createElement('p');
      aviso.className = 'video__aviso';
      aviso.textContent = 'O player só aparece com o site publicado. Use o link "Assistir no YouTube".';
      frame.replaceWith(aviso);
    } else {
      frame.src = `https://www.youtube-nocookie.com/embed/${idVideo}?rel=0`;
    }
  }

  /* ---------- Formações ---------- */
  const lista = document.getElementById('formacoes-lista');
  const vazio = document.getElementById('formacoes-vazio');
  if (CONFIG.formacoes.length) {
    vazio.hidden = true;
    lista.hidden = false;
    CONFIG.formacoes.forEach((f) => {
      const li = document.createElement('li');
      const d = parseData(f.data);
      const dia = document.createElement('span');
      dia.className = 'formacao__dia';
      dia.textContent = fmt(d, { day: '2-digit', month: 'short' }).replace('.', '');
      const corpo = document.createElement('span');
      const t = document.createElement('strong');
      t.textContent = `${fmt(d, { weekday: 'long' })}${f.horario ? ', ' + f.horario : ''}`;
      corpo.append(t);
      [f.local, f.endereco].filter(Boolean).forEach((txt) => {
        corpo.append(document.createElement('br'), document.createTextNode(txt));
      });
      li.append(dia, corpo);
      lista.append(li);
    });
  }

  /* ---------- WhatsApp flutuante ---------- */
  const zap = document.getElementById('zap');
  zap.href = urls.whatsappUrl;
  const rodape = document.querySelector('.rodape');
  const contatoSecao = document.getElementById('contato');
  if ('IntersectionObserver' in window) {
    const ocultar = new Set();
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => (e.isIntersecting ? ocultar.add(e.target) : ocultar.delete(e.target)));
      zap.classList.toggle('zap--oculto', ocultar.size > 0);
    });
    io.observe(rodape);
    io.observe(contatoSecao);
  }

  /* ---------- Menu mobile ---------- */
  const btnMenu = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  const abrirMenu = (abrir) => {
    btnMenu.setAttribute('aria-expanded', String(abrir));
    menu.classList.toggle('menu--aberto', abrir);
  };
  btnMenu.addEventListener('click', () => abrirMenu(btnMenu.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) abrirMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btnMenu.getAttribute('aria-expanded') === 'true') {
      abrirMenu(false);
      btnMenu.focus();
    }
  });

  /* ---------- Revelar ao rolar (fade curto) ---------- */
  const revelaveis = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduzMovimento) {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visivel');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revelaveis.forEach((el) => obs.observe(el));
  } else {
    revelaveis.forEach((el) => el.classList.add('visivel'));
  }

  /* ---------- Lightbox ---------- */
  const fotos = [
    { arq: 'dsc-0011', w: 1600 },
    { arq: 'dsc-0070', w: 960 },
    { arq: 'dsc-0072', w: 1200 },
    { arq: 'dsc-0182', w: 1200 },
    { arq: 'dsc-0218', w: 960 },
    { arq: 'dsc-0272', w: 1200 },
    { arq: 'dsc-0510', w: 1600 },
    { arq: 'dsc-0010', w: 1600 }
  ];
  const lb = document.getElementById('lb');
  const lbImg = document.getElementById('lb-img');
  const lbCont = document.getElementById('lb-cont');
  const botoes = document.querySelectorAll('.galeria button');
  let atual = 0;

  const mostrar = (i) => {
    atual = (i + fotos.length) % fotos.length;
    const f = fotos[atual];
    const miniatura = botoes[atual].querySelector('img');
    lbImg.src = `assets/img/optimized/${f.arq}-${f.w}.webp`;
    lbImg.alt = miniatura.alt;
    lbImg.width = miniatura.width;
    lbImg.height = miniatura.height;
    lbCont.textContent = `Foto ${atual + 1} de ${fotos.length}`;
  };

  botoes.forEach((b, i) => b.addEventListener('click', () => {
    mostrar(i);
    lb.showModal();
  }));
  document.getElementById('lb-fechar').addEventListener('click', () => lb.close());
  document.getElementById('lb-ant').addEventListener('click', () => mostrar(atual - 1));
  document.getElementById('lb-prox').addEventListener('click', () => mostrar(atual + 1));
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); mostrar(atual - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); mostrar(atual + 1); }
  });
  // Clique fora da foto (no fundo) fecha. O <dialog> nativo já prende o foco e trata Esc.
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
})();
