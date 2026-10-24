const phases=[...document.querySelectorAll('.phase')];
const feedback=document.getElementById('game-feedback');
const phaseLabel=document.getElementById('phase-label');
const sceneState=document.getElementById('scene-state');
const tattoo=document.getElementById('tattoo-image');
const bodyStage=document.getElementById('body-stage');
const mistakesEl=document.getElementById('mistakes');
const percentEl=document.getElementById('percent');
const sliderX=document.getElementById('position-x');
const sliderY=document.getElementById('position-y');
const svg=document.getElementById('draw-svg');
const drawn=document.getElementById('drawn');
const pointGroup=document.getElementById('draw-points');
const points=[[160,35],[230,55],[277,112],[284,190],[236,263],[160,287],[84,263],[36,190],[43,112],[90,55],[160,35]];
const designs={moth:{name:'MARIPOSA LUNAR',src:'assets/moth-moon-v1.png'},raven:{name:'CORVO & MÁRMORE',src:'assets/raven-statue-v1.png'}};
let phase=0,design=null,bench=new Set(),layers=new Set(),mistakes=0,drawProgress=0,tracing=false,dragging=false;

function message(value,wrong=false){feedback.textContent=value;feedback.classList.toggle('wrong',wrong);}
function mistake(value){mistakes++;mistakesEl.textContent=String(mistakes).padStart(2,'0');message(value,true);}
function showPhase(number){
  phase=number;
  phases.forEach((node,index)=>node.hidden=index!==number);
  document.querySelectorAll('.mission-steps li').forEach((node,index)=>{
    node.classList.toggle('current',index===number);
    node.classList.toggle('done',index<number);
  });
  phaseLabel.textContent=number<4?'FASE '+String(number+1).padStart(2,'0')+' / 04':'ARQUIVO CONCLUÍDO';
  percentEl.textContent=String(number*25).padStart(2,'0')+'%';
  bodyStage.dataset.phase=number;
  sceneState.textContent=['CONCEITO','POSICIONAR','CAMADAS','ACABAMENTO','CONCLUÍDO'][number];
  message(['ESCOLHA UMA ARTE E MONTE A BANCADA.','ARTE SELECIONADA. POSICIONE NO ALVO.','REVELE AS TRÊS CAMADAS VISUAIS.','SIGA OS PONTOS DO EMBLEMA.','CONCEITO DIGITAL CONCLUÍDO.'][number]);
  if(number===4){
    document.getElementById('result-text').textContent=(mistakes===0?'Composição precisa.':'Você testou, ajustou e concluiu.')+' A arte escolhida foi '+designs[design].name.toLowerCase()+'. Foram '+mistakes+' ajuste(s) fora do alvo. O progresso real de Paulo está no diário e no Instagram.';
  }
  const title=phases[number].querySelector('h2');
  title.tabIndex=-1;title.focus({preventScroll:true});
}
function updateStart(){
  document.getElementById('bench-count').textContent=bench.size+' / 3';
  document.getElementById('start-placement').disabled=!(design&&bench.size===3);
}
document.querySelectorAll('.design-card').forEach(button=>button.addEventListener('click',()=>{
  if(phase!==0)return;
  design=button.dataset.design;
  document.querySelectorAll('.design-card').forEach(card=>card.setAttribute('aria-pressed',String(card===button)));
  tattoo.src=designs[design].src;
  tattoo.alt='Arte conceitual '+designs[design].name.toLowerCase()+' selecionada para a simulação';
  bodyStage.classList.add('has-design');
  message(designs[design].name+' SELECIONADA.');
  updateStart();
}));
document.querySelectorAll('.bench-items button').forEach(button=>button.addEventListener('click',()=>{
  if(phase!==0)return;
  bench.add(button.dataset.item);
  button.classList.add('chosen');
  button.setAttribute('aria-pressed','true');
  message('MÓDULO ADICIONADO À BANCADA.');
  updateStart();
}));
document.getElementById('start-placement').addEventListener('click',()=>{
  if(design&&bench.size===3){bodyStage.classList.add('is-placing');updatePosition();showPhase(1);}
});
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
  if(phase!==1)return;
  dragging=true;
  tattoo.setPointerCapture(event.pointerId);
  event.preventDefault();
});
tattoo.addEventListener('pointermove',event=>{
  if(!dragging||phase!==1)return;
  const rect=bodyStage.getBoundingClientRect();
  sliderX.value=String(Math.max(25,Math.min(75,Math.round((event.clientX-rect.left)/rect.width*100))));
  sliderY.value=String(Math.max(30,Math.min(70,Math.round((event.clientY-rect.top)/rect.height*100))));
  updatePosition();
});
for(const name of ['pointerup','pointercancel','lostpointercapture'])tattoo.addEventListener(name,()=>{dragging=false;});
document.getElementById('confirm-placement').addEventListener('click',()=>{
  if(phase!==1)return;
  if(Math.abs(Number(sliderX.value)-50)>5||Math.abs(Number(sliderY.value)-50)>5)return mistake('ALINHE A ARTE COM O CENTRO DA ÁREA PONTILHADA.');
  bodyStage.classList.remove('is-placing');
  bodyStage.classList.add('placed');
  showPhase(2);
});
document.querySelectorAll('.layer-controls button').forEach(button=>button.addEventListener('click',()=>{
  if(phase!==2)return;
  layers.add(button.dataset.layer);
  button.classList.add('chosen');
  button.setAttribute('aria-pressed','true');
  bodyStage.classList.toggle('layer-line',layers.has('line'));
  bodyStage.classList.toggle('layer-shade',layers.has('shade'));
  bodyStage.classList.toggle('layer-dots',layers.has('dots'));
  document.getElementById('layer-count').textContent=layers.size+' / 3';
  document.getElementById('layer-fill').style.width=(layers.size/3*100)+'%';
  document.getElementById('start-finish').disabled=layers.size!==3;
  message('CAMADA VISUAL ADICIONADA: '+button.querySelector('span').textContent+'.');
}));
document.getElementById('start-finish').addEventListener('click',()=>{
  if(layers.size===3)showPhase(3);
});
function renderTrace(){
  drawn.setAttribute('d',points.slice(0,drawProgress).map(([x,y],i)=>(i?'L':'M')+x+' '+y).join(' '));
  pointGroup.replaceChildren();
  points.forEach(([x,y],index)=>{
    const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx',x);circle.setAttribute('cy',y);
    circle.setAttribute('r',index===drawProgress?8:4);
    circle.setAttribute('fill',index<drawProgress?'#e43e31':index===drawProgress?'#fff4e4':'#d6cebb');
    pointGroup.append(circle);
  });
  document.getElementById('draw-status').textContent=drawProgress===points.length?'ACABAMENTO CONCLUÍDO':'PONTO '+String(drawProgress+1).padStart(2,'0')+' / '+points.length;
}
function advancePoint(){
  if(phase!==3||drawProgress>=points.length)return;
  drawProgress++;renderTrace();
  if(drawProgress===points.length){tracing=false;setTimeout(()=>showPhase(4),450);}
}
function tryPoint(event){
  if(phase!==3||!tracing||drawProgress>=points.length)return;
  const rect=svg.getBoundingClientRect();
  const x=(event.clientX-rect.left)*320/rect.width;
  const y=(event.clientY-rect.top)*320/rect.height;
  const [targetX,targetY]=points[drawProgress];
  if(Math.hypot(x-targetX,y-targetY)<25)advancePoint();
}
svg.addEventListener('pointerdown',event=>{if(phase!==3)return;tracing=true;svg.setPointerCapture(event.pointerId);tryPoint(event);});
svg.addEventListener('pointermove',tryPoint);
for(const name of ['pointerup','pointercancel','lostpointercapture'])svg.addEventListener(name,()=>{tracing=false;});
document.getElementById('next-point').addEventListener('click',advancePoint);
document.getElementById('reset-trace').addEventListener('click',()=>{drawProgress=0;renderTrace();message('DETALHE REINICIADO.');});
document.getElementById('replay').addEventListener('click',()=>{
  design=null;bench=new Set();layers=new Set();mistakes=0;drawProgress=0;tracing=false;dragging=false;
  mistakesEl.textContent='00';tattoo.src=designs.moth.src;tattoo.alt='Arte conceitual selecionada para a simulação';
  bodyStage.className='body-stage';bodyStage.dataset.phase='0';
  document.querySelectorAll('.design-card').forEach(card=>card.setAttribute('aria-pressed','false'));
  document.querySelectorAll('.bench-items button,.layer-controls button').forEach(button=>{button.classList.remove('chosen');button.setAttribute('aria-pressed','false');});
  sliderX.value='37';sliderY.value='44';updatePosition();
  document.getElementById('layer-count').textContent='0 / 3';
  document.getElementById('layer-fill').style.width='0%';
  document.getElementById('start-finish').disabled=true;
  updateStart();renderTrace();showPhase(0);
});
renderTrace();updateStart();
