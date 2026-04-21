(function(){

  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll',()=>nav.classList.toggle('sc',scrollY>60),{passive:true});

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  if(hamburger && drawer){
    hamburger.addEventListener('click',()=>{
      const open = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
    });
    // Close on any drawer link click
    drawer.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>{
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded','false');
        drawer.setAttribute('aria-hidden','true');
      });
    });
  }

  // Service tabs
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const t=btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b=>{b.classList.toggle('active',b.dataset.tab===t);b.setAttribute('aria-selected',String(b.dataset.tab===t))});
      document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.id===t));
    });
  });

  // Scroll reveal
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const el=e.target;
          setTimeout(()=>el.classList.add('on'),Number(el.dataset.delay||0));
          obs.unobserve(el);
        }
      });
    },{threshold:.1,rootMargin:'0px 0px -44px 0px'});
    document.querySelectorAll('[data-r]').forEach(el=>obs.observe(el));
  }else{
    document.querySelectorAll('[data-r]').forEach(el=>el.classList.add('on'));
  }

  // Counters
  if(!window.matchMedia('(prefers-reduced-motion:reduce)').matches&&'IntersectionObserver' in window){
    const co=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const el=e.target,end=parseFloat(el.dataset.count)||0,sfx=el.dataset.suffix||'',dur=1800;
          let s=null;
          const step=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1),v=end*(p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2);el.textContent=v.toFixed(0)+sfx;if(p<1)requestAnimationFrame(step)};
          requestAnimationFrame(step);
          co.unobserve(el);
        }
      });
    },{threshold:.5});
    document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href').slice(1);
      const el=document.getElementById(id);
      if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'})}
    });
  });

  // Cookie
  const banner=document.getElementById('cookie');
  if(!localStorage.getItem('ck'))setTimeout(()=>banner.classList.add('vis'),1400);
  document.getElementById('ca').addEventListener('click',()=>{localStorage.setItem('ck','1');banner.classList.remove('vis')});
  document.getElementById('cd').addEventListener('click',()=>{localStorage.setItem('ck','0');banner.classList.remove('vis')});
})();