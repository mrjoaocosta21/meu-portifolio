/* Menu móvel, indicação da seção atual e ano do rodapé. */

function focarSecao(section) {
  if (!section) return;

  const precisaTabindex = !section.hasAttribute('tabindex');
  if (precisaTabindex) {
    section.setAttribute('tabindex', '-1');
    section.addEventListener('blur', () => section.removeAttribute('tabindex'), { once: true });
  }
  section.focus({ preventScroll: true });
}

function iniciarMenuMovel() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  if (!menuToggle || !navLinks || !navOverlay) return;

  const mobile = window.matchMedia('(max-width: 760px)');
  const links = [...navLinks.querySelectorAll('a[href]')];
  const estadoDoFundo = new Map();
  let aberto = false;

  function bloquearFundo() {
    const elementos = document.querySelectorAll('main, .site-footer, .skip-link, .site-header .brand, .header-cta');
    elementos.forEach(elemento => {
      estadoDoFundo.set(elemento, elemento.getAttribute('inert'));
      elemento.setAttribute('inert', '');
    });
  }

  function restaurarFundo() {
    estadoDoFundo.forEach((valor, elemento) => {
      if (valor === null) elemento.removeAttribute('inert');
      else elemento.setAttribute('inert', valor);
    });
    estadoDoFundo.clear();
  }

  function definirMenu(abrir, devolverFoco = false) {
    const proximoEstado = abrir && mobile.matches;
    if (proximoEstado && !aberto) bloquearFundo();
    aberto = proximoEstado;

    menuToggle.classList.toggle('active', aberto);
    navLinks.classList.toggle('active', aberto);
    navOverlay.classList.toggle('active', aberto);
    document.body.classList.toggle('menu-open', aberto);
    menuToggle.setAttribute('aria-expanded', String(aberto));
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');

    if (aberto) {
      window.requestAnimationFrame(() => {
        if (aberto && mobile.matches) (links[0] || menuToggle).focus({ preventScroll: true });
      });
    }
    else {
      restaurarFundo();
      if (devolverFoco && mobile.matches) menuToggle.focus({ preventScroll: true });
    }
  }

  function sincronizarViewport() {
    const focoAnterior = document.activeElement;
    definirMenu(false);

    if (mobile.matches && navLinks.contains(focoAnterior)) {
      menuToggle.focus({ preventScroll: true });
    } else if (!mobile.matches && focoAnterior === menuToggle) {
      const linkAtual = navLinks.querySelector('[aria-current="location"]') || links[0];
      linkAtual?.focus({ preventScroll: true });
    }
  }

  menuToggle.addEventListener('click', () => definirMenu(!aberto, aberto));
  navOverlay.addEventListener('click', () => definirMenu(false, true));

  links.forEach(link => {
    link.addEventListener('click', event => {
      if (!aberto || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      definirMenu(false);
      const section = document.getElementById(link.hash.slice(1));
      if (section) focarSecao(section);
      else menuToggle.focus({ preventScroll: true });
    });
  });

  document.addEventListener('keydown', event => {
    if (!aberto) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      definirMenu(false, true);
      return;
    }
    if (event.key !== 'Tab') return;

    const elementos = [...links, menuToggle];
    const primeiro = elementos[0];
    const ultimo = elementos[elementos.length - 1];
    const foco = document.activeElement;
    if (event.shiftKey && (foco === primeiro || !elementos.includes(foco))) {
      event.preventDefault();
      ultimo.focus();
    } else if (!event.shiftKey && (foco === ultimo || !elementos.includes(foco))) {
      event.preventDefault();
      primeiro.focus();
    }
  });

  document.addEventListener('focusin', event => {
    if (aberto && event.target !== menuToggle && !navLinks.contains(event.target)) {
      (links[0] || menuToggle).focus({ preventScroll: true });
    }
  });

  mobile.addEventListener('change', sincronizarViewport);
  document.body.classList.add('navigation-ready');
  sincronizarViewport();
}

function iniciarNavegacaoPorSecao() {
  const header = document.querySelector('.site-header');
  const entradas = [...document.querySelectorAll('#nav-links a[href^="#"]')]
    .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(entrada => entrada.section);
  let atual = null;
  let atualizacaoPendente = false;

  function atualizar() {
    atualizacaoPendente = false;
    header?.classList.toggle('is-scrolled', window.scrollY > 20);
    if (!entradas.length) return;

    const limite = (header?.getBoundingClientRect().bottom || 0) + 24;
    const chegouAoFim = window.scrollY > 0
      && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2;
    let entradaAtual = entradas[0];

    if (chegouAoFim) entradaAtual = entradas[entradas.length - 1];
    else {
      entradas.forEach(entrada => {
        if (entrada.section.getBoundingClientRect().top <= limite) entradaAtual = entrada;
      });
    }

    if (atual === entradaAtual) return;
    atual = entradaAtual;
    entradas.forEach(entrada => {
      const ativa = entrada === atual;
      entrada.link.classList.toggle('is-current', ativa);
      if (ativa) entrada.link.setAttribute('aria-current', 'location');
      else entrada.link.removeAttribute('aria-current');
    });
  }

  function agendarAtualizacao() {
    if (atualizacaoPendente) return;
    atualizacaoPendente = true;
    window.requestAnimationFrame(atualizar);
  }

  window.addEventListener('scroll', agendarAtualizacao, { passive: true });
  window.addEventListener('resize', agendarAtualizacao);
  window.addEventListener('hashchange', agendarAtualizacao);
  window.addEventListener('load', agendarAtualizacao, { once: true });
  entradas.forEach(({ link }) => link.addEventListener('click', agendarAtualizacao));
  document.fonts?.ready.then(agendarAtualizacao);
  atualizar();
}

iniciarMenuMovel();
iniciarNavegacaoPorSecao();

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
