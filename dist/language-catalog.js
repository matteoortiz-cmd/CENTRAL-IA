'use strict';
(()=>{
 const entries=Array.isArray(window.PROGRAMMING_LANGUAGES)?window.PROGRAMMING_LANGUAGES:[];
 const search=document.getElementById('language-search');
 const kind=document.getElementById('language-kind');
 const directory=document.getElementById('language-catalog-content');
 const lessons=document.getElementById('language-lessons-panel');
 const videosByLanguage=window.LANGUAGE_VIDEOS||{};
 let lessonTrigger=null;
 const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function externalLink(label,url,className){
  const a=document.createElement('a');a.textContent=label;a.href=url;a.className=className;a.target='_blank';a.rel='noopener noreferrer';return a;
 }
 function openLessons(entry,trigger){
  lessonTrigger=trigger;
  const videos=videosByLanguage[entry.name]||[];
  const title=document.getElementById('language-lessons-title');title.textContent='Aprenda '+entry.name;
  document.getElementById('language-lessons-description').textContent=entry.description;
  const grid=document.getElementById('language-video-grid');grid.replaceChildren();
  videos.forEach((video,index)=>{
   const card=document.createElement('article');card.className='language-video-card';
   const badge=document.createElement('span');badge.className='badge';badge.textContent='VÍDEO '+String(index+1).padStart(2,'0');
   const heading=document.createElement('h3');heading.textContent=video.title;
   const channel=document.createElement('p');channel.textContent=video.channel||'Tutorial no YouTube';
   const link=externalLink('Assistir no YouTube ↗',video.url,'button');link.setAttribute('aria-label','Assistir '+video.title+' no YouTube');
   card.append(badge,heading,channel,link);grid.append(card);
  });
  document.getElementById('language-docs').href=entry.docsUrl;
  document.getElementById('language-more-videos').href='https://www.youtube.com/results?search_query='+encodeURIComponent(entry.youtubeQuery);
  directory.hidden=true;lessons.hidden=false;title.focus({preventScroll:true});title.scrollIntoView({block:'start',behavior:'smooth'});
 }
 document.getElementById('language-back').addEventListener('click',()=>{
  lessons.hidden=true;directory.hidden=false;
  if(lessonTrigger){lessonTrigger.focus({preventScroll:true});lessonTrigger.scrollIntoView({block:'center',behavior:'smooth'});}
 });
 function render(){
  const query=normalize(search.value.trim());
  const matches=entries.filter(entry=>(kind.value==='all'||entry.kind===kind.value)&&normalize([entry.name,entry.description,...entry.topics].join(' ')).includes(query));
  const grids={language:document.getElementById('programming-language-grid'),foundation:document.getElementById('language-foundations-grid')};
  Object.values(grids).forEach(grid=>grid.replaceChildren());
  for(const entry of matches){
   const card=document.createElement('article');card.className='tool-card language-card';
   const badge=document.createElement('span');badge.className='badge';badge.textContent=entry.kind==='foundation'?'BASE DA WEB E DADOS':'LINGUAGEM';
   const title=document.createElement('h3');title.textContent=entry.name;
   const description=document.createElement('p');description.className='language-description';description.textContent=entry.description;
   const topics=document.createElement('p');topics.className='language-topics';topics.textContent=entry.topics.join(' • ');
   const links=document.createElement('div');links.className='language-links';
   const open=document.createElement('button');open.type='button';open.className='button';open.textContent='Ver aulas e exemplos ↗';open.onclick=()=>openLessons(entry,open);links.append(open);
   const count=document.createElement('p');count.className='lesson-count';count.textContent=(videosByLanguage[entry.name]||[]).length+' vídeos para explorar';links.append(count);
   const docs=new URL(entry.docsUrl);if(docs.protocol==='https:')links.append(externalLink('Documentação de referência ↗',docs.href,'text-button'));
   card.append(badge,title,description,topics,links);grids[entry.kind].append(card);
  }
  document.getElementById('programming-language-group').hidden=!grids.language.children.length;
  document.getElementById('language-foundations-group').hidden=!grids.foundation.children.length;
  document.getElementById('language-empty').hidden=!!matches.length;
  document.getElementById('language-results').textContent=matches.length+' recursos encontrados'+(search.value.trim()?' para “'+search.value.trim()+'”':'')+'.';
 }
 search.addEventListener('input',render);kind.addEventListener('change',render);render();
})();
