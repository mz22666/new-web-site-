// Same WhatsApp number as script.js (country code, no + or spaces)
const WHATSAPP = '923194499481';

const PACKAGES = {
  p1:   { name: 'Package 1',             info: '2 classes / week · 8 classes / month',  gbp: 44,  usd: 64 },
  p2:   { name: 'Package 2',             info: '3 classes / week · 12 classes / month', gbp: 54,  usd: 74 },
  p3:   { name: 'Package 3',             info: '5 classes / week · 20 classes / month', gbp: 90,  usd: 99 },
  wk:   { name: 'Weekend Package',       info: 'Weekend classes · 10 classes / month',  gbp: 69,  usd: 79 },
  all:  { name: 'All Quranic Teachings', info: '3 classes / week · 13 classes / month · 40 mins / class', gbp: 95,  usd: 105 },
  hifz: { name: 'Hifz ul Quran Course',  info: '4 classes / week · 18 classes / month', gbp: 120, usd: 140 }
};
const SYMBOL = { gbp: '£', usd: '$' };
const METHODS = { bank: 'Bank Account Transfer', payoneer: 'Payoneer' };

const $ = id => document.getElementById(id);
const menu = $('menu'), burger = $('burger');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

const pkg = $('package'), cur = $('currency'), method = $('method');
const summary = $('summary'), hint = $('hint'), receipt = $('receipt');

function update() {
  const p = PACKAGES[pkg.value], c = cur.value, m = method.value;
  const amount = p ? SYMBOL[c] + p[c] : '';

  summary.hidden = !p;
  if (p) { $('s-name').textContent = p.name; $('s-info').textContent = p.info; $('s-amount').textContent = amount; }

  document.querySelectorAll('.detail').forEach(d => { d.hidden = d.id !== 'd-' + m; });
  document.querySelectorAll('.amt').forEach(a => { a.textContent = p ? amount : 'the package amount'; });

  const ready = !!(p && m);
  hint.hidden = ready;
  hint.textContent = !p && !m ? 'Please select a package and a payment method to see the payment details.'
                   : !p ? 'Please select your package.' : 'Please select a payment method.';
  receipt.hidden = !ready;
  if (ready) {
    const text = `Assalamu Alaikum! I have paid for ${p.name} (${amount} / month) via ${METHODS[m]}. Please find the receipt attached.`;
    receipt.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }
  // details stay hidden until a package is chosen too
  document.querySelectorAll('.detail').forEach(d => { if (!p) d.hidden = true; });

  const q = new URLSearchParams();
  if (pkg.value) q.set('package', pkg.value);
  if (c !== 'gbp') q.set('currency', c);
  if (m) q.set('method', m);
  try { history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : '')); } catch (_) {}
}
[pkg, cur, method].forEach(el => el.addEventListener('change', update));

// open from "Pay now" links: payment.html?package=p2&currency=usd&method=bank
const qs = new URLSearchParams(location.search);
if (PACKAGES[qs.get('package')]) pkg.value = qs.get('package');
if (SYMBOL[qs.get('currency')]) cur.value = qs.get('currency');
if (METHODS[qs.get('method')]) method.value = qs.get('method');
update();

// Copy buttons
document.querySelectorAll('.copy-btn').forEach(b => b.addEventListener('click', async () => {
  const text = b.previousElementSibling.textContent.trim();
  try { await navigator.clipboard.writeText(text); } catch (_) {
    const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
  }
  b.textContent = 'Copied ✓'; b.classList.add('done');
  setTimeout(() => { b.textContent = 'Copy'; b.classList.remove('done'); }, 1600);
}));

$('yr').textContent = new Date().getFullYear();
