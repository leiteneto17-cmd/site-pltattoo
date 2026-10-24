const progressList=document.getElementById('progress-list');
const progressCount=document.getElementById('progress-count');

function addText(parent,tag,value,className){
  const node=document.createElement(tag);
  if(className)node.className=className;
  node.textContent=value;
  parent.append(node);
  return node;
}
function renderEntry(entry){
  const card=document.createElement('article');
  card.className='progress-card';
  if(entry.entry_type==='study'&&entry.image_url?.startsWith('https://')&&entry.image_alt){
    const img=document.createElement('img');
    img.src=entry.image_url;
    img.alt=entry.image_alt;
    img.loading='lazy';
    img.onerror=()=>img.remove();
    card.append(img);
  }
  const date=entry.created_at?new Date(entry.created_at).toLocaleDateString('pt-BR'):'';
  addText(card,'span',[entry.entry_type==='study'?'ESTUDO':'ARTIGO',entry.category,date].filter(Boolean).join(' / '),'meta');
  addText(card,'h3',entry.title);
  addText(card,'p',entry.body.length>350?entry.body.slice(0,347)+'…':entry.body);
  if(entry.credit)addText(card,'small','Crédito: '+entry.credit);
  return card;
}
async function loadProgress(){
  try{
    if(!window.siteDb)throw new Error('Conexão indisponível');
    const entries=(await window.siteDb.published()).filter(e=>!e.is_demo);
    progressList.replaceChildren();
    progressCount.textContent=String(entries.length).padStart(2,'0')+' REGISTRO(S)';
    if(entries.length){
      entries.forEach(e=>progressList.append(renderEntry(e)));
      return;
    }
    const empty=document.createElement('div');
    empty.className='progress-empty';
    addText(empty,'b','00');
    const content=document.createElement('div');
    addText(content,'strong','PRIMEIRO REGISTRO A CAMINHO.');
    addText(content,'p','Este arquivo ainda não tem estudos reais publicados. Acompanhe o Instagram para ver os treinos antes de eles entrarem aqui.');
    empty.append(content);
    progressList.append(empty);
  }catch{
    progressCount.textContent='ARQUIVO TEMPORARIAMENTE OFFLINE';
    progressList.replaceChildren();
    const empty=document.createElement('div');
    empty.className='progress-empty';
    addText(empty,'b','--');
    const content=document.createElement('div');
    addText(content,'strong','NÃO FOI POSSÍVEL ABRIR O ARQUIVO.');
    addText(content,'p','Você ainda pode acompanhar as atualizações no Instagram.');
    empty.append(content);
    progressList.append(empty);
  }
}
loadProgress();
