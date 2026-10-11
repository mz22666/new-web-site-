// Set this to your WhatsApp number (country code, no + or spaces)
const WHATSAPP = '923000000000';

const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

// Menu category filter
const filters = document.getElementById('filters');
filters.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  filters.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
  document.querySelectorAll('.dish').forEach(d =>
    d.classList.toggle('hide', btn.dataset.f !== 'all' && d.dataset.c !== btn.dataset.f));
});

// Order button -> WhatsApp
document.querySelectorAll('.dish .order').forEach(b => b.addEventListener('click', () => {
  const name = b.closest('.dish').querySelector('h3').textContent;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Assalamu Alaikum, I would like to order: ' + name)}`, '_blank', 'noopener');
}));

// Contact form -> WhatsApp
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const text = `Assalamu Alaikum!\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nInterested in: ${f.get('topic')}\nMessage: ${f.get('msg') || '-'}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

// Scroll reveal
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: .12 }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

document.getElementById('yr').textContent = new Date().getFullYear();
