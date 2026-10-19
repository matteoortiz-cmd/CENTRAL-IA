'use strict';
function normalizeCatalogQuery(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();}
function filterCatalog(items,query,provider='Todas',type='all',category='all'){
 const q=normalizeCatalogQuery(query), shortcut=q.replace(/^\//,'');
 const exact=q&&items.some(t=>normalizeCatalogQuery(t.shortcut).replace(/^\//,'')===shortcut);
 return items.filter(t=>{
  if(provider!=='Todas'&&t.provider!==provider)return false;
  if(type!=='all'&&(t.type||'tutorial')!==type)return false;
  if(category!=='all'&&t.category!==category)return false;
  if(!q)return true;
  if(exact)return normalizeCatalogQuery(t.shortcut).replace(/^\//,'')===shortcut;
  return normalizeCatalogQuery([t.title,t.description,t.provider,t.shortcut,t.category,t.product].filter(Boolean).join(' ')).includes(q);
 });
}
