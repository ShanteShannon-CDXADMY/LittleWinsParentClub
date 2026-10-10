(() => {
  const button = document.querySelector('.topics-toggle');
  const nav = document.getElementById('blog-topics');
  if (!button || !nav) return;
  document.documentElement.classList.add('topics-enhanced');
  const mobile = window.matchMedia('(max-width: 700px)');
  const close = () => { button.setAttribute('aria-expanded', 'false'); nav.classList.remove('topics-open'); };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('topics-open', open);
  });
  nav.addEventListener('click', event => { if (mobile.matches && event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && nav.classList.contains('topics-open')) { close(); button.focus(); }
  });
  mobile.addEventListener('change', close);
})();
