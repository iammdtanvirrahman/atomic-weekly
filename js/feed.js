(function(global){
'use strict';
var config={apiKey:'AIzaSyCit_SKjXRUpr8FNY1ahKhiG5sdDyOlW6k',authDomain:'atomictanvir.firebaseapp.com',projectId:'atomictanvir',storageBucket:'atomictanvir.firebasestorage.app',messagingSenderId:'140595401471',appId:'1:140595401471:web:8f92115a8c8b58d1ec32ca',databaseURL:'https://atomictanvir-default-rtdb.firebaseio.com'};
function start(options){
 options=options||{};
 if(typeof options.onLoading==='function')options.onLoading();
 import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js')
  .then(function(appMod){return Promise.all([Promise.resolve(appMod),import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js')])})
  .then(function(mods){
   var appMod=mods[0],dbMod=mods[1],app;
   try{app=appMod.getApps().length?appMod.getApp():appMod.initializeApp(config)}catch(e){app=appMod.getApp()}
   var db=dbMod.getDatabase(app);
   window.atomicQueueArticleSubmission=async function(payload){
 if(!payload||typeof payload!=='object')throw new Error('Invalid submission payload.');
 var author=String(payload.author||'').trim(),email=String(payload.email||'').trim(),title=String(payload.title||'').trim(),section=String(payload.section||'').trim(),articleText=String(payload.text||'').trim();
 var allowedSections=['Stories','Science','Space','Technology','Humanity','Love','Life','Philosophy','Nature','Art','Physics'];
 if(!author||author.length>100)throw new Error('Name must be between 1 and 100 characters.');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>180)throw new Error('Enter a valid email address.');
 if(!title||title.length>180)throw new Error('Title must be between 1 and 180 characters.');
 if(allowedSections.indexOf(section)===-1)throw new Error('Choose a valid article category.');
 if(!articleText||articleText.length>20000)throw new Error('Article text must be between 1 and 20,000 characters.');
 var rawNames=Array.isArray(payload.attachmentNames)?payload.attachmentNames:[];
 if(rawNames.length>20)throw new Error('No more than 20 attachments are allowed.');
 var names=rawNames.map(function(name){return String(name||'').replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,180)}).filter(Boolean);
 var submissionRef=dbMod.push(dbMod.ref(db,'submissions')),id=submissionRef.key,createdAt=Date.now();
 var record={id:id,author:author,email:email,title:title,section:section,text:articleText,type:'article',submissionType:'Website Article',source:'atomic-weekly-website',status:'pending_via_email',timestamp:createdAt,createdAt:createdAt,attachmentsExpected:names.length>0,attachmentNames:names,attachmentStatus:names.length?'awaiting_email':'not_required',attachmentEmail:'mdtanvirrahman2022a@gmail.com',editorialNote:names.length?'Article text is queued. Sender selected attachments and is expected to send them separately by email. Email sending is not verified automatically.':'Article text submitted from the Atomic Weekly website.'};
 await dbMod.set(submissionRef,record);
 return {id:id,createdAt:createdAt,record:record};
}
   dbMod.onValue(dbMod.ref(db,'publishedArticles'),function(snapshot){
    var raw=snapshot.val()||{};
    var records=Object.keys(raw).map(function(id){var record=Object.assign({},raw[id]||{});record.key=record.key||id;record.id=id;return record}).filter(function(article){return article.status==='published'||article.published===true});
    if(typeof options.onSnapshot==='function')options.onSnapshot(records);
   },function(error){if(typeof options.onError==='function')options.onError(error)});
  })
  .catch(function(error){if(typeof options.onError==='function')options.onError(error)});
}
global.AtomicFeed=Object.freeze({start:start});
})(window);
