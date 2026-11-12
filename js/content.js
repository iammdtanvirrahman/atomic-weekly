(function(global){
'use strict';
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
function coverStyle(a){return "background-image:linear-gradient(0deg,rgba(8,9,13,.15),transparent),url('"+String(articleImage(a)).replace(/'/g,'%27')+"')"}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
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
global.AtomicContent=Object.freeze({norm:norm,niceCategory:niceCategory,plainText:plainText,dateOf:dateOf,readMinutes:readMinutes,safeUrl:safeUrl,articleImage:articleImage,categoryImage:categoryImage,articleTitle:articleTitle,articleDek:articleDek,dateSort:dateSort,articleSearchText:articleSearchText,coverStyle:coverStyle,escapeHtml:escapeHtml,sanitizeContent:sanitizeContent});
})(window);
