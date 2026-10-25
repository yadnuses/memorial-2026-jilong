(function(){
  const script=document.currentScript;
  const CH=+script.dataset.ch;
  const LANG=script.dataset.lang||'zh';
  const EN=LANG==='en';
  /* site.js 始终位于 <站点根>/shared/site.js，因此退一级即站点根（中英一致） */
  const BASE=new URL('../',script.src).href;
  /* 当前语言下的页面根（zh 为站点根，en 为 /en/） */
  const ROOT=EN?BASE+'en/':BASE;

  const T=EN?{
    brand:'Gyirong · 2026',
    navLabel:'Chapter navigation',
    home:'Back to cover',
    chapters:[['01','The Morning Port','ch2/index.html',2],
              ['02','Mountain into Torrent','ch3/index_astra2.html',3],
              ['03','Rescue and Names','ch4/index.html',4],
              ['04','Names','ch5/index.html',5]],
    sources:'Sources',
    flowers:'Lay a flower →',
    dataSources:'Sources & Method →',
    next:'NEXT CHAPTER · ',
    readOn:'Continue',
    switchLang:'中文',
    switchHref:null
  }:{
    brand:'吉隆 · 2026',
    navLabel:'章节导航',
    home:'返回封面',
    chapters:[['01','清晨的口岸','ch2/index.html',2],
              ['02','山体与洪流','ch3/index_astra2.html',3],
              ['03','救援与名单','ch4/index.html',4],
              ['04','名字','ch5/index.html',5]],
    sources:'来源',
    flowers:'送一朵花吧 →',
    dataSources:'数据来源与方法 →',
    next:'NEXT CHAPTER · ',
    readOn:'继续阅读',
    switchLang:'EN',
    switchHref:null
  };

  const mask=document.createElement('div');
  mask.id='entry-mask';
  document.body.appendChild(mask);
  const progress=document.createElement('div');
  progress.id='reading-progress';
  document.body.appendChild(progress);

  const nav=document.createElement('nav');
  nav.id='chapter-nav';
  nav.setAttribute('aria-label',T.navLabel);
  nav.innerHTML='<a class="brand" href="'+ROOT+'index.html" aria-label="'+T.home+'"><span>'+T.brand+'</span></a><div class="links"></div>';
  const links=nav.querySelector('.links');
  T.chapters.forEach(d=>{
    const a=document.createElement('a');
    a.href=ROOT+d[2];
    if(CH===d[3])a.className='on';
    a.innerHTML='<b>'+d[0]+'</b><span>'+d[1]+'</span>';
    links.appendChild(a);
  });
  const src=document.createElement('a');
  src.href=ROOT+'sources.html';src.className='source-link';src.textContent=T.sources;
  links.appendChild(src);
  document.body.appendChild(nav);

  /* 语言切换：始终指向另一种语言的同一页 */
  (function langSwitch(){
    /* 当前页相对站点根的路径，如 "ch2/index.html" 或 "en/ch2/index.html" */
    const here=location.href.split('#')[0].split('?')[0];
    const rel=here.indexOf(BASE)===0?here.slice(BASE.length):'';
    const target=EN
      ? BASE+rel.replace(/^en\//,'')          /* 英文 → 中文：去掉 en/ */
      : BASE+'en/'+rel;                        /* 中文 → 英文：插入 en/ */
    const a=document.createElement('a');
    a.id='lang-switch';
    a.href=target;
    a.textContent=T.switchLang;
    a.setAttribute('aria-label',EN?'Switch to Chinese':'Switch to English');
    links.appendChild(a);
  })();

  function paintProgress(){
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';
  }
  addEventListener('scroll',paintProgress,{passive:true});
  addEventListener('resize',paintProgress);
  paintProgress();

  if(CH===5){
    const flower=document.createElement('a');
    flower.id='flower-link';flower.href=ROOT+'ch5/flowers.html';flower.textContent=T.flowers;
    document.body.appendChild(flower);
    const end=document.createElement('a');
    end.id='src-link';end.href=ROOT+'sources.html';end.textContent=T.dataSources;
    document.body.appendChild(end);
    return;
  }
  const next=T.chapters.find(d=>d[3]===CH+1);
  if(!next)return;
  const zone=document.createElement('a');
  zone.id='next-chapter';
  zone.href=ROOT+(CH===4?'ch5/enter.html':next[2]);
  zone.innerHTML='<div class="nc-inner"><div class="k">'+T.next+next[0]+'</div><div class="t">'+next[1]+'</div><div class="hint">'+T.readOn+'</div></div>';
  document.body.appendChild(zone);
})();
