const $ = id => document.getElementById(id);

/* ===== Navegação entre páginas (só mostra/esconde as seções do HTML) ===== */
const pages = [...document.querySelectorAll('.page')];
const links = [...document.querySelectorAll('nav a')];

function show() {
  const k = (location.hash || '#inicio').slice(1);
  const id = pages.some(p => p.id === k) ? k : 'inicio';
  pages.forEach(p => p.hidden = p.id !== id);
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  const t = $(id).querySelector('h1').textContent.replace('.', '');
  document.title = 'Pedro Lucas — ' + (id === 'inicio' ? 'Estudante de TI' : t);
  window.scrollTo({ top: 0 });
}
addEventListener('hashchange', show);
show();

/* ===== Efeito: chips entram em sequência ===== */
pages.forEach(p => p.querySelectorAll('.chip').forEach((c, i) => c.style.setProperty('--i', i)));

/* ===== Efeito: brilho que segue o mouse nos cards ===== */
document.querySelector('main').addEventListener('pointermove', e => {
  const c = e.target.closest('.card');
  if (!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  c.style.setProperty('--my', (e.clientY - r.top) + 'px');
});

/* ===== Modo claro / escuro ===== */
const root = document.documentElement, mq = matchMedia('(prefers-color-scheme: dark)');
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
if (saved) root.dataset.theme = saved;

const cur = () => root.dataset.theme || (mq.matches ? 'dark' : 'light');
const SUN = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON = '<svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

function label() {
  const dark = cur() === 'dark', b = $('theme');
  b.innerHTML = dark ? SUN : MOON;
  b.title = dark ? 'Mudar para modo claro' : 'Mudar para modo escuro';
  b.setAttribute('aria-label', b.title);
}
$('theme').onclick = () => {
  const n = cur() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = n;
  try { localStorage.setItem('theme', n); } catch (e) {}
  label();
};
mq.onchange = label;
label();
