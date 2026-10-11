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

// Twinkling stars in hero
const stars = document.getElementById('stars');
for (let i = 0; i < 28; i++) {
  const s = document.createElement('i');
  s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--s:${2 + Math.random() * 4}px;--d:${2 + Math.random() * 3}s;--w:${Math.random() * 4}s`;
  stars.appendChild(s);
}

// Scroll progress bar
const bar = document.getElementById('progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
}, { passive: true });

// Scroll reveal
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: .12 }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// Count-up numbers
document.querySelectorAll('[data-count]').forEach(el => {
  const end = +el.dataset.count, t0 = performance.now(), dur = 1800;
  const step = t => {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
});

// 3D tilt on cards (mouse devices only)
if (matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.tilt').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });
}

// Active nav link on scroll
const links = [...menu.querySelectorAll('a:not(.btn)')];
const spy = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) spy.observe(s); });

// "Enroll Now" pre-selects the course in the form
document.querySelectorAll('[data-course]').forEach(a => a.addEventListener('click', () => {
  document.getElementById('topic').value = a.dataset.course;
}));

// Contact form -> WhatsApp
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const text = `Assalamu Alaikum!\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nCourse: ${f.get('topic')}\nDays: ${f.get('days')}\nMessage: ${f.get('msg') || '-'}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

document.getElementById('yr').textContent = new Date().getFullYear();
