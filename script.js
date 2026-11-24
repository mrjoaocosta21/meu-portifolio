/* ==========================================================
   JOÃO.DEV — INTERAÇÕES
   Menu móvel, cabeçalho, slider acessível e ano do rodapé.
   ========================================================== */

const header = document.querySelector('.site-header');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

function definirMenu(aberto, devolverFoco = false) {
  if (!menuToggle || !navLinks || !navOverlay) return;
  menuToggle.classList.toggle('active', aberto);
  navLinks.classList.toggle('active', aberto);
  navOverlay.classList.toggle('active', aberto);
  menuToggle.setAttribute('aria-expanded', String(aberto));
  menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', aberto);
  if (!aberto && devolverFoco) menuToggle.focus();
}

if (menuToggle && navLinks && navOverlay) {
  menuToggle.addEventListener('click', () => definirMenu(!navLinks.classList.contains('active')));
  navOverlay.addEventListener('click', () => definirMenu(false, true));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => definirMenu(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('active')) {
      definirMenu(false, true);
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) definirMenu(false);
  });
}

function atualizarCabecalho() {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', atualizarCabecalho, { passive: true });
atualizarCabecalho();

/* Slider sem troca automática: dá controle ao visitante.
   Teclas de seta, Home e End funcionam APENAS com o foco nas abas. */
class PortfolioSlider {
  constructor(element) {
    this.element = element;
    this.slides = [...element.querySelectorAll('.project-slide')];
    this.tabs = [...element.querySelectorAll('.slider-tab')];
    this.prev = element.querySelector('.prev-button');
    this.next = element.querySelector('.next-button');
    this.status = element.querySelector('#slider-status');
    this.current = 0;
    if (!this.slides.length || this.slides.length !== this.tabs.length) return;
    this.bindEvents();
    this.show(0);
  }

  show(index, moveFocus = false) {
    this.current = (index + this.slides.length) % this.slides.length;
    this.slides.forEach((slide, i) => {
      const active = i === this.current;
      slide.hidden = !active;
      slide.classList.toggle('is-active', active);
    });
    this.tabs.forEach((tab, i) => {
      const active = i === this.current;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    if (this.status) this.status.textContent = `Projeto ${this.current + 1} de ${this.slides.length}`;
    if (moveFocus) this.tabs[this.current].focus();
  }

  bindEvents() {
    this.prev?.addEventListener('click', () => this.show(this.current - 1));
    this.next?.addEventListener('click', () => this.show(this.current + 1));
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.show(index));
      tab.addEventListener('keydown', event => {
        let target;
        if (event.key === 'ArrowRight') target = this.current + 1;
        if (event.key === 'ArrowLeft') target = this.current - 1;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = this.slides.length - 1;
        if (target === undefined) return;
        event.preventDefault();
        this.show(target, true);
      });
    });
  }
}
const slider = document.getElementById('project-slider');
if (slider) new PortfolioSlider(slider);

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
