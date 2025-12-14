// main.js — interactions minimal & accessible
document.addEventListener("DOMContentLoaded", function(){
  // Year in footer
  const y = new Date().getFullYear();
  const elYear = document.getElementById('year');
  if(elYear) elYear.textContent = y;

  // Mobile menu toggle
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
      // simple focus management
      if(!expanded){
        nav.querySelector('a')?.focus();
      } else {
        toggle.focus();
      }
    });
  }

  // Simple hero parallax (subtle)
  const heroMedia = document.querySelector('.hero-media img');
  window.addEventListener('scroll', function(){
    if(!heroMedia) return;
    const scrolled = window.scrollY;
    const offset = Math.min(Math.max(scrolled * 0.08, 0), 20);
    heroMedia.style.transform = `translateY(${offset}px) scale(1.01)`;
  }, {passive:true});

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href === "#" || href === "#!") return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // move focus for a11y
        setTimeout(()=> target.querySelector('h2, p, a, input')?.focus(), 600);
      }
    })
  });

  // Minimal image zoom for product cards (optional)
  document.querySelectorAll('.product-card img').forEach(img=>{
    img.addEventListener('click', function(){
      // simple lightbox
      const overlay = document.createElement('div');
      overlay.style.position='fixed';overlay.style.inset='0';overlay.style.background='rgba(0,0,0,0.6)';overlay.style.display='flex';overlay.style.alignItems='center';overlay.style.justifyContent='center';overlay.style.zIndex='1200';
      const big = document.createElement('img');
      big.src = this.src;
      big.style.maxWidth='90%';big.style.maxHeight='90%';big.style.borderRadius='12px';big.style.boxShadow='0 20px 60px rgba(0,0,0,0.5)';
      overlay.appendChild(big);
      overlay.addEventListener('click', ()=> overlay.remove());
      document.body.appendChild(overlay);
    })
  });

});
