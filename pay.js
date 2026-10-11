// Same WhatsApp number as script.js (country code, no + or spaces)
const WHATSAPP = '923194499481';

const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

const method = document.getElementById('method');
const hint = document.getElementById('hint');
const receipt = document.getElementById('receipt');
const names = { bank: 'Bank Account Transfer', payoneer: 'Payoneer' };

function show(v) {
  document.querySelectorAll('.detail').forEach(d => { d.hidden = d.id !== 'd-' + v; });
  hint.hidden = !!v;
  receipt.hidden = !v;
  if (v) {
    const text = `Assalamu Alaikum! I have made the payment via ${names[v]}. Please find the receipt attached.`;
    receipt.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }
  try { history.replaceState(null, '', v ? '#' + v : location.pathname); } catch (_) {}
}
method.addEventListener('change', () => show(method.value));

// open directly with payment.html#bank or payment.html#payoneer
const start = location.hash.slice(1);
if (names[start]) { method.value = start; show(start); }

// Copy buttons
document.querySelectorAll('.copy-btn').forEach(b => b.addEventListener('click', async () => {
  const text = b.previousElementSibling.textContent.trim();
  try { await navigator.clipboard.writeText(text); } catch (_) {
    const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
  }
  b.textContent = 'Copied ✓'; b.classList.add('done');
  setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('done'); }, 1600);
}));

document.getElementById('yr').textContent = new Date().getFullYear();
