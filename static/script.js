/* ── BMI LIVE METER ────────────────── */
const bmiCats = [
  { max: 18.5, label: 'Underweight', color: '#3b8bff', pct: 14 },
  { max: 25, label: 'Normal', color: '#00e5a0', pct: 34 },
  { max: 30, label: 'Overweight', color: '#ffb347', pct: 60 },
  { max: 35, label: 'Obese I', color: '#f97316', pct: 78 },
  { max: 40, label: 'Obese II', color: '#ff5c7a', pct: 90 },
  { max: Infinity, label: 'Obese III', color: '#dc2626', pct: 100 },
];
document.getElementById('bmi-in').addEventListener('input', function () {
  const v = parseFloat(this.value);
  const fill = document.getElementById('bmi-fill');
  const hint = document.getElementById('bmi-hint');
  if (!v || v < 10) {
    fill.style.width = '0%';
    hint.textContent = 'Enter your BMI above';
    hint.style.color = 'var(--muted)';
    return;
  }
  const c = bmiCats.find(c => v < c.max) || bmiCats[bmiCats.length - 1];
  fill.style.width = c.pct + '%';
  fill.style.background = c.color;
  hint.style.color = c.color;
  hint.textContent = `BMI ${v.toFixed(1)} — ${c.label}`;
});

/* ── SMOKER TOGGLE ──────────────── */
function setSmoker(v) {
  document.getElementById('h-smoker').value = v;
  document.getElementById('chip-no').className = 'chip' + (v === 0 ? ' on-no' : '');
  document.getElementById('chip-yes').className = 'chip' + (v === 1 ? ' on-yes' : '');
}

/* ── REGION TOGGLE ──────────────── */
function setRegion(v) {
  document.getElementById('h-region').value = v;
  [0, 1, 2, 3].forEach(i =>
    document.getElementById('rc-' + i).classList.toggle('on', i === v)
  );
}

/* ── AJAX SUBMIT — NO PAGE RELOAD ── */
async function submitForm() {
  const age = document.getElementById('f-age').value.trim();
  const bmi = document.getElementById('bmi-in').value.trim();
  const children = document.getElementById('f-children').value.trim();
  const btn = document.getElementById('sub-btn');

  // Validate
  if (!age || !bmi || children === '') {
    btn.classList.add('shake');
    setTimeout(() => btn.classList.remove('shake'), 450);
    const prev = btn.textContent;
    btn.textContent = '⚠ Please fill all fields';
    setTimeout(() => btn.textContent = prev, 2200);
    return;
  }

  // Loading state
  btn.innerHTML = '<span class="spin"></span>Calculating...';
  btn.disabled = true;

  // Build FormData exactly like your Flask backend expects
  // request.form.values() reads: age, bmi, children, gender, smoker, region
  const fd = new FormData();
  fd.append('age', age);
  fd.append('bmi', bmi);
  fd.append('children', children);
  fd.append('gender', document.getElementById('f-gender').value);
  fd.append('smoker', document.getElementById('h-smoker').value);
  fd.append('region', document.getElementById('h-region').value);

  try {
    const res = await fetch('/predict', { method: 'POST', body: fd });

    if (!res.ok) throw new Error('HTTP ' + res.status);

    const html = await res.text();

    // Flask returns render_template('index.html', prediction_text="Insurance Cost: 12345.67")
    // Parse that number from the returned HTML
    let amount = null;

    // Strategy 1: regex match "Insurance Cost: NUMBER" in returned HTML
    const m = html.match(/Insurance\s+Cost:\s*([\d.]+)/i);
    if (m) {
      amount = parseFloat(m[1]);
    }

    // Strategy 2: fallback — look for any large number in the result div area
    if (!amount || isNaN(amount)) {
      const m2 = html.match(/class="result"[^>]*>[\s\S]*?([\d]{4,}\.[\d]+)/);
      if (m2) amount = parseFloat(m2[1]);
    }

    // Strategy 3: just grab any float >= 1000 that looks like a price
    if (!amount || isNaN(amount)) {
      const nums = html.match(/\b(\d{4,}\.\d+)\b/g);
      if (nums && nums.length) amount = parseFloat(nums[nums.length - 1]);
    }

    if (amount && !isNaN(amount)) {
      showResult('₹ ' + Math.round(amount).toLocaleString('en-IN'));
    } else {
      showResult('⚠ Could not read prediction');
    }

  } catch (err) {
    console.error(err);
    showResult('⚠ Server error — check console');
  }

  btn.innerHTML = '→ Calculate My Premium';
  btn.disabled = false;
}

function showResult(text) {
  const box = document.getElementById('result-box');
  const val = document.getElementById('res-val');

  // Re-trigger animation
  val.style.animation = 'none';
  val.offsetHeight; // reflow
  val.style.animation = '';

  val.textContent = text;
  box.classList.add('open');
  setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
}

/* ── NAVBAR ACTIVE LINK HIGHLIGHT ── */
const sections = ['home', 'predict'];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 80;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const inView = y >= el.offsetTop && y < el.offsetTop + el.offsetHeight;
    document.querySelectorAll('.nav-link').forEach(a => {
      if (a.getAttribute('href') === '#' + id) {
        a.style.color = inView ? 'var(--accent)' : '';
      }
    });
  });
});