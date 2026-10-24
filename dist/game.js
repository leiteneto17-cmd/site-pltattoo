const phases=[...document.querySelectorAll('.phase')];
const feedback=document.getElementById('game-feedback');
const phaseLabel=document.getElementById('phase-label');
const sceneState=document.getElementById('scene-state');
const simView=document.querySelector('.sim-view');
const tattoo=document.getElementById('tattoo-image');
const bodyStage=document.getElementById('body-stage');
const benchScene=document.getElementById('bench-scene');
const benchBoard=document.getElementById('bench-board');
const traceScene=document.getElementById('trace-scene');
const traceSvg=document.getElementById('trace-svg');
const traceGuide=document.getElementById('trace-guide');
const traceInk=document.getElementById('trace-ink');
const traceLive=document.getElementById('trace-live');
const traceStart=document.getElementById('trace-start');
const traceCursor=document.getElementById('trace-cursor');
const sliderX=document.getElementById('position-x');
const sliderY=document.getElementById('position-y');
const mistakesEl=document.getElementById('mistakes');
const percentEl=document.getElementById('percent');
const toolNames={reference:'DESENHO',barrier:'COBERTURA',gloves:'LUVAS',ink:'TINTA',machine:'MÁQUINA',disposal:'DESCARTE'};
const designs={
  moth:{
    name:'MARIPOSA LUNAR',src:'assets/moth-moon-v1.png',
    routes:[
      {name:'ASA ESQUERDA',path:'M 160 167 C 123 149 83 132 31 124 C 11 120 6 128 17 140 C 31 150 38 151 43 165 C 62 187 97 202 125 188 C 143 179 151 171 160 167'},
      {name:'ASA DIREITA',path:'M 160 167 C 197 149 237 132 289 124 C 309 120 314 128 303 140 C 289 150 282 151 277 165 C 258 187 223 202 195 188 C 177 179 169 171 160 167'},
      {name:'CORPO CENTRAL',path:'M 160 151 C 146 164 147 190 153 220 C 157 244 159 265 160 283 C 161 265 163 244 167 220 C 173 190 174 164 160 151'}
    ]
  },
  raven:{
    name:'CORVO & MÁRMORE',src:'assets/raven-statue-v1.png',
    routes:[
      {name:'SILHUETA DO CORVO',path:'M 171 54 C 189 48 205 57 212 73 C 215 82 210 91 192 93 C 197 119 190 150 169 184 C 143 226 111 270 60 298 C 83 267 82 229 91 189 C 99 142 119 94 149 65 C 157 58 164 55 171 54'},
      {name:'BUSTO DE MÁRMORE',path:'M 165 222 C 193 216 221 232 232 259 C 243 291 233 319 215 334 C 239 345 239 375 217 390 C 188 412 146 415 117 395 C 95 381 91 352 105 332 C 90 304 99 275 120 251 C 134 235 148 226 165 222'}
    ]
  }
};
let phase=0,design=null,bench=new Set(),mistakes=0,score=0,goodSamples=0,badSamples=0,preTraceMistakes=0;
let routeIndex=0,checkpoints=[],checkpointIndex=0,guideSamples=[],strokeD='',strokeHasPoint=false;
let tracing=false,activePointer=null,lastPoint=null,offTrack=false,assist=false,keyboardDrawing=false,keyboardPos={x:0,y:0},draggingTattoo=false;

function message(value,wrong=false){feedback.textContent=value;feedback.classList.toggle('wrong',wrong);}
function mistake(value){mistakes++;mistakesEl.textContent=String(mistakes).padStart(2,'0');message(value,true);}
function phaseScene(number){
  bodyStage.hidden=number===1||number===3;
  benchScene.hidden=number!==1;
  traceScene.hidden=number!==3;
  simView.classList.toggle('is-tracing',number===3);
  bodyStage.dataset.phase=String(number);
}
function showPhase(number){
  phase=number;
  phases.forEach((node,index)=>node.hidden=index!==number);
  document.querySelectorAll('.mission-steps li').forEach((node,index)=>{
    node.classList.toggle('current',index===number);
    node.classList.toggle('done',index<number);
  });
  phaseLabel.textContent=number<4?'FASE '+String(number+1).padStart(2,'0')+' / 04':'ARQUIVO CONCLUÍDO';
  percentEl.textContent=String(number*25).padStart(2,'0')+'%';
  sceneState.textContent=['CONCEITO','BANCADA','POSICIONAR','CONTORNAR','CONCLUÍDO'][number];
  phaseScene(number);
  message(['ESCOLHA UMA ARTE.','ARRASTE OU TOQUE NOS OBJETOS PARA MONTAR A CENA.','POSICIONE A ARTE NA ÁREA PONTILHADA.','SEGURE E SIGA A LINHA PONTILHADA.','TRAÇO DIGITAL CONCLUÍDO.'][number]);
  if(number===3){preTraceMistakes=mistakes;resetTrace();}
  if(number===4){
    const accuracy=Math.round(goodSamples/(goodSamples+badSamples||1)*100);
    document.getElementById('result-text').textContent='Você contornou '+designs[design].name.toLowerCase()+' com '+accuracy+'% de precisão e '+score+' pontos. '+(mistakes?'Foram '+mistakes+' ajuste(s) durante a missão. ':'')+'O progresso real de Paulo está no diário e no Instagram.';
  }
  const title=phases[number].querySelector('h2');
  title.tabIndex=-1;
  title.focus({preventScroll:true});
}

document.querySelectorAll('.design-card').forEach(card=>card.addEventListener('click',()=>{
  if(phase!==0)return;
  design=card.dataset.design;
  document.querySelectorAll('.design-card').forEach(node=>node.setAttribute('aria-pressed',String(node===card)));
  tattoo.src=designs[design].src;
  tattoo.alt='Arte conceitual '+designs[design].name.toLowerCase()+' selecionada para a simulação';
  document.getElementById('trace-art').src=designs[design].src;
  document.getElementById('trace-art').alt='Arte conceitual '+designs[design].name.toLowerCase()+' para o minijogo de contorno';
  bodyStage.classList.add('has-design');
  document.getElementById('start-bench').disabled=false;
  message(designs[design].name+' SELECIONADA.');
}));
document.getElementById('start-bench').addEventListener('click',()=>{if(design)showPhase(1);});

function iconFor(item){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  const use=document.createElementNS('http://www.w3.org/2000/svg','use');
  const variant=item==='machine'&&document.querySelector('input[name="machine-style"]:checked').value==='coil'?'machine-coil':item==='ink'&&document.querySelector('input[name="ink-tone"]:checked').value==='grey'?'ink-grey':item;
  use.setAttribute('href','#icon-'+variant);
  svg.append(use);
  return svg;
}
function itemDetail(item){
  if(item==='ink')return document.querySelector('input[name="ink-tone"]:checked').value==='black'?'PRETO':'CINZA';
  if(item==='machine')return document.querySelector('input[name="machine-style"]:checked').value==='pen'?'PEN':'BOBINA';
  return '';
}
function renderSlot(item){
  const slot=document.querySelector('.bench-slot[data-item="'+item+'"]');
  const index=Object.keys(toolNames).indexOf(item)+1;
  const label=document.createElement('span');
  label.textContent=String(index).padStart(2,'0')+' / '+toolNames[item];
  slot.replaceChildren(...(bench.has(item)?[iconFor(item)]:[]),label);
  const detail=itemDetail(item);
  if(bench.has(item)&&detail){const small=document.createElement('small');small.textContent=detail;slot.append(small);}
  slot.classList.toggle('filled',bench.has(item));
  slot.setAttribute('aria-label',toolNames[item]+': '+(bench.has(item)?'colocado'+(detail?', '+detail:'')+'. Toque para retirar':'vazio'));
  const card=document.querySelector('.tool-card[data-item="'+item+'"]');
  card.setAttribute('aria-pressed',String(bench.has(item)));
}
function updateBench(){
  document.getElementById('bench-count').textContent=bench.size+' / 6';
  document.getElementById('start-placement').disabled=bench.size!==6;
  for(const item of Object.keys(toolNames))renderSlot(item);
}
function placeItem(item){
  if(phase!==1||bench.has(item))return;
  bench.add(item);score+=50;updateBench();
  message(toolNames[item]+' ENCAIXADO NA BANCADA. +50');
}
document.querySelectorAll('.tool-card').forEach(card=>{
  let drag=null,suppressClick=false;
  card.addEventListener('click',()=>{
    if(suppressClick){suppressClick=false;return;}
    placeItem(card.dataset.item);
  });
  card.addEventListener('pointerdown',event=>{
    if(phase!==1||bench.has(card.dataset.item))return;
    drag={pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,active:false,ghost:null};
    card.setPointerCapture(event.pointerId);
  });
  card.addEventListener('pointermove',event=>{
    if(!drag||drag.pointerId!==event.pointerId)return;
    if(!drag.active&&Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)>7){
      drag.active=true;drag.ghost=document.createElement('div');drag.ghost.className='drag-ghost';
      drag.ghost.append(iconFor(card.dataset.item),document.createTextNode(toolNames[card.dataset.item]));
      document.body.append(drag.ghost);
    }
    if(drag.active){drag.ghost.style.left=event.clientX+'px';drag.ghost.style.top=event.clientY+'px';event.preventDefault();}
  });
  const endDrag=event=>{
    if(!drag||drag.pointerId!==event.pointerId)return;
    if(drag.active){
      const rect=benchBoard.getBoundingClientRect();
      if(event.type!=='pointercancel'&&event.clientX>=rect.left&&event.clientX<=rect.right&&event.clientY>=rect.top&&event.clientY<=rect.bottom)placeItem(card.dataset.item);
      else message('SOLTE O OBJETO SOBRE A BANCADA.',true);
      suppressClick=true;
      setTimeout(()=>{suppressClick=false;},0);
    }
    drag.ghost?.remove();drag=null;
  };
  card.addEventListener('pointerup',endDrag);
  card.addEventListener('pointercancel',endDrag);
});
document.querySelectorAll('.bench-slot').forEach(slot=>slot.addEventListener('click',()=>{
  if(phase!==1||!bench.has(slot.dataset.item))return;
  bench.delete(slot.dataset.item);score=Math.max(0,score-50);updateBench();
  message(toolNames[slot.dataset.item]+' RETIRADO DA BANCADA.');
}));
document.querySelectorAll('.bench-choices input').forEach(input=>input.addEventListener('change',()=>{
  renderSlot(input.name==='ink-tone'?'ink':'machine');
  if(input.name==='ink-tone')document.querySelector('.tool-card[data-item="ink"] use').setAttribute('href','#icon-'+(input.value==='grey'?'ink-grey':'ink'));
  if(input.name==='machine-style')document.querySelector('.tool-card[data-item="machine"] use').setAttribute('href','#icon-'+(input.value==='coil'?'machine-coil':'machine'));
  message('ESCOLHA VISUAL DA BANCADA ATUALIZADA.');
}));
document.getElementById('start-placement').addEventListener('click',()=>{
  if(bench.size===6){bodyStage.classList.add('is-placing');updatePosition();showPhase(2);}
});
updateBench();

function updatePosition(){
  const x=Number(sliderX.value),y=Number(sliderY.value);
  tattoo.style.left=x+'%';tattoo.style.top=y+'%';
  document.getElementById('output-x').value=x+'%';
  document.getElementById('output-y').value=y+'%';
  bodyStage.classList.toggle('aligned',Math.abs(x-50)<=5&&Math.abs(y-50)<=5);
}
for(const slider of [sliderX,sliderY])slider.addEventListener('input',updatePosition);
updatePosition();
tattoo.addEventListener('pointerdown',event=>{
  if(phase!==2)return;
  draggingTattoo=true;tattoo.setPointerCapture(event.pointerId);event.preventDefault();
});
tattoo.addEventListener('pointermove',event=>{
  if(!draggingTattoo||phase!==2)return;
  const rect=bodyStage.getBoundingClientRect();
  sliderX.value=String(Math.max(25,Math.min(75,Math.round((event.clientX-rect.left)/rect.width*100))));
  sliderY.value=String(Math.max(30,Math.min(70,Math.round((event.clientY-rect.top)/rect.height*100))));
  updatePosition();
});
for(const name of ['pointerup','pointercancel','lostpointercapture'])tattoo.addEventListener(name,()=>{draggingTattoo=false;});
document.getElementById('start-trace').addEventListener('click',()=>{
  if(phase!==2)return;
  if(Math.abs(Number(sliderX.value)-50)>5||Math.abs(Number(sliderY.value)-50)>5)return mistake('ALINHE A ARTE COM O CENTRO DA ÁREA PONTILHADA.');
  bodyStage.classList.remove('is-placing');
  bodyStage.classList.add('placed');
  showPhase(3);
});

function pointDistance(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
function currentTolerance(){return assist?34:22;}
function updateHud(){
  const routes=designs[design].routes;
  const progress=Math.min(100,Math.round((routeIndex+checkpointIndex/(checkpoints.length||1))/routes.length*100));
  document.getElementById('trace-route').textContent=Math.min(routeIndex+1,routes.length)+' / '+routes.length;
  document.getElementById('trace-progress').textContent=progress+'%';
  document.getElementById('trace-meter-fill').style.width=progress+'%';
  document.getElementById('trace-accuracy').textContent=(goodSamples+badSamples?Math.round(goodSamples/(goodSamples+badSamples)*100):100)+'%';
  document.getElementById('trace-score').textContent=String(score).padStart(4,'0');
}
function startRoute(){
  const route=designs[design].routes[routeIndex];
  traceGuide.setAttribute('d',route.path);
  document.getElementById('trace-path-name').textContent=route.name;
  const length=traceGuide.getTotalLength();
  const count=Math.max(18,Math.ceil(length/15));
  checkpoints=Array.from({length:count+1},(_,index)=>traceGuide.getPointAtLength(length*index/count));
  guideSamples=Array.from({length:Math.ceil(length/5)+1},(_,index)=>traceGuide.getPointAtLength(Math.min(length,index*5)));
  checkpointIndex=0;strokeD='';strokeHasPoint=false;traceLive.setAttribute('d','');
  const start=checkpoints[0];
  traceStart.setAttribute('cx',start.x);traceStart.setAttribute('cy',start.y);
  keyboardPos={x:start.x,y:start.y};
  traceCursor.setAttribute('cx',start.x);traceCursor.setAttribute('cy',start.y);
  keyboardDrawing=false;tracing=false;lastPoint=null;offTrack=false;
  updateHud();
}
function resetTrace(){
  routeIndex=0;score=bench.size*50;goodSamples=0;badSamples=0;
  traceInk.replaceChildren();traceSvg.classList.remove('keyboard-mode');
  startRoute();
}
function distanceToGuide(point){
  let minimum=Infinity;
  for(const sample of guideSamples)minimum=Math.min(minimum,pointDistance(point,sample));
  return minimum;
}
function appendInk(point){
  strokeD+=(strokeHasPoint?' L ':' M ')+point.x.toFixed(1)+' '+point.y.toFixed(1);
  strokeHasPoint=true;traceLive.setAttribute('d',strokeD);
}
function completeRoute(){
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d',strokeD);path.setAttribute('fill','none');
  path.setAttribute('stroke','#e43e31');path.setAttribute('stroke-width','5');
  path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');
  traceInk.append(path);
  score+=150;
  routeIndex++;
  tracing=false;activePointer=null;lastPoint=null;
  if(routeIndex===designs[design].routes.length){updateHud();showPhase(4);}
  else{startRoute();message('CONTORNO CONCLUÍDO! +150 · SIGA A PRÓXIMA LINHA.');}
}
function acceptSample(point){
  if(phase!==3||routeIndex>=designs[design].routes.length)return;
  if(distanceToGuide(point)>currentTolerance()){
    badSamples++;
    if(!offTrack){mistake('FORA DO CAMINHO! VOLTE À LINHA PONTILHADA.');score=Math.max(0,score-15);}
    offTrack=true;strokeHasPoint=false;updateHud();return;
  }
  offTrack=false;goodSamples++;appendInk(point);
  while(checkpointIndex<checkpoints.length&&pointDistance(point,checkpoints[checkpointIndex])<=currentTolerance()+4){
    checkpointIndex++;score+=12;
  }
  if(checkpointIndex>=checkpoints.length){completeRoute();return;}
  const next=checkpoints[checkpointIndex];
  traceStart.setAttribute('cx',next.x);traceStart.setAttribute('cy',next.y);
  updateHud();
}
function processLine(from,to){
  const steps=Math.max(1,Math.ceil(pointDistance(from,to)/4));
  for(let index=1;index<=steps&&phase===3&&tracing;index++){
    const fraction=index/steps;
    acceptSample({x:from.x+(to.x-from.x)*fraction,y:from.y+(to.y-from.y)*fraction});
  }
}
function eventPoint(event){
  const rect=traceSvg.getBoundingClientRect();
  return{x:(event.clientX-rect.left)*320/rect.width,y:(event.clientY-rect.top)*480/rect.height};
}
traceSvg.addEventListener('pointerdown',event=>{
  if(phase!==3)return;
  const point=eventPoint(event);
  if(pointDistance(point,checkpoints[checkpointIndex])>currentTolerance()+12){message('COMECE NO PONTO VERMELHO ACESO.',true);return;}
  traceSvg.setPointerCapture(event.pointerId);
  tracing=true;activePointer=event.pointerId;lastPoint=point;offTrack=false;strokeHasPoint=false;
  acceptSample(point);event.preventDefault();
});
traceSvg.addEventListener('pointermove',event=>{
  if(!tracing||activePointer!==event.pointerId||phase!==3)return;
  const point=eventPoint(event);
  processLine(lastPoint,point);lastPoint=point;event.preventDefault();
});
for(const name of ['pointerup','pointercancel','lostpointercapture'])traceSvg.addEventListener(name,event=>{
  if(event.pointerId!==activePointer)return;
  tracing=false;activePointer=null;lastPoint=null;strokeHasPoint=false;
});
traceSvg.addEventListener('keydown',event=>{
  if(phase!==3)return;
  if(event.code==='Space'){
    event.preventDefault();
    if(!keyboardDrawing){
      if(pointDistance(keyboardPos,checkpoints[checkpointIndex])>currentTolerance()+10){message('MOVA O CURSOR ATÉ O PONTO VERMELHO.',true);return;}
      keyboardDrawing=true;tracing=true;acceptSample(keyboardPos);
    }else{keyboardDrawing=false;tracing=false;strokeHasPoint=false;}
    traceSvg.classList.add('keyboard-mode');
    message(keyboardDrawing?'TRAÇO LIGADO. USE AS SETAS.':'TRAÇO PAUSADO. ESPAÇO PARA CONTINUAR.');
    return;
  }
  const directions={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
  const direction=directions[event.code];
  if(!direction)return;
  event.preventDefault();traceSvg.classList.add('keyboard-mode');
  const previous={...keyboardPos};
  keyboardPos={x:Math.max(0,Math.min(320,keyboardPos.x+direction[0]*7)),y:Math.max(0,Math.min(480,keyboardPos.y+direction[1]*7))};
  traceCursor.setAttribute('cx',keyboardPos.x);traceCursor.setAttribute('cy',keyboardPos.y);
  if(keyboardDrawing)processLine(previous,keyboardPos);
});
document.getElementById('assist-toggle').addEventListener('click',event=>{
  assist=!assist;event.currentTarget.setAttribute('aria-pressed',String(assist));
  event.currentTarget.textContent='ALVO MAIOR: '+(assist?'LIGADO':'DESLIGADO');
  message(assist?'ALVO AMPLIADO. O TRAÇO CONTINUA MANUAL.':'ALVO PADRÃO.');
});
document.getElementById('reset-trace').addEventListener('click',()=>{
  mistakes=preTraceMistakes;mistakesEl.textContent=String(mistakes).padStart(2,'0');
  resetTrace();message('CONTORNO REINICIADO.');
});
document.getElementById('replay').addEventListener('click',()=>{
  design=null;bench=new Set();mistakes=0;score=0;assist=false;tracing=false;draggingTattoo=false;
  mistakesEl.textContent='00';
  tattoo.src=designs.moth.src;tattoo.alt='Arte conceitual selecionada para a simulação';
  bodyStage.className='body-stage';bodyStage.dataset.phase='0';
  document.querySelectorAll('.design-card').forEach(card=>card.setAttribute('aria-pressed','false'));
  sliderX.value='37';sliderY.value='44';updatePosition();
  document.querySelector('input[name="ink-tone"][value="black"]').checked=true;
  document.querySelector('input[name="machine-style"][value="pen"]').checked=true;
  document.querySelector('.tool-card[data-item="ink"] use').setAttribute('href','#icon-ink');
  document.querySelector('.tool-card[data-item="machine"] use').setAttribute('href','#icon-machine');
  document.getElementById('start-bench').disabled=true;
  document.getElementById('assist-toggle').setAttribute('aria-pressed','false');
  document.getElementById('assist-toggle').textContent='ALVO MAIOR: DESLIGADO';
  updateBench();showPhase(0);
});
