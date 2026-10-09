(()=>{'use strict';
const menu=document.querySelector('#mobile-menu');
document.querySelector('[data-open-menu]')?.addEventListener('click',()=>{menu.showModal();document.body.style.overflow='hidden'});
document.querySelector('[data-close-menu]')?.addEventListener('click',()=>menu.close());
menu?.addEventListener('close',()=>{document.body.style.overflow='';document.querySelector('[data-open-menu]')?.focus()});
menu?.addEventListener('click',event=>{if(event.target===menu){const r=menu.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right)menu.close()}});
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.nav-drop[open]').forEach(el=>el.removeAttribute('open'))});
document.addEventListener('click',event=>{document.querySelectorAll('.nav-drop[open]').forEach(el=>{if(!el.contains(event.target))el.removeAttribute('open')})});
document.querySelectorAll('.nav-drop').forEach(drop=>drop.addEventListener('toggle',()=>{if(drop.open)document.querySelectorAll('.nav-drop').forEach(other=>{if(other!==drop)other.open=false})}));
document.querySelectorAll('[data-product-finder]').forEach(finder=>{
const controls=finder.querySelectorAll('[data-filter]'),cards=finder.querySelectorAll('[data-category]'),count=finder.querySelector('[data-count]');
controls.forEach(control=>{control.hidden=false;control.addEventListener('click',()=>{const category=control.dataset.filter;let visible=0;controls.forEach(button=>button.setAttribute('aria-pressed',String(button===control)));cards.forEach(card=>{card.hidden=category!=='all'&&category!==card.dataset.category;if(!card.hidden)visible++});count.textContent=visible+' '+(visible===1?'modell':'modeller');})});
});
document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{
const frame=button.closest('.video-frame');const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-label',button.dataset.title);video.poster=frame.querySelector('img')?.src||'';
const source=document.createElement('source');source.src=button.dataset.video;source.type='video/mp4';video.append(source);
const fallback=document.createElement('a');fallback.href=button.dataset.video;fallback.textContent='Öppna filmen direkt';video.append(fallback);frame.replaceChildren(video);
video.addEventListener('error',()=>{const error=document.createElement('div');error.className='video-error';const message=document.createElement('p');message.textContent='Filmen kunde inte laddas. Du kan öppna den direkt eller se den på originalsidan.';const link=document.createElement('a');link.href=button.dataset.source;link.textContent='Se filmen hos IVT Center';link.target='_blank';link.rel='noopener noreferrer';error.append(message,link);frame.replaceChildren(error)},{once:true});
video.play().catch(()=>{video.focus()});video.focus();
}));
})();
