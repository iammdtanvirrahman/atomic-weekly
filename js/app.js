(function(){
'use strict';
var $=function(id){return document.getElementById(id)};
var quotes=[
 {q:'The important thing is not to stop questioning.',by:'Albert Einstein',kind:'Wonder'},
 {q:'The unexamined life is not worth living.',by:'Socrates',kind:'Philosophy'},
 {q:'Where there is love there is life.',by:'Mahatma Gandhi',kind:'Love'},
 {q:'I think, therefore I am.',by:'René Descartes',kind:'Mind'},
 {q:'The only true wisdom is in knowing you know nothing.',by:'Socrates',kind:'Humility'},
 {q:'It is the mark of an educated mind to be able to entertain a thought without accepting it.',by:'Aristotle',kind:'Reason'},
 {q:'We are all in the gutter, but some of us are looking at the stars.',by:'Oscar Wilde',kind:'Wonder'},
 {q:'The heart has its reasons of which reason knows nothing.',by:'Blaise Pascal',kind:'Love'},
 {q:'Life can only be understood backwards; but it must be lived forwards.',by:'Søren Kierkegaard',kind:'Life'},
 {q:'Knowing yourself is the beginning of all wisdom.',by:'Aristotle',kind:'Knowledge'},
 {q:'The most beautiful experience we can have is the mysterious.',by:'Albert Einstein',kind:'Science'},
 {q:'Love is composed of a single soul inhabiting two bodies.',by:'Aristotle',kind:'Love'}
];
var lastQuote=-1;
function pickQuote(){var n=Math.floor(Math.random()*quotes.length);if(quotes.length>1&&n===lastQuote)n=(n+1+Math.floor(Math.random()*(quotes.length-1)))%quotes.length;lastQuote=n;return quotes[n]}
function setHeroQuote(){var q=pickQuote();$('heroQuote').querySelector('blockquote').textContent='“'+q.q+'”';$('heroQuote').querySelector('.quote-by span').textContent=q.by}
function setBandQuote(){var q=pickQuote();$('bandQuote').textContent='“'+q.q+'”';$('bandQuoteBy').textContent=q.by}
setHeroQuote();setBandQuote();$('year').textContent=new Date().getFullYear();

var seed=[
 {id:'seed-black-holes',title:'The Mystery Beyond the Event Horizon',author:'Atomic Desk',section:'Science',dek:'A black hole is more than a cosmic monster. It is a frontier where our best theories meet their limits.',cover:'./assets/cover-cosmos.svg',content:'<p>There are places in the universe where gravity becomes so intense that the usual language of space and time begins to break down. A black hole is one of the most remarkable predictions of general relativity — and one of the strongest invitations to keep asking questions.</p><h2>The boundary of no return</h2><p>The event horizon is not a physical surface. It is a boundary in spacetime beyond which no signal can reach a distant observer. To someone watching from far away, matter approaching the horizon appears to slow and dim; for an infalling observer, the experience is described very differently.</p><blockquote>Science is not a collection of final answers. It is a method for making our questions sharper.</blockquote><h2>What we still do not know</h2><p>At the centre of the simplest classical solutions lies a singularity, where the equations stop giving sensible physical predictions. That is a sign that general relativity is incomplete in that extreme setting, not a complete description of what nature must contain. A future theory of quantum gravity may give us a better picture.</p><p>The universe leaves clues in glowing accretion disks, in the motion of nearby stars, and in ripples in spacetime. Each observation brings the invisible a little closer to understanding.</p>'},
 {id:'seed-love',title:'Why Love Changes the Way We See the World',author:'Atomic Desk',section:'Love',dek:'Affection changes what we notice, what we remember, and how we make meaning from ordinary moments.',cover:'./assets/cover-love.svg',content:'<p>Love does not make the world smaller. At its best, it makes our attention larger. A familiar street becomes a place linked to a memory; a song changes because it carries a voice; a quiet gesture starts to matter more than a grand promise.</p><h2>The science of paying attention</h2><p>Our brains do not record life like a camera. Emotion influences what we notice and how memories are stored. Feeling close to someone can make their words, needs and small habits unusually vivid. That does not mean love is only chemistry; it means our inner experience has a body, a history and a context.</p><blockquote>Sometimes tenderness is simply the decision to keep noticing.</blockquote><h2>Love as practice</h2><p>Lasting affection is not only an emotion that arrives without effort. It is also made of repeated choices: listening without rehearsing a reply, showing up when it is inconvenient, respecting the other person as a whole person, and letting each person continue to grow.</p><p>There is wonder in the cosmos and wonder in the ordinary. Love is one way we learn to see both.</p>'},
 {id:'seed-moon',title:'The Moon: Earth’s Quiet Companion',author:'Atomic Desk',section:'Space',dek:'The Moon is a record of violent beginnings, a guide to the tides, and a world still full of scientific questions.',cover:'./assets/cover-moon.svg',content:'<p>Every month, the Moon changes shape in our sky. The phases are a geometry of sunlight, orbit and viewpoint: half of the Moon is lit by the Sun at almost every moment, but we see changing portions of that illuminated half.</p><h2>A history written in rock</h2><p>The leading model suggests that the Moon formed from debris after a giant impact early in Earth’s history. Its ancient surface preserved craters and volcanic plains that help planetary scientists reconstruct events from billions of years ago.</p><p>The Moon also stabilizes Earth’s axial tilt over long timescales and raises tides through gravity. It is not just decoration in the night sky; it is part of the system that shaped our planet.</p><blockquote>Looking at the Moon is a way of looking back at the early Solar System.</blockquote><h2>A world worth revisiting</h2><p>Future missions can examine permanently shadowed craters, map local resources and test how people and machines function far from Earth. Each step has both practical and scientific value.</p>'},
 {id:'seed-quiet',title:'Finding Peace in a Noisy World',author:'Atomic Desk',section:'Life',dek:'A slower rhythm does not mean a smaller life. It can be a way to make room for what matters.',cover:'./assets/cover-life.svg',content:'<p>Modern life can make attention feel like an endless notification stream. Every moment asks for a reaction. But not every urgent thing is important, and not every quiet thing is insignificant.</p><h2>Attention is a finite resource</h2><p>When we leave a little space between stimulus and response, we get a chance to choose. A walk without audio, a few minutes with a book, or a conversation with the phone face down can restore a sense of continuity to the day.</p><blockquote>Rest is not a reward for finishing everything. It is part of being able to live well.</blockquote><p>Peace is not the absence of difficulty. It is the habit of returning, gently, to the part of life that is actually in front of us.</p>'},
 {id:'seed-ai',title:'The Future of Intelligence',author:'Atomic Desk',section:'Technology',dek:'Machines can generate answers quickly. Human judgement still has to decide which questions are worth asking.',cover:'./assets/cover-tech.svg',content:'<p>Artificial intelligence is changing the way people write, build software, translate language, search for patterns and explore scientific data. The most useful conversations are not about magic or doom; they are about what systems can do, how they fail, and who is responsible for their outcomes.</p><h2>Capability is not the same as judgement</h2><p>A model can be fluent and still be wrong. A reliable workflow therefore combines machine assistance with evidence, testing, privacy protections and human review. The higher the stakes, the more important it is to verify rather than assume.</p><blockquote>Tools extend our reach. Values decide where we point them.</blockquote><p>The future of intelligence will be shaped not only by more capable technology, but by the institutions, habits and people that use it.</p>'},
 {id:'seed-philosophy',title:'What Makes a Life Meaningful?',author:'Atomic Desk',section:'Philosophy',dek:'Meaning can be found in relationships, responsibility, curiosity and the choices we repeat.',cover:'./assets/cover-philosophy.svg',content:'<p>Philosophers have offered different answers to the question of how a person should live. Some emphasise virtue, others freedom, happiness, duty, faith or the reduction of suffering. The disagreement is real, but it can help us see our own assumptions more clearly.</p><h2>Meaning is not always a grand discovery</h2><p>A meaningful life may include a large purpose, but it can also be built through small acts: learning something carefully, keeping a promise, caring for someone, making something useful, or refusing to abandon a difficult question.</p><p>Purpose is often less like finding a hidden label and more like shaping a path through repeated action. Our circumstances matter; so do the choices still available to us.</p><blockquote>What we give our attention to slowly becomes part of the life we have lived.</blockquote>'},
 {id:'seed-nature',title:'The Quiet Intelligence of Trees',author:'Atomic Desk',section:'Nature',dek:'Forests are living networks of competition, cooperation and adaptation on timescales longer than our own.',cover:'./assets/cover-nature.svg',content:'<p>A forest is not a single organism, and trees do not think in the human sense. Yet plants respond to light, water, damage, seasonal cycles and chemical signals with a sophistication that deserves attention.</p><h2>Connected lives</h2><p>Roots interact with fungi and other organisms in the soil. These relationships can help plants access nutrients, though popular accounts sometimes overstate how coordinated or generous these exchanges are. Forest ecology is complex precisely because many individual organisms respond to changing local conditions.</p><p>To understand a forest is to see a community rather than a collection of isolated trunks. That perspective can make conservation feel less abstract and more urgent.</p>'},
 {id:'seed-art',title:'Art Is a Way of Paying Attention',author:'Atomic Desk',section:'Art',dek:'A painting, a poem or a photograph can make something familiar visible again.',cover:'./assets/cover-art.svg',content:'<p>Art can tell a story, preserve a memory, provoke a question or simply make us notice the colour of late afternoon. It does not always need to explain itself in order to matter.</p><p>Looking carefully is a creative act. A familiar face, a cracked wall, the shape of a cloud — each can carry more than one meaning when we give it enough time.</p><blockquote>Sometimes the point of a work of art is not to give us an answer, but to improve the quality of our attention.</blockquote><p>Whether it is made with a camera, a brush, a voice or code, art is one of the ways people share what it feels like to be alive.</p>'}
];
var articles=seed.slice(),isDemo=true,loadingFeed=true,activeCategory='All',query='',visibleCount=9,currentArticle=null,readerReturnFocus=null,observer=null,readUrl='',pendingReaderId=null;
var readTimeCache=new WeakMap(),searchCache=new WeakMap(),dateCache=new WeakMap();
function norm(s){return String(s||'').toLowerCase().trim()}
function niceCategory(a){var c=String(a.section||a.category||a.topic||a.type||'Science').trim();var map={universe:'Space',cosmos:'Space',story:'Stories',stories:'Stories',romance:'Love',technology:'Technology',philosophy:'Philosophy',article:'Science'};return map[norm(c)]||c.charAt(0).toUpperCase()+c.slice(1)}
function plainText(h){var d=document.createElement('div');d.innerHTML=String(h||'');return(d.textContent||d.innerText||'').replace(/\s+/g,' ').trim()}
function dateOf(a){var v=a.publishedAt||a.timestamp||a.updatedAt||a.date||a.createdAt;if(typeof v==='string'&&!/^\d+$/.test(v)){var dt=new Date(v);return isNaN(dt.getTime())?'Recently published':dt.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}var n=Number(v||Date.now());if(n<100000000000)n*=1000;var d=new Date(n);return isNaN(d.getTime())?'Recently published':d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}
function readMinutes(a){if(a&&typeof a==='object'&&readTimeCache.has(a))return readTimeCache.get(a);var text=plainText(a.content||a.text||a.body||a.dek||'');var mins=Math.max(1,Math.ceil(text.split(/\s+/).filter(Boolean).length/220));if(a&&typeof a==='object')readTimeCache.set(a,mins);return mins}
function safeUrl(url){var s=String(url||'').trim();return /^(https?:\/\/|data:image\/)/i.test(s)||s.startsWith('./')||s.startsWith('../')||s.startsWith('/')?s:''}
function articleImage(a){var x=a.cover||a.coverImage||a.image||a.thumbnail||a.heroImage||'';if(!x)return categoryImage(niceCategory(a));var s=String(x).trim();if(/^https?:\/\//i.test(s)||/^data:image\//i.test(s)||s.startsWith('./')||s.startsWith('../')||s.startsWith('/'))return s;if(s.startsWith('assets/'))return 'https://iammdtanvirrahman.github.io/atomic-weekly/'+s.split('/').map(encodeURIComponent).join('/');return 'https://iammdtanvirrahman.github.io/atomic-weekly/assets/'+encodeURIComponent(s)}
function categoryImage(c){var n=norm(c);if(n==='love')return'./assets/cover-love.svg';if(n==='life'||n==='humanity')return'./assets/cover-life.svg';if(n==='technology')return'./assets/cover-tech.svg';if(n==='philosophy')return'./assets/cover-philosophy.svg';if(n==='nature')return'./assets/cover-nature.svg';if(n==='art')return'./assets/cover-art.svg';if(n==='space'||n==='universe')return'./assets/cover-moon.svg';return'./assets/cover-cosmos.svg'}
function articleTitle(a){return a.title||a.headline||'Untitled story'}
function articleDek(a){return a.dek||a.description||a.subtitle||plainText(a.content||a.text||'').slice(0,170)||'A new idea to explore.'}
function dateSort(a){if(a&&typeof a==='object'&&dateCache.has(a))return dateCache.get(a);var n=Number(a.publishedAt||a.timestamp||a.updatedAt||a.createdAt||0);if(n<100000000000&&n>0)n*=1000;if(!n&&a.date)n=new Date(a.date).getTime()||0;if(a&&typeof a==='object')dateCache.set(a,n);return n}
function articleSearchText(a){if(a&&typeof a==='object'&&searchCache.has(a))return searchCache.get(a);var c=niceCategory(a);var value=norm([articleTitle(a),articleDek(a),a.author,c,plainText(a.content||a.text||a.body||'')].join(' '));if(a&&typeof a==='object')searchCache.set(a,value);return value}
function visibleArticles(){var q=norm(query);return articles.filter(function(a){var c=niceCategory(a);var matches=activeCategory==='All'||norm(c)===norm(activeCategory)||((activeCategory==='Space')&&/universe|cosmos/i.test(c));return matches&&(!q||articleSearchText(a).indexOf(q)>-1)}).sort(function(a,b){return dateSort(b)-dateSort(a)})}
function coverStyle(a){return "background-image:linear-gradient(0deg,rgba(8,9,13,.15),transparent),url('"+String(articleImage(a)).replace(/'/g,'%27')+"')"}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function card(a,i,feature){var id=String(a.id||a.key||('story-'+i));var c=niceCategory(a);var meta='<div class="article-meta"><span>'+escapeHtml(dateOf(a))+'</span><span>·</span><span>'+readMinutes(a)+' min read</span></div>';if(feature){return '<article class="feature-card '+(feature==='large'?'large':'')+'" data-open="'+escapeHtml(id)+'" tabindex="0" role="button" aria-label="Read '+escapeHtml(articleTitle(a))+'"><div class="art" style="'+coverStyle(a)+'"></div><div class="feature-content"><span class="category-label">'+escapeHtml(c)+'</span><h3>'+escapeHtml(articleTitle(a))+'</h3><p>'+escapeHtml(articleDek(a))+'</p><div class="feature-bottom">'+meta+'<span class="round-arrow">↗</span></div></div></article>'}return '<article class="article-card" data-open="'+escapeHtml(id)+'" tabindex="0" role="button" aria-label="Read '+escapeHtml(articleTitle(a))+'"><div class="card-art"><img src="'+escapeHtml(articleImage(a))+'" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\''+categoryImage(c)+'\'"><span class="card-index">'+String(i+1).padStart(2,'0')+'</span></div><div class="card-body"><span class="category-label">'+escapeHtml(c)+'</span><h3>'+escapeHtml(articleTitle(a))+'</h3><p class="dek">'+escapeHtml(articleDek(a))+'</p><div class="card-foot"><span class="article-meta">'+escapeHtml(dateOf(a))+'</span><span class="read-label">Read <span>↗</span></span></div></div></article>'}
function openArticleFromTrigger(el){if(!$('reader').classList.contains('open'))readerReturnFocus=el;openArticle(el.getAttribute('data-open'))}
function attachCardEvents(root){root.querySelectorAll('[data-open]').forEach(function(el){el.onclick=function(){openArticleFromTrigger(el)};el.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openArticleFromTrigger(el)}}})}
function observeReveals(){
  if(observer){observer.disconnect();observer=null}
  var els=document.querySelectorAll('.reveal,.article-card');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Older browsers and embedded webviews may not implement IntersectionObserver.
  // Reveal content immediately instead of allowing an unsupported API to break rendering.
  if(reduce||!('IntersectionObserver' in window)){
    els.forEach(function(el){el.classList.add('is-visible');el.style.transitionDelay='0ms'});
    return;
  }
  var activeObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('is-visible');activeObserver.unobserve(e.target)}
    });
  },{threshold:.1,rootMargin:'0px 0px 40px 0px'});
  observer=activeObserver;
  els.forEach(function(el,i){
    if(el.classList.contains('reveal'))activeObserver.observe(el);
    else{el.style.transitionDelay=(i%6)*45+'ms';activeObserver.observe(el)}
  });
}
function renderFeatured(){var list=visibleArticles().slice();list.sort(function(a,b){var ap=a&&(a.featured===true||a.isFeatured===true||a.editorPick===true||a.pinned===true)?1:0;var bp=b&&(b.featured===true||b.isFeatured===true||b.editorPick===true||b.pinned===true)?1:0;return bp-ap||dateSort(b)-dateSort(a)});if(!list.length)list=articles.slice().sort(function(a,b){return dateSort(b)-dateSort(a)});var a=list[0],b=list[1]||list[0],c=list[2]||list[0];$('featuredGrid').innerHTML=a?card(a,0,'large')+'<div class="feature-stack">'+card(b,1,'small')+card(c,2,'small')+'</div>':'<div class="empty-state"><h3>No stories yet</h3><p>Publish your first story from the editorial desk.</p></div>';attachCardEvents($('featuredGrid'))}
function renderArticles(){var list=visibleArticles();var show=list.slice(0,visibleCount);$('resultsLabel').textContent=list.length+' '+(list.length===1?'story':'stories')+(isDemo?' · starter edition':' · published');$('articleStat').textContent=String(articles.length).padStart(2,'0');$('articlesGrid').innerHTML=show.length?show.map(function(a,i){return card(a,i,false)}).join(''):'<div class="empty-state"><div class="empty-icon">⌕</div><h3>No stories found.</h3><p>Try another category or search term. New articles published from the admin panel will appear here automatically.</p><a href="https://iammdtanvirrahman.github.io/atomic-weekly-admin-panel/" target="_blank" rel="noopener">Open the editorial desk ↗</a></div>';$('loadMore').hidden=list.length<=visibleCount;attachCardEvents($('articlesGrid'));observeReveals()}
function renderAll(){renderFeatured();renderArticles();$('feedState').textContent=isDemo?'Starter edition':'Live editorial feed';$('connectionLabel').textContent=isDemo?(loadingFeed?'Showing starter edition':'Starter edition · waiting for publication'):'Live feed connected'}
function filter(category){activeCategory=category;document.querySelectorAll('[data-category]').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-category')===category)});visibleCount=9;renderAll()}
document.querySelectorAll('[data-category]').forEach(function(b){b.onclick=function(){filter(b.getAttribute('data-category'));if(b.closest('#discover'))$('latest').scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}});
$('loadMore').onclick=function(){visibleCount+=6;renderArticles()};
$('searchBtn').onclick=function(){var open=$('searchDrawer').classList.toggle('open');if(open){$('searchInput').focus()}else{$('searchInput').value='';query='';visibleCount=9;renderArticles()}};
$('mobileSearch').onclick=function(){$('searchDrawer').classList.add('open');$('searchInput').focus();window.scrollTo({top:0,behavior:'smooth'})};
$('searchClose').onclick=function(){$('searchDrawer').classList.remove('open');$('searchInput').value='';query='';visibleCount=9;renderArticles()};
var searchTimer=null,lastSearchHadQuery=false;$('searchInput').oninput=function(){var value=$('searchInput').value;clearTimeout(searchTimer);searchTimer=setTimeout(function(){query=value;visibleCount=query?18:9;renderAll();if(query&&!lastSearchHadQuery)document.getElementById('latest').scrollIntoView({block:'start',behavior:'smooth'});lastSearchHadQuery=!!query},120)};
$('newQuote').onclick=setHeroQuote;$('bandNewQuote').onclick=setBandQuote;
$('menuBtn').onclick=function(){var nav=document.querySelector('.nav');if(!nav)return;var opened=nav.dataset.mobileOpen==='1';nav.dataset.mobileOpen=opened?'0':'1';if(!opened){nav.style.cssText='display:flex;position:absolute;top:67px;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;padding:12px 20px;background:rgba(10,11,16,.98);border-bottom:1px solid var(--line)';nav.querySelectorAll('a').forEach(function(a){a.style.padding='12px 0';a.onclick=function(){nav.dataset.mobileOpen='0';nav.style.display='none'}})}else{nav.style.display='none'}};
var toastTimer=null;function toast(s){$('toast').textContent=s;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){$('toast').classList.remove('show')},2400)}
function sanitizeContent(html){
 var doc=new DOMParser().parseFromString(String(html||''),'text/html');
 doc.querySelectorAll('script,style,object,embed,form,button,input,textarea,select,svg,math,template,link,meta,base,.mediaToolbar,.mediaHandles,.mediaSize,.pageDelete').forEach(function(n){n.remove()});
 var allowed={P:1,DIV:1,SECTION:1,ARTICLE:1,H1:1,H2:1,H3:1,H4:1,UL:1,OL:1,LI:1,BLOCKQUOTE:1,STRONG:1,EM:1,B:1,I:1,U:1,S:1,DEL:1,A:1,IMG:1,FIGURE:1,FIGCAPTION:1,HR:1,TABLE:1,THEAD:1,TBODY:1,TR:1,TD:1,TH:1,PRE:1,CODE:1,BR:1,IFRAME:1,SPAN:1,SUP:1,SUB:1,DETAILS:1,SUMMARY:1,KBD:1,MARK:1,SMALL:1};
 function safeUrl(raw,kind){
  if(!raw||/[\\u0000-\\u0020\\u007f]/.test(raw))return '';
  var value=String(raw).trim();
  if(kind==='anchor'&&value.charAt(0)==='#')return value;
  try{
   var parsed=new URL(value,document.baseURI);
   if(parsed.username||parsed.password)return '';
   if(kind==='anchor'){
    if(parsed.protocol==='https:'||parsed.protocol==='mailto:'||(parsed.origin===location.origin&&parsed.protocol==='http:'))return parsed.href;
   }else if(kind==='image'){
    if(parsed.protocol==='https:'||(parsed.origin===location.origin&&(parsed.protocol==='http:'||parsed.protocol==='https:')))return parsed.href;
   }
  }catch(e){}
  return '';
 }
 Array.from(doc.body.querySelectorAll('*')).reverse().forEach(function(el){
  if(!allowed[el.tagName]){el.replaceWith.apply(el,Array.from(el.childNodes));return}
  var tag=el.tagName,href=el.getAttribute('href'),src=el.getAttribute('src'),alt=el.getAttribute('alt')||'';
  Array.from(el.attributes).forEach(function(attr){el.removeAttribute(attr.name)});
  if(tag==='A'){
   var safeHref=safeUrl(href,'anchor');
   if(safeHref){el.setAttribute('href',safeHref);if(/^https?:/i.test(safeHref)){el.setAttribute('target','_blank');el.setAttribute('rel','noopener noreferrer')}}else{el.removeAttribute('href')}
  }
  if(tag==='IMG'){
   var safeSrc=safeUrl(src,'image');
   if(safeSrc){el.setAttribute('src',safeSrc);el.setAttribute('alt',alt.slice(0,300));el.setAttribute('loading','lazy');el.setAttribute('decoding','async');el.setAttribute('referrerpolicy','no-referrer')}
   else{el.remove()}
  }
  if(tag==='IFRAME'){
   var safeEmbed='';
   try{
    var u=new URL(String(src||''),document.baseURI);
    var allowedHost=(u.protocol==='https:'&&!u.username&&!u.password&&!u.port&&(
      (u.hostname==='www.youtube.com'&&u.pathname.indexOf('/embed/')===0)||
      (u.hostname==='www.youtube-nocookie.com'&&u.pathname.indexOf('/embed/')===0)||
      (u.hostname==='player.vimeo.com'&&u.pathname.indexOf('/video/')===0)
    ));
    if(allowedHost)safeEmbed=u.href;
   }catch(e){}
   if(safeEmbed){el.setAttribute('src',safeEmbed);el.setAttribute('title','Embedded video');el.setAttribute('loading','lazy');el.setAttribute('allowfullscreen','');el.setAttribute('referrerpolicy','strict-origin-when-cross-origin')}
   else{el.remove()}
  }
 });
 return doc.body.innerHTML;
}
function articleById(id){return articles.find(function(a){return String(a.id||a.key)===String(id)})}
function buildReaderToc(){
 var copy=$('readerContent').querySelector('.article-copy'),toc=$('readerContent').querySelector('#readerToc');if(!copy||!toc)return;
 var headings=Array.from(copy.querySelectorAll('h2,h3'));if(headings.length<2){toc.hidden=true;return}
 var list=toc.querySelector('.reader-toc-list');list.innerHTML='';
 headings.forEach(function(h,i){var id='reader-heading-'+i;h.id=id;h.style.scrollMarginTop='88px';var button=document.createElement('button');button.type='button';button.dataset.tocTarget=id;button.dataset.level=h.tagName==='H3'?'3':'2';button.textContent=(i+1)+'. '+(h.textContent||'Section').trim();list.appendChild(button)});
 toc.hidden=false;
}
function updateReaderProgress(){var reader=$('reader'),bar=$('readerProgressBar');if(!reader||!bar)return;var max=reader.scrollHeight-reader.clientHeight;bar.style.width=(max>0?Math.min(100,Math.max(0,reader.scrollTop/max*100)):0)+'%'}
var readerProgressTick=false;$('reader').addEventListener('scroll',function(){if(readerProgressTick)return;readerProgressTick=true;requestAnimationFrame(function(){updateReaderProgress();readerProgressTick=false})},{passive:true});
$('readerContent').addEventListener('click',function(e){var image=e.target.closest('img.zoomable-image');if(image){showImageZoom(image);return}var button=e.target.closest('[data-toc-target]');if(!button)return;var target=$(button.dataset.tocTarget);if(target)target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})});$('readerContent').addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.matches('img.zoomable-image')){e.preventDefault();showImageZoom(e.target)}});

function showImageZoom(image){
 var dialog=$('imageZoom'),zoom=$('imageZoomImg'),caption=$('imageZoomCaption');if(!dialog||!zoom||!image)return;
 zoom.src=image.currentSrc||image.src;zoom.alt=image.alt||'Enlarged article image';
 var fig=image.closest('figure'),cap=fig&&fig.querySelector('figcaption');caption.textContent=(cap&&cap.textContent.trim())||image.alt||'';
 if(typeof dialog.showModal==='function'){if(!dialog.open)dialog.showModal()}else{dialog.setAttribute('open','')}
}
$('imageZoomClose').onclick=function(){var d=$('imageZoom');if(typeof d.close==='function'&&d.open)d.close();else d.removeAttribute('open')};
$('imageZoom').addEventListener('click',function(e){if(e.target===$('imageZoom')){var d=$('imageZoom');if(typeof d.close==='function'&&d.open)d.close();else d.removeAttribute('open')}});
function copyText(text,successMessage){
 if(!navigator.clipboard||!navigator.clipboard.writeText){toast('Clipboard access is unavailable in this browser.');return}
 navigator.clipboard.writeText(String(text||'')).then(function(){toast(successMessage||'Copied to clipboard.')},function(){toast('Could not copy. Check browser clipboard permissions.')});
}
function enhanceReaderContent(){
 var root=$('readerContent');if(!root)return;
 root.querySelectorAll('pre').forEach(function(pre){
  if(pre.parentElement&&pre.parentElement.classList.contains('science-code'))return;
  var frame=document.createElement('div');frame.className='science-code';pre.parentNode.insertBefore(frame,pre);frame.appendChild(pre);
  var btn=document.createElement('button');btn.type='button';btn.className='reader-tool-btn science-code-copy';btn.textContent='Copy code';
  btn.onclick=function(){copyText(pre.innerText||pre.textContent,'Code copied.')};frame.appendChild(btn);
 });
 root.querySelectorAll('img').forEach(function(img){img.classList.add('zoomable-image');img.setAttribute('tabindex','0');img.setAttribute('role','button');img.setAttribute('aria-label',img.alt?'Enlarge image: '+img.alt:'Enlarge article image')});
 root.querySelectorAll('table').forEach(function(table){table.setAttribute('tabindex','0');table.setAttribute('aria-label','Scrollable data table')});
}
var atomicMathLoadPromise=null;
function typesetReaderMath(){
 var body=$('readerContent').querySelector('.article-copy');if(!body||!/(\\\(|\\\[|\$\$|\\begin\{)/.test(body.textContent||''))return;
 function typeset(){if(window.MathJax&&window.MathJax.typesetPromise){window.MathJax.typesetClear&&window.MathJax.typesetClear([body]);window.MathJax.typesetPromise([body]).catch(function(){});}}
 if(window.MathJax&&window.MathJax.typesetPromise){typeset();return}
 if(!atomicMathLoadPromise){
  window.MathJax={tex:{inlineMath:[['\\(','\\)']],displayMath:[['\\[','\\]'],[String.fromCharCode(36).repeat(2),String.fromCharCode(36).repeat(2)]],processEscapes:true},options:{skipHtmlTags:['script','noscript','style','textarea','pre','code']}};
  atomicMathLoadPromise=new Promise(function(resolve,reject){var script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';script.async=true;script.onload=resolve;script.onerror=reject;document.head.appendChild(script)});
 }
 atomicMathLoadPromise.then(typeset).catch(function(){/* keep original TeX source readable when the optional CDN is unavailable */});
}
var readerTextScale=1;
$('readerTextDown').onclick=function(){readerTextScale=Math.max(.85,Math.round((readerTextScale-.1)*10)/10);$('readerContent').style.setProperty('--reader-text-scale',readerTextScale);$('readerToolsNote').textContent='Text size '+Math.round(readerTextScale*100)+'%';};
$('readerTextUp').onclick=function(){readerTextScale=Math.min(1.4,Math.round((readerTextScale+.1)*10)/10);$('readerContent').style.setProperty('--reader-text-scale',readerTextScale);$('readerToolsNote').textContent='Text size '+Math.round(readerTextScale*100)+'%';};
$('readerWidthToggle').onclick=function(){var wide=$('reader').classList.toggle('reader-wide');$('readerWidthToggle').setAttribute('aria-pressed',wide?'true':'false');$('readerWidthToggle').textContent=wide?'Narrow view':'Wide view';$('readerToolsNote').textContent=wide?'Wide reading layout':'Comfortable reading layout';};
$('readerCopyLink').onclick=function(){copyText(location.href,'Article link copied.')};


function setEditorialSpread(enabled){
 var reader=$('reader'),copy=$('readerContent').querySelector('.article-copy'),button=$('readerSpreadToggle');
 if(!copy||!button)return false;
 var pages=copy.querySelectorAll(':scope > .spread-page');
 if(enabled&&!pages.length){
  var nodes=Array.from(copy.childNodes).filter(function(n){return !(n.nodeType===3&&!n.textContent.trim())});
  if(nodes.length<4){toast('This article is too short for open-book view.');return false}
  var weights=nodes.map(function(n){
   if(n.nodeType!==1)return Math.max(1,(n.textContent||'').trim().length*.08);
   var tag=n.tagName,txt=(n.textContent||'').trim().length;
   if(tag==='IMG'||n.querySelector('img,iframe,table,mjx-container'))return Math.max(160,txt*.5);
   if(tag==='H1'||tag==='H2'||tag==='H3'||tag==='H4')return Math.max(90,txt*.75);
   if(tag==='BLOCKQUOTE'||tag==='PRE'||tag==='TABLE'||tag==='IFRAME')return Math.max(140,txt*.55);
   return Math.max(15,txt*.55);
  });
  var total=weights.reduce(function(a,b){return a+b},0),running=0,bestSplit=1,bestDelta=Infinity;
  for(var i=0;i<nodes.length-1;i++){running+=weights[i];var delta=Math.abs(total/2-running);if(delta<bestDelta){bestDelta=delta;bestSplit=i+1}}
  bestSplit=Math.max(1,Math.min(nodes.length-1,bestSplit));
  var left=document.createElement('div'),right=document.createElement('div');
  left.className=right.className='spread-page';
  left.dataset.folio='PLATE 01 / FIELD NOTES';left.setAttribute('aria-label','First page of article spread');
  right.dataset.folio='PLATE 02 / CONTINUED';right.setAttribute('aria-label','Second page of article spread');
  nodes.forEach(function(node,i){(i<bestSplit?left:right).appendChild(node)});
  copy.appendChild(left);copy.appendChild(right);
   }else if(!enabled&&pages.length){
  var restored=[];pages.forEach(function(page){while(page.firstChild)restored.push(page.removeChild(page.firstChild))});
  while(copy.firstChild)copy.removeChild(copy.firstChild);
  restored.forEach(function(node){copy.appendChild(node)});
 }
 reader.classList.toggle('reader-editorial-spread',!!enabled);
 button.setAttribute('aria-pressed',enabled?'true':'false');
 button.textContent=enabled?'Single column':'Open-book view';
 return true;
}
$('readerSpreadToggle').onclick=function(){
 var enabled=!$('reader').classList.contains('reader-editorial-spread');
 if(setEditorialSpread(enabled))$('readerToolsNote').textContent=enabled?'Open-book editorial layout':'Comfortable reading layout';
};

function openArticle(id){var reader=$('reader');var readerWasOpen=reader.classList.contains('open');if(reader.classList.contains('reader-editorial-spread'))setEditorialSpread(false);if(!reader.classList.contains('open')&&!readerReturnFocus){var active=document.activeElement;if(active&&active!==document.body&&active!==document.documentElement&&!reader.contains(active))readerReturnFocus=active}var a=articleById(id);if(!a){if(loadingFeed){pendingReaderId=String(id)}return}pendingReaderId=null;currentArticle=a;var c=niceCategory(a);var body=a.content||a.body||a.text||'';var bodyHtml=/<[a-z][\s\S]*>/i.test(body)?sanitizeContent(body):'<p>'+escapeHtml(body).replace(/\n{2,}/g,'</p><p>').replace(/\n/g,'<br>')+'</p>';var q=pickQuote();$('readerContent').innerHTML='<div class="reader-kicker"><span>'+escapeHtml(c)+'</span><span>／</span><span>Atomic Magazine</span></div><h1>'+escapeHtml(articleTitle(a))+'</h1><p class="reader-dek">'+escapeHtml(articleDek(a))+'</p><div class="reader-byline"><span>By '+escapeHtml(a.author||'Atomic Desk')+'</span><span>'+escapeHtml(dateOf(a))+'</span><span>'+readMinutes(a)+' minute read</span></div><img class="reader-cover" src="'+escapeHtml(articleImage(a))+'" alt="" loading="lazy" decoding="async" fetchpriority="low" onerror="this.style.display=\'none\'"><nav class="reader-toc" id="readerToc" hidden aria-label="Article contents"><h2>On this page</h2><div class="reader-toc-list"></div></nav><div class="article-copy">'+bodyHtml+'</div><aside class="reader-note"><span class="mono">A thought, before you go</span><blockquote>“'+escapeHtml(q.q)+'”</blockquote><div class="quote-by"><span>'+escapeHtml(q.by)+'</span><button type="button" class="reader-copy-quote" id="copyReaderQuote">Copy quote</button><button class="quote-change" id="readerNewQuote" aria-label="Another quote">↻</button></div></aside><div class="reader-footer"><span class="article-meta">'+escapeHtml(c)+' · '+readMinutes(a)+' MIN READ</span><button class="pill-btn primary" id="relatedButton">Explore another story ↗</button></div>';buildReaderToc();enhanceReaderContent();typesetReaderMath();$('reader').classList.add('open');$('reader').setAttribute('aria-hidden','false');document.body.classList.add('reader-open');document.dispatchEvent(new CustomEvent('atomic:reader-toggle',{detail:{open:true}}));var readerUrl=location.pathname+location.search+'#read/'+encodeURIComponent(String(a.id||a.key));var sameReaderUrl=location.hash==='#read/'+encodeURIComponent(String(a.id||a.key));if(readerWasOpen||sameReaderUrl){history.replaceState(history.state, '', readerUrl)}else{history.pushState({atomicWeeklyReader:true}, '', readerUrl)}$('readerNewQuote').onclick=function(){var nq=pickQuote();$('readerContent').querySelector('.reader-note blockquote').textContent='“'+nq.q+'”';$('readerContent').querySelector('.reader-note .quote-by span').textContent=nq.by};$('copyReaderQuote').onclick=function(){var quote=$('readerContent').querySelector('.reader-note blockquote');copyText(quote&&quote.textContent,'Quote copied.')};$('relatedButton').onclick=function(){var next=visibleArticles().find(function(x){return String(x.id||x.key)!==String(id)})||articles.find(function(x){return String(x.id||x.key)!==String(id)});if(next)openArticle(String(next.id||next.key))};$('reader').scrollTop=0;updateReaderProgress()}
function closeReader(fromPopState){var reader=$('reader');if(!reader.classList.contains('open'))return;var target=readerReturnFocus;if(!target||!target.isConnected||reader.contains(target)||typeof target.focus!=='function')target=$('home');if(target&&typeof target.focus==='function')target.focus({preventScroll:true});reader.classList.remove('open');reader.setAttribute('aria-hidden','true');document.body.classList.remove('reader-open');document.dispatchEvent(new CustomEvent('atomic:reader-toggle',{detail:{open:false}}));currentArticle=null;readerReturnFocus=null;if(fromPopState)return;if(history.state&&history.state.atomicWeeklyReader){history.back()}else if(/^#read\//.test(location.hash)){history.replaceState(history.state,'',location.pathname+location.search+location.hash.replace(/#read\/.*/,''))}}
$('readerBack').onclick=function(){closeReader();var stories=$('latest');if(stories)stories.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})};
// Smart reader chrome: hide on downward scroll, reveal on upward scroll.
(function(){
 var reader=$('reader');
 var chrome=[reader.querySelector('.reader-top'),reader.querySelector('.reader-progress'),reader.querySelector('.reader-tools')].filter(Boolean);
 var lastY=0,rafPending=false;
 function setChromeHidden(hidden){
  chrome.forEach(function(el){el.classList.toggle('reader-chrome-hidden',hidden)});
  reader.classList.toggle('reader-chrome-collapsed',hidden);
 }
 function handleReaderScroll(){
  var y=Math.max(0,reader.scrollTop||0),delta=y-lastY;
  if(y<48){setChromeHidden(false)}
  else if(delta>5){setChromeHidden(true)}
  else if(delta< -5){setChromeHidden(false)}
  lastY=y;rafPending=false;
 }
 reader.addEventListener('scroll',function(){
  if(!rafPending){rafPending=true;requestAnimationFrame(handleReaderScroll)}
 },{passive:true});
 reader.addEventListener('transitionend',function(e){
  if(e.target===reader.querySelector('.reader-top')&&!reader.classList.contains('open'))setChromeHidden(false);
 });
 reader.addEventListener('click',function(e){
  if(e.target.closest('#readerBack,#readerClose')){lastY=0;setChromeHidden(false)}
 });
 window.addEventListener('hashchange',function(){if(!reader.classList.contains('open')){lastY=0;setChromeHidden(false)}});
})();
$('readerClose').onclick=closeReader;$('readerShare').onclick=async function(){if(!currentArticle)return;var url=location.href;try{if(navigator.share){await navigator.share({title:articleTitle(currentArticle),text:articleDek(currentArticle),url:url})}else if(navigator.clipboard){await navigator.clipboard.writeText(url);toast('Story link copied.')}else{toast('Copy this link from your browser address bar.')}}catch(e){if(e&&e.name!=='AbortError')toast('Sharing was not available on this device.')}};
window.addEventListener('hashchange',function(){var m=location.hash.match(/^#read\/(.+)$/);if(m){openArticle(decodeURIComponent(m[1]))}else if($('reader').classList.contains('open'))closeReader()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){if($('reader').classList.contains('open'))closeReader();else $('searchDrawer').classList.remove('open')}});
renderAll();


/* Pick a different cosmic cover on each reload. Keep Saturn out of the rotation. */
(function rotateHeroArtwork(){
  var key='atomic-magazine-hero-art';
  var rotationKey='atomic-magazine-hero-art-rotation';
  var configApi='https://atomictanvir-default-rtdb.firebaseio.com/siteSettings/heroImageLinks.json';
  var folderApi='https://api.github.com/repos/iammdtanvirrahman/atomic-weekly/contents/assets/hero-refresh?ref=4.0';
  var root=document.documentElement;
  var fallbackNames=['cosmic-hero.webp'];
  var previous='',previousRotation=0;
  try{previous=localStorage.getItem(key)||'';previousRotation=Number(localStorage.getItem(rotationKey))||0}catch(e){}
  function localImageUrl(name){return './assets/hero-refresh/'+encodeURIComponent(name)}
  function normalizedRotation(value){var n=Number(value)||0;return ((Math.round(n/90)*90)%360+360)%360}
  function setHeroArtwork(url,rotation){
    var safe=String(url||'').replace(/\\/g,'%5C').replace(/"/g,'%22');
    var angle=normalizedRotation(rotation);
    root.style.setProperty('--hero-art','url("'+safe+'")');
    root.style.setProperty('--hero-art-rotation',angle+'deg');
    // Keep a rotated layer covering the hero viewport after the quarter-turn.
    var hero=document.querySelector('.hero-bg');
    var scale=1;
    if(hero&&(angle===90||angle===270)){
      var rect=hero.getBoundingClientRect();
      if(rect.width>0&&rect.height>0)scale=Math.max(rect.width/rect.height,rect.height/rect.width);
    }
    root.style.setProperty('--hero-art-scale',String(Math.min(scale,4)));
  }
  function validRemoteUrl(raw){
    try{var parsed=new URL(String(raw||'').trim());return parsed.protocol==='https:'?parsed.href:''}catch(e){return''}
  }
  if(previous){
    if(/^https:\/\//i.test(previous))setHeroArtwork(previous,previousRotation);
    else if(/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(previous))setHeroArtwork(localImageUrl(previous),previousRotation);
  }
  function preLoadOneByOne(images,index,onAllFailed){
    if(index>=images.length){onAllFailed();return}
    var selected=images[index],probe=new Image(),usingFallback=false;
    probe.decoding='async';probe.fetchPriority='high';
    probe.onload=function(){
      var apply=function(){
        var rotation=normalizedRotation(selected.rotation);
        setHeroArtwork(selected.url,rotation);
        try{localStorage.setItem(key,selected.url);localStorage.setItem(rotationKey,String(rotation))}catch(e){}
      };
      if(typeof probe.decode==='function')probe.decode().then(apply).catch(apply);else apply();
    };
    probe.onerror=function(){
      if(!usingFallback&&selected.fallbackUrl&&selected.fallbackUrl!==selected.url){
        usingFallback=true;selected.url=selected.fallbackUrl;probe.src=selected.url;return;
      }
      preLoadOneByOne(images,index+1,onAllFailed);
    };
    probe.src=selected.url;
  }
  function sequentialCandidates(items){
    var usable=items.filter(function(item){return item&&item.url});
    if(usable.length<2)return usable;
    // Shuffle the available URL-based covers on every page load, while avoiding
    // showing the exact same cover first when an alternative is available.
    for(var i=usable.length-1;i>0;i--){
      var j=Math.floor(Math.random()*(i+1));
      var temp=usable[i];usable[i]=usable[j];usable[j]=temp;
    }
    if(usable[0].url===previous&&usable.length>1){
      var nextIndex=usable.findIndex(function(item){return item.url!==previous});
      if(nextIndex>0){var first=usable[0];usable[0]=usable[nextIndex];usable[nextIndex]=first;}
    }
    return usable;
  }
  function tryImages(items,onAllFailed){
    var choices=sequentialCandidates(items);
    if(!choices.length){onAllFailed();return}
    preLoadOneByOne(choices,0,onAllFailed);
  }
  function loadFolderFallback(){
    fetch(folderApi,{cache:'force-cache',headers:{Accept:'application/vnd.github+json'}})
      .then(function(response){if(!response.ok)throw new Error('Artwork folder unavailable ('+response.status+')');return response.json()})
      .then(function(files){
        var images=files.filter(function(file){return file.type==='file'&&/\.(png|jpe?g|webp)$/i.test(file.name||'')})
          .map(function(file){
            var optimizedName=file.name.replace(/\.(png|jpe?g)$/i,'.webp');
            var optimizedUrl='./assets/optimized/hero-refresh/'+encodeURIComponent(optimizedName);
            var originalUrl=localImageUrl(file.name);
            return {name:file.name,url:/\.webp$/i.test(file.name)?originalUrl:optimizedUrl,fallbackUrl:/\.webp$/i.test(file.name)?'':originalUrl,rotation:0};
          });
        if(!images.length)images=fallbackNames.map(function(name){return {name:name,url:localImageUrl(name),rotation:0}});
        tryImages(images,function(){setHeroArtwork(localImageUrl('cosmic-hero.webp'),0)});
      })
      .catch(function(error){
        console.warn('Atomic hero art folder unavailable; using bundled fallback.',error);
        var images=fallbackNames.map(function(name){return {name:name,url:localImageUrl(name),rotation:0}});
        tryImages(images,function(){setHeroArtwork(localImageUrl('cosmic-hero.webp'),0)});
      });
  }
  function savedImageList(data){
    var raw=data&&data.urls;
    if(Array.isArray(raw))return raw;
    if(raw&&typeof raw==='object')return Object.keys(raw).sort(function(a,b){return Number(a)-Number(b)}).map(function(k){return raw[k]});
    return [];
  }
  fetch(configApi,{cache:'no-store'})
    .then(function(response){if(!response.ok)throw new Error('Saved image links unavailable ('+response.status+')');return response.json()})
    .then(function(data){
      var urls=savedImageList(data).map(function(item){
        var url=validRemoteUrl(typeof item==='string'?item:(item&&item.url));
        var rotation=normalizedRotation(item&&typeof item==='object'?item.rotation:0);
        return url?{name:url,url:url,rotation:rotation}:null;
      }).filter(Boolean);
      if(urls.length)tryImages(urls,loadFolderFallback);else loadFolderFallback();
    })
    .catch(function(error){
      console.warn('Atomic hero image links could not be loaded; using folder rotation.',error);
      loadFolderFallback();
    });
})();

/* Mobile dock: show at the top and on upward scroll; tuck away while reading down. */
var mobileDock=document.querySelector('.mobile-nav');
var lastDockY=window.scrollY||0;
var dockTick=false;
if(mobileDock){
  window.addEventListener('scroll',function(){
    if(dockTick)return;
    dockTick=true;
    window.requestAnimationFrame(function(){
      var y=window.scrollY||0;
      var delta=y-lastDockY;
      if(y<120 || delta < -5 || document.body.classList.contains('reader-open')){
        mobileDock.classList.remove('nav-hidden');
      }else if(delta>5 && y>160){
        mobileDock.classList.add('nav-hidden');
      }
      lastDockY=y;
      dockTick=false;
    });
  },{passive:true});
  mobileDock.addEventListener('click',function(e){
    if(e.target.closest('a[href^="#"]'))mobileDock.classList.remove('nav-hidden');
  });
}

window.addEventListener('popstate',function(){var match=location.hash.match(/^#read\/(.+)$/);if(match){var articleId;try{articleId=decodeURIComponent(match[1])}catch(e){articleId=match[1]}if(!$('reader').classList.contains('open'))openArticle(articleId)}else if($('reader').classList.contains('open'))closeReader(true)});
var initial=location.hash.match(/^#read\/(.+)$/);if(initial)setTimeout(function(){var articleId;try{articleId=decodeURIComponent(initial[1])}catch(e){articleId=initial[1]}openArticle(articleId)},60);

// The public magazine listens to the exact feed written by Atomic Admin.
// Demo content remains visible until the first successful database snapshot.
import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js').then(function(appMod){return Promise.all([Promise.resolve(appMod),import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js')])}).then(function(mods){var appMod=mods[0],dbMod=mods[1];var config={apiKey:'AIzaSyCit_SKjXRUpr8FNY1ahKhiG5sdDyOlW6k',authDomain:'atomictanvir.firebaseapp.com',projectId:'atomictanvir',storageBucket:'atomictanvir.firebasestorage.app',messagingSenderId:'140595401471',appId:'1:140595401471:web:8f92115a8c8b58d1ec32ca',databaseURL:'https://atomictanvir-default-rtdb.firebaseio.com'};var app;try{app=appMod.getApps().length?appMod.getApp():appMod.initializeApp(config)}catch(e){app=appMod.getApp()}var db=dbMod.getDatabase(app);window.atomicQueueArticleSubmission=async function(payload){
 if(!payload||typeof payload!=='object')throw new Error('Invalid submission payload.');
 var author=String(payload.author||'').trim(),email=String(payload.email||'').trim(),title=String(payload.title||'').trim(),section=String(payload.section||'').trim(),articleText=String(payload.text||'').trim();
 var allowedSections=['Stories','Science','Space','Technology','Humanity','Love','Life','Philosophy','Nature','Art','Physics'];
 if(!author||author.length>100)throw new Error('Name must be between 1 and 100 characters.');
 if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)||email.length>180)throw new Error('Enter a valid email address.');
 if(!title||title.length>180)throw new Error('Title must be between 1 and 180 characters.');
 if(allowedSections.indexOf(section)===-1)throw new Error('Choose a valid article category.');
 if(!articleText||articleText.length>20000)throw new Error('Article text must be between 1 and 20,000 characters.');
 var rawNames=Array.isArray(payload.attachmentNames)?payload.attachmentNames:[];
 if(rawNames.length>20)throw new Error('No more than 20 attachments are allowed.');
 var names=rawNames.map(function(name){return String(name||'').replace(/[\\u0000-\\u001f\\u007f]/g,'').trim().slice(0,180)}).filter(Boolean);
 var submissionRef=dbMod.push(dbMod.ref(db,'submissions')),id=submissionRef.key,createdAt=Date.now();
 var record={id:id,author:author,email:email,title:title,section:section,text:articleText,type:'article',submissionType:'Website Article',source:'atomic-weekly-website',status:'pending_via_email',timestamp:createdAt,createdAt:createdAt,attachmentsExpected:names.length>0,attachmentNames:names,attachmentStatus:names.length?'awaiting_email':'not_required',attachmentEmail:'mdtanvirrahman2022a@gmail.com',editorialNote:names.length?'Article text is queued. Sender selected attachments and is expected to send them separately by email. Email sending is not verified automatically.':'Article text submitted from the Atomic Weekly website.'};
 await dbMod.set(submissionRef,record);
 return {id:id,createdAt:createdAt,record:record};
};dbMod.onValue(dbMod.ref(db,'publishedArticles'),function(snapshot){loadingFeed=false;var raw=snapshot.val()||{};var records=Object.keys(raw).map(function(id){var record=Object.assign({},raw[id]||{});record.key=record.key||id;record.id=id;return record}).filter(function(a){return a.status==='published'||a.published===true});if(records.length){articles=records;isDemo=false}else{articles=seed.slice();isDemo=true}$('feedState').textContent=isDemo?'Starter edition':'Live editorial feed';renderAll();if(pendingReaderId){var pendingId=pendingReaderId;pendingReaderId=null;openArticle(pendingId)}},function(error){loadingFeed=false;isDemo=true;articles=seed.slice();$('connectionLabel').textContent='Starter edition · live feed unavailable';renderAll();if(pendingReaderId){var pendingId=pendingReaderId;pendingReaderId=null;openArticle(pendingId)}console.warn('Atomic feed listener:',error)});$('feedState').textContent='Connecting to stories'}).catch(function(error){loadingFeed=false;isDemo=true;articles=seed.slice();$('connectionLabel').textContent='Starter edition · live feed unavailable';renderAll();if(pendingReaderId){var pendingId=pendingReaderId;pendingReaderId=null;openArticle(pendingId)}console.warn('Atomic feed setup:',error)});

// Ambient cosmic scene: procedural planet, spiral galaxy, nebulae and stars.
// Keep the existing static artwork as the no-WebGL / reduced-motion fallback.
(function ambientCosmicScene(){
  var host=$('three-scene');
  if(!host||!document.body)return;
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  var connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  var mobile=window.matchMedia('(max-width:720px)').matches;
  var lowPower=window.matchMedia('(max-width:480px)').matches||(navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)||(connection&&(connection.saveData||/^(slow-2g|2g)$/.test(connection.effectiveType||'')));
  if(reduced.matches||lowPower)return;
  // Reparent the existing scene host so the ambient composition can follow the reader
  // across the whole site instead of being limited to the hero section.
  host.style.cssText='position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;z-index:-1!important;opacity:.34!important;mix-blend-mode:screen!important;pointer-events:none!important;overflow:hidden!important;display:block!important';
  document.body.appendChild(host);
  var loaded=false,visible=true,raf=0,renderer=null,scene=null,camera=null,clock=null,starGeo=null,starMat=null,galaxyGeo=null,galaxyMat=null,planet=null,planetMat=null,atmosphere=null,nebulae=[],resizeObserver=null,nebulaTexture=null,cleaned=false;
  function onReaderToggle(e){if(e.detail&&e.detail.open)stopFrame();else schedule();}
  function onReducedMotionChange(e){if(e.matches){cleanup();fallback();}}
  function load(){
    if(loaded||document.hidden)return;
    loaded=true;
    var script=document.createElement('script');
    script.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async=true;script.onload=init;script.onerror=fallback;
    document.head.appendChild(script);
  }
  function fallback(){host.style.display='none';}
  function makeNebulaTexture(){
    var c=document.createElement('canvas');c.width=128;c.height=128;
    var x=c.getContext('2d'),g=x.createRadialGradient(64,64,2,64,64,62);
    g.addColorStop(0,'rgba(240,68,82,.34)');g.addColorStop(.34,'rgba(135,34,90,.17)');g.addColorStop(1,'rgba(40,20,70,0)');
    x.fillStyle=g;x.fillRect(0,0,128,128);
    return new THREE.CanvasTexture(c);
  }
  function init(){
    if(!window.THREE||document.hidden){fallback();return;}
    try{
      scene=new THREE.Scene();
      camera=new THREE.PerspectiveCamera(54,window.innerWidth/Math.max(1,window.innerHeight),.1,120);
      camera.position.set(0,0,12);
      renderer=new THREE.WebGLRenderer({alpha:true,antialias:!mobile,powerPreference:'low-power',failIfMajorPerformanceCaveat:true});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,mobile?1:1.25));
      renderer.setSize(window.innerWidth,window.innerHeight);
      renderer.setClearColor(0x000000,0);
      if('outputColorSpace'in renderer)renderer.outputColorSpace=THREE.SRGBColorSpace;
      else if('outputEncoding'in renderer)renderer.outputEncoding=THREE.sRGBEncoding;
      host.appendChild(renderer.domElement);
      // Fine star field with gentle depth and drift.
      var starCount=mobile?220:650,sp=new Float32Array(starCount*3);
      for(var i=0;i<starCount;i++){sp[i*3]=(Math.random()-.5)*30;sp[i*3+1]=(Math.random()-.5)*19;sp[i*3+2]=(Math.random()-.5)*18-2;}
      starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.BufferAttribute(sp,3));
      starMat=new THREE.PointsMaterial({color:0xf5dce0,size:mobile?.035:.025,transparent:true,opacity:.62,sizeAttenuation:true,depthWrite:false});
      scene.add(new THREE.Points(starGeo,starMat));
      // A spiral galaxy built from tiny points, tinted with the site's crimson accent.
      var gc=mobile?700:1800,gp=new Float32Array(gc*3),colors=new Float32Array(gc*3);
      var arms=3;
      for(var j=0;j<gc;j++){
        var radius=Math.pow(Math.random(),.68)*3.15,arm=(j%arms)/arms*Math.PI*2;
        var angle=arm+radius*1.35+(Math.random()-.5)*.38;
        gp[j*3]=Math.cos(angle)*radius;
        gp[j*3+1]=(Math.random()-.5)*.22*(1-radius/3.4);
        gp[j*3+2]=Math.sin(angle)*radius;
        var warm=Math.random();colors[j*3]=.55+warm*.45;colors[j*3+1]=.16+warm*.13;colors[j*3+2]=.24+warm*.36;
      }
      galaxyGeo=new THREE.BufferGeometry();galaxyGeo.setAttribute('position',new THREE.BufferAttribute(gp,3));galaxyGeo.setAttribute('color',new THREE.BufferAttribute(colors,3));
      galaxyMat=new THREE.PointsMaterial({size:mobile?.025:.018,vertexColors:true,transparent:true,opacity:.68,depthWrite:false,sizeAttenuation:true});
      var galaxy=new THREE.Points(galaxyGeo,galaxyMat);galaxy.position.set(4.3,.2,-2.2);galaxy.rotation.x=.58;scene.add(galaxy);
      // Procedural gas giant: animated surface bands, storm-like noise and dark crimson oceans.
      var sphere=new THREE.SphereGeometry(1.75,mobile?36:64,mobile?28:48);
      planetMat=new THREE.ShaderMaterial({
        uniforms:{uTime:{value:0}},
        vertexShader:'varying vec3 vNormal; varying vec3 vPos; void main(){vNormal=normalize(normalMatrix*normal);vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
        fragmentShader:'uniform float uTime; varying vec3 vNormal; varying vec3 vPos; void main(){float band=sin(vPos.y*13.0+sin(vPos.x*3.0+uTime*.08)*.8+sin(vPos.z*4.0)*.4);float cloud=sin(vPos.x*8.0+sin(vPos.z*6.0+uTime*.06))*sin(vPos.y*9.0+vPos.z*3.0);float light=max(dot(normalize(vNormal),normalize(vec3(-.55,.4,1.0))),0.0);vec3 deep=vec3(.055,.025,.055);vec3 red=vec3(.48,.095,.15);vec3 pale=vec3(.75,.38,.34);vec3 col=mix(deep,red,smoothstep(-.45,.65,band));col=mix(col,pale,smoothstep(.68,.94,band)*.36);col+=vec3(.08,.025,.06)*cloud;col*=.26+light*.95;gl_FragColor=vec4(col,1.0);}'
      });
      planet=new THREE.Mesh(sphere,planetMat);planet.position.set(-3.55,.15,-1.4);planet.rotation.z=-.23;planet.scale.setScalar(mobile?.82:1);scene.add(planet);
      var atGeo=new THREE.SphereGeometry(1.83,mobile?32:56,mobile?24:40);
      var atMat=new THREE.ShaderMaterial({vertexShader:'varying vec3 n; void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec3 n; void main(){float rim=pow(1.0-max(dot(normalize(n),vec3(0.0,0.0,1.0)),0.0),2.2);gl_FragColor=vec4(.95,.12,.23,rim*.34);}',transparent:true,blending:THREE.AdditiveBlending,side:THREE.BackSide,depthWrite:false});
      atmosphere=new THREE.Mesh(atGeo,atMat);atmosphere.position.copy(planet.position);atmosphere.scale.copy(planet.scale).multiplyScalar(1.04);scene.add(atmosphere);
      // Soft procedural nebula sprites; no extra image downloads.
      nebulaTexture=makeNebulaTexture();
      for(var n=0;n<(mobile?2:4);n++){
        var mat=new THREE.SpriteMaterial({map:nebulaTexture,color:n%2?0x643a8c:0xc72e54,transparent:true,opacity:n%2?.14:.18,depthWrite:false,blending:THREE.AdditiveBlending});
        var sprite=new THREE.Sprite(mat);sprite.position.set((n-1.4)*3.2,Math.sin(n*2.1)*2.1,-3-n*.4);sprite.scale.set(5.8,4.6,1);scene.add(sprite);nebulae.push(sprite);
      }
      clock=new THREE.Clock();
      if(!mobile)window.addEventListener('pointermove',onPointer,{passive:true});
      window.addEventListener('resize',resize,{passive:true});
      if('IntersectionObserver'in window){
        resizeObserver=new IntersectionObserver(function(entries){visible=entries.some(function(e){return e.isIntersecting});if(visible)schedule();else stopFrame();},{threshold:0});
        resizeObserver.observe(document.body);
      }
      document.addEventListener('visibilitychange',onVisibility);
      document.addEventListener('atomic:reader-toggle',onReaderToggle);
      window.addEventListener('pagehide',cleanup,{once:true});
      schedule();
    }catch(e){cleanup();fallback();}
  }
  var mx=0,my=0,tx=0,ty=0;
  function onPointer(e){mx=(e.clientX/window.innerWidth-.5)*.22;my=(e.clientY/window.innerHeight-.5)*.14;}
  function resize(){if(!renderer||!camera)return;camera.aspect=window.innerWidth/Math.max(1,window.innerHeight);camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);}
  function schedule(){if(visible&&!document.hidden&&renderer&&!raf)raf=requestAnimationFrame(frame);}
  function stopFrame(){if(raf)cancelAnimationFrame(raf);raf=0;}
  function frame(){
    raf=0;if(!visible||document.hidden||!renderer||document.body.classList.contains('reader-open'))return;
    var t=clock.getElapsedTime();tx+=(mx-tx)*.018;ty+=(my-ty)*.018;
    planet.rotation.y=t*.035+tx;planet.rotation.x=.08+ty*.35;atmosphere.rotation.copy(planet.rotation);
    galaxyGeo&& (galaxyGeo.attributes.position.needsUpdate=false);
    scene.rotation.y=Math.sin(t*.035)*.035+tx*.25;scene.rotation.x=Math.cos(t*.027)*.018+ty*.2;
    nebulae.forEach(function(s,i){s.material.opacity=(i%2?.12:.16)+Math.sin(t*.16+i)*.025;s.position.y+=Math.sin(t*.12+i)*.0005;});
    starMat.opacity=.54+Math.sin(t*.4)*.06;planetMat.uniforms.uTime.value=t;
    renderer.render(scene,camera);raf=requestAnimationFrame(frame);
  }
  function onVisibility(){if(document.hidden||document.body.classList.contains('reader-open'))stopFrame();else schedule();}
  function cleanup(){
    if(cleaned)return;
    cleaned=true;
    stopFrame();
    if(resizeObserver){resizeObserver.disconnect();resizeObserver=null;}
    window.removeEventListener('resize',resize);
    window.removeEventListener('pointermove',onPointer);
    window.removeEventListener('pagehide',cleanup);
    document.removeEventListener('visibilitychange',onVisibility);
    document.removeEventListener('atomic:reader-toggle',onReaderToggle);
    if(reduced.removeEventListener)reduced.removeEventListener('change',onReducedMotionChange);
    if(renderer){renderer.dispose();if(renderer.domElement.parentNode)renderer.domElement.remove();}
    if(scene)scene.traverse(function(o){if(o.geometry&&o.geometry.dispose)o.geometry.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(function(m){if(m&&m.dispose)m.dispose();});}});
    [starGeo,starMat,galaxyGeo,galaxyMat,planetMat,nebulaTexture].forEach(function(o){if(o&&o.dispose)o.dispose();});
    renderer=null;scene=null;camera=null;clock=null;starGeo=null;starMat=null;galaxyGeo=null;galaxyMat=null;planet=null;planetMat=null;atmosphere=null;nebulae=[];
  }
  if(reduced.addEventListener)reduced.addEventListener('change',onReducedMotionChange);
  load();
})();
})();
