// New simplified script: gift click -> show surprise + confetti
const giftBtn = document.getElementById('gift');
const surprise = document.getElementById('surprise');
const closeSurprise = document.getElementById('closeSurprise');
const confettiRoot = document.getElementById('confetti-root');
const bgAudio = document.getElementById('bgAudio');

function triggerConfetti(){
  const count = 45;
  const colors = ['#ff6b97','#ffc0cb','#ff8fa3','#ffd6e0','#ff4d7e'];
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.left = (Math.random()*100) + '%';
    el.style.top = (-5 - Math.random()*10) + 'vh';
    el.style.width = (6 + Math.random()*12) + 'px';
    el.style.height = (8 + Math.random()*16) + 'px';
    el.style.borderRadius = (Math.random()>0.6? '2px':'50%');
    const dur = 2000 + Math.random()*2000;
    el.style.animation = `confettiFall ${dur}ms linear forwards`;
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    confettiRoot.appendChild(el);
    setTimeout(()=> el.remove(), dur + 300);
  }
}

function openSurprise(){
  giftBtn.classList.add('open');
  surprise.setAttribute('aria-hidden','false');
  triggerConfetti();
  // play background audio as this is a user gesture (click on gift)
  if(bgAudio){
    // ensure loop and reasonable volume
    try{ bgAudio.loop = true; bgAudio.volume = 0.6; bgAudio.play().catch(()=>{}); }catch(e){}
  }
}

function closeSurpriseFn(){
  giftBtn.classList.remove('open');
  surprise.setAttribute('aria-hidden','true');
}

giftBtn.addEventListener('click', ()=>{
  // small pop animation then open
  giftBtn.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(0.92)' },
    { transform: 'scale(1.04)' },
    { transform: 'scale(1)' }
  ], { duration: 520, easing: 'cubic-bezier(.2,.9,.3,1)' });
  setTimeout(openSurprise, 360);
});

closeSurprise.addEventListener('click', closeSurpriseFn);
surprise.addEventListener('click', (e)=>{ if(e.target === surprise) closeSurpriseFn(); });

// Accessibility: close on Esc
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeSurpriseFn(); });

// open next page when user clicks the CTA
const openNextBtn = document.getElementById('openNext');
if(openNextBtn){
  openNextBtn.addEventListener('click', ()=>{
    // navigate to next.html in the same folder
    window.location.href = 'next.html';
  });
}

