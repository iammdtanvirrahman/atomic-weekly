(function(){
 const $=id=>document.getElementById(id);
 const modal=$('submissionModal'),form=$('sendArticleForm'),status=$('submissionStatus'),button=$('submitArticleButton'),files=$('submissionFiles'),count=$('submissionCharCount'),fileList=$('submissionFileList');
 if(!modal||!form)return;
 let returnFocus=null;
 function openModal(){returnFocus=document.activeElement;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('submission-open');status.className='submission-status';status.textContent='';window.setTimeout(()=>$('submissionAuthor').focus(),40)}
 function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('submission-open');if(returnFocus&&returnFocus.isConnected&&returnFocus.focus)returnFocus.focus({preventScroll:true})}
 $('sendArticleBtn').addEventListener('click',openModal);
 const mobileButton=$('mobileSendArticle');if(mobileButton)mobileButton.addEventListener('click',openModal);
 $('closeSubmission').addEventListener('click',closeModal);
 $('cancelSubmission').addEventListener('click',closeModal);
 modal.querySelectorAll('[data-close-submission]').forEach(el=>el.addEventListener('click',closeModal));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});
 $('submissionText').addEventListener('input',()=>{count.textContent=String($('submissionText').value.length)});
 files.addEventListener('change',()=>{
   const names=Array.from(files.files||[]).map(f=>f.name);
   fileList.replaceChildren();
   if(names.length){
     const list=document.createElement('ol');
     names.forEach(name=>{
       const item=document.createElement('li');
       item.textContent=name;
       list.appendChild(item);
     });
     fileList.appendChild(list);
   }else{
     fileList.textContent='No files selected.';
   }
   button.innerHTML=names.length?'Save article &amp; open Gmail ↗':'Send article to editor ↗';
 });
 function showStatus(message,isError){status.textContent=message;status.className='submission-status visible'+(isError?' error':'')}
 form.addEventListener('submit',async e=>{
   e.preventDefault();
   if(!form.reportValidity())return;
   if(typeof window.atomicQueueArticleSubmission!=='function'){
     showStatus('The editorial database is still connecting. Please wait a moment and try again.',true);return;
   }
   const author=$('submissionAuthor').value.trim(),email=$('submissionEmail').value.trim(),title=$('submissionTitleInput').value.trim(),section=$('submissionSection').value,text=$('submissionText').value.trim();
   if(!author||!email||!title||!text){showStatus('Please fill in your name, email, title and article text.',true);return}
   const selectedFiles=Array.from(files.files||[]);
   if(selectedFiles.length>20){showStatus('Please choose no more than 20 attachments.',true);return}
   if(selectedFiles.some(f=>!f.name||f.name.length>180)){showStatus('Each attachment filename must be 180 characters or fewer.',true);return}
   const attachmentNames=selectedFiles.map(f=>f.name.slice(0,180));
   const composeTab=window.open('about:blank','_blank');
   button.disabled=true;button.textContent='Saving to editorial inbox…';showStatus('Saving your article to the Admin panel pending queue…',false);
   try{
     const queued=await window.atomicQueueArticleSubmission({author,email,title,section,text,attachmentNames});
     const to='mdtanvirrahman2022a@gmail.com';
     const subject='Atomic Weekly article submission — '+title;
     const attachmentLine=attachmentNames.length
       ?'ATTACHMENTS TO INCLUDE MANUALLY IN THIS EMAIL:\n'+attachmentNames.map(n=>'- '+n).join('\n')+'\n\nPlease attach these selected files in Gmail before pressing Send. The website cannot attach files to Gmail automatically.'
       :'No additional attachments selected.';
     const body='NEW ARTICLE SUBMISSION — ATOMIC WEEKLY\n\nSubmission ID: '+queued.id+'\nAuthor: '+author+'\nSender email: '+email+'\nCategory: '+section+'\nTitle: '+title+'\n\nARTICLE TEXT\n----------------------------------------\n'+text+'\n----------------------------------------\n\n'+attachmentLine+'\n\nThe article text has already been placed in the Admin panel pending queue. Please reply to the sender if follow-up is needed.';
     const gmailUrl='https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(to)+'&su='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
     if(composeTab&&!composeTab.closed){composeTab.location.href=gmailUrl}
     else {window.location.href=gmailUrl}
     showStatus('Article saved to Admin pending queue (ID '+queued.id+'). Gmail compose is opening. '+(attachmentNames.length?'Add the selected files manually in Gmail, then press Send. ':'Review the prefilled email and press Send.')+' The email is not marked sent until the recipient receives it.',false);
     button.textContent='Queued ✓';form.querySelectorAll('input,select,textarea').forEach(el=>{el.disabled=true});
   }catch(err){
     if(composeTab&&!composeTab.closed)composeTab.close();
     button.disabled=false;button.innerHTML=attachmentNames.length?'Save article &amp; open Gmail ↗':'Send article to editor ↗';
     showStatus('Could not add the article to the Admin queue. Nothing was sent. '+(err&&err.message?err.message:'Please retry.'),true);
   }
 });
})();
