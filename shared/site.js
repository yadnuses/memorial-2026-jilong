(function(){
  const script=document.currentScript;
  const CH=+script.dataset.ch;
  const BASE=new URL('../',script.src).href;
  const META=[
    ['01','清晨的口岸','ch2/index.html',2],
    ['02','山体与洪流','ch3/index_astra2.html',3],
    ['03','救援与名单','ch4/index.html',4],
    ['04','名字','ch5/index.html',5]
  ];
  const mask=document.createElement('div');
  mask.id='entry-mask';
  document.body.appendChild(mask);
  const progress=document.createElement('div');
  progress.id='reading-progress';
  document.body.appendChild(progress);
  const nav=document.createElement('nav');
  nav.id='chapter-nav';
  nav.setAttribute('aria-label','章节导航');
  nav.innerHTML='<a class="brand" href="'+BASE+'index.html" aria-label="返回封面"><span>吉隆 · 2026</span></a><div class="links"></div>';
  const links=nav.querySelector('.links');
  META.forEach(d=>{
    const a=document.createElement('a');
    a.href=BASE+d[2];
    if(CH===d[3])a.className='on';
    a.innerHTML='<b>'+d[0]+'</b><span>'+d[1]+'</span>';
    links.appendChild(a);
  });
  const src=document.createElement('a');
  src.href=BASE+'sources.html';src.className='source-link';src.textContent='来源';
  links.appendChild(src);
  document.body.appendChild(nav);
  function paintProgress(){
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';
  }
  addEventListener('scroll',paintProgress,{passive:true});
  addEventListener('resize',paintProgress);
  paintProgress();
  if(CH===5){
    const end=document.createElement('a');
    end.id='src-link';end.href=BASE+'sources.html';end.textContent='数据来源与方法 →';
    document.body.appendChild(end);
    return;
  }
  const next=META.find(d=>d[3]===CH+1);
  if(!next)return;
  const zone=document.createElement('a');
  zone.id='next-chapter';
  /* 第 4 章「名字」之后先进过渡页，再进纪念墙 */
  zone.href=BASE+(CH===4?'ch5/enter.html':next[2]);
  zone.innerHTML='<div class="nc-inner"><div class="k">NEXT CHAPTER · '+next[0]+'</div><div class="t">'+next[1]+'</div><div class="hint">继续阅读</div></div>';
  document.body.appendChild(zone);
})();
