const phases=[...document.querySelectorAll('.phase')];
const feedback=document.getElementById('game-feedback');
const phaseLabel=document.getElementById('phase-label');
const mistakesEl=document.getElementById('mistakes');
const percentEl=document.getElementById('percent');
const benchOrder=['reference','sketch','paper'];
const benchNames={reference:'REFERÊNCIA',sketch:'DESENHO',paper:'PAPEL DE PRÁTICA'};
const toneOrder=['dark','mid','light'];
const toneNames={dark:'ESCURO',mid:'MÉDIO',light:'CLARO'};
const tones={dark:'#191a18',mid:'#777970',light:'#d2d0c7'};
const points=[[160,46],[196,82],[255,76],[221,119],[267,165],[209,161],[190,227],[160,275],[130,227],[111,161],[53,165],[99,119],[65,76],[124,82],[160,46]];
let phase=0,benchProgress=0,toneProgress=0,mistakes=0,drawProgress=0;
let tracing=false;

function message(value,wrong=false){
  feedback.textContent=value;
  feedback.classList.toggle('wrong',wrong);
}
function mistake(value){
  mistakes++;
  mistakesEl.textContent=String(mistakes).padStart(2,'0');
  message(value,true);
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
  if(number===4){
    const descriptor=mistakes===0?'Execução precisa. Você resolveu cada etapa sem falhas.':mistakes<=3?'Boa investigação. Você ajustou o percurso e chegou ao fim.':'Missão cumprida. Repetir, observar e melhorar também faz parte do processo.';
    document.getElementById('result-text').textContent=descriptor+' Foram '+mistakes+' tentativa(s) fora do alvo. Para ver a evolução real de Paulo, acompanhe o arquivo e o Instagram.';
  }
  message(number<4?['ESCOLHA O PRIMEIRO MÓDULO.','ALINHE O SÍMBOLO AO CENTRO.','COMECE PELO TOM MAIS ESCURO.','SIGA A LINHA PONTO A PONTO.'][number]:'MISSÃO CONCLUÍDA.');
  const title=phases[number].querySelector('h2');
  title.tabIndex=-1;
  title.focus({preventScroll:true});
}
document.querySelectorAll('#bench-choices button').forEach(button=>button.addEventListener('click',()=>{
  if(phase!==0||button.disabled)return;
  const value=button.dataset.item;
  if(value!==benchOrder[benchProgress])return mistake('FORA DA SEQUÊNCIA. OBSERVE → DESENHE → PREPARE O PAPEL.');
  document.getElementById('bench-slot-'+benchProgress).textContent=String(benchProgress+1).padStart(2,'0')+' / '+benchNames[value];
  button.disabled=true;
  benchProgress++;
  if(benchProgress===3)setTimeout(()=>showPhase(1),350);
  else message('MÓDULO CONFIRMADO. SIGA A SEQUÊNCIA.');
}));
const slider=document.getElementById('stencil-range');
const moving=document.getElementById('stencil-moving');
const stencilOutput=document.getElementById('stencil-output');
slider.addEventListener('input',()=>{
  const value=Number(slider.value);
  moving.style.left=value+'%';
  stencilOutput.value=value+'%';
  moving.classList.toggle('aligned',Math.abs(value-50)<=5);
});
slider.dispatchEvent(new Event('input'));
document.getElementById('stencil-confirm').addEventListener('click',()=>{
  if(phase!==1)return;
  if(Math.abs(Number(slider.value)-50)>5)return mistake('AINDA NÃO ALINHOU. APROXIME OS DOIS SÍMBOLOS.');
  message('DECALQUE ALINHADO.');
  setTimeout(()=>showPhase(2),350);
});
document.querySelectorAll('#tone-choices button').forEach(button=>button.addEventListener('click',()=>{
  if(phase!==2||button.disabled)return;
  const value=button.dataset.tone;
  if(value!==toneOrder[toneProgress])return mistake('CONTRASTE FORA DE ORDEM. VÁ DO ESCURO AO CLARO.');
  const slot=document.getElementById('value-slots').children[toneProgress];
  slot.textContent=String(toneProgress+1).padStart(2,'0')+' / '+toneNames[value];
  slot.style.background=tones[value];
  slot.style.color=value==='light'?'#101110':'#fff';
  button.disabled=true;
  toneProgress++;
  if(toneProgress===3)setTimeout(()=>showPhase(3),350);
  else message('VALOR CONFIRMADO. CONTINUE A ESCALA.');
}));
const svg=document.getElementById('draw-svg');
const drawn=document.getElementById('drawn');
const pointGroup=document.getElementById('draw-points');
function renderTrace(){
  drawn.setAttribute('d',points.slice(0,drawProgress).map(([x,y],i)=>(i?'L':'M')+x+' '+y).join(' '));
  pointGroup.replaceChildren();
  points.forEach(([x,y],index)=>{
    const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx',x);circle.setAttribute('cy',y);
    circle.setAttribute('r',index===drawProgress?9:4);
    circle.setAttribute('fill',index<drawProgress?'#e43e31':index===drawProgress?'#ff796d':'#8a8e80');
    pointGroup.append(circle);
  });
  document.getElementById('draw-status').textContent=drawProgress===points.length?'TRAÇO CONCLUÍDO':'PONTO '+String(drawProgress+1).padStart(2,'0')+' / '+points.length;
}
function advancePoint(){
  if(phase!==3||drawProgress>=points.length)return;
  drawProgress++;
  renderTrace();
  if(drawProgress===points.length){
    tracing=false;
    setTimeout(()=>showPhase(4),550);
  }
}
function tryPoint(event){
  if(phase!==3||!tracing||drawProgress>=points.length)return;
  const rect=svg.getBoundingClientRect();
  const x=(event.clientX-rect.left)*320/rect.width;
  const y=(event.clientY-rect.top)*320/rect.height;
  const [targetX,targetY]=points[drawProgress];
  if(Math.hypot(x-targetX,y-targetY)<24)advancePoint();
}
svg.addEventListener('pointerdown',event=>{
  if(phase!==3)return;
  tracing=true;
  svg.setPointerCapture(event.pointerId);
  tryPoint(event);
});
svg.addEventListener('pointermove',tryPoint);
for(const eventName of ['pointerup','pointercancel','lostpointercapture'])svg.addEventListener(eventName,()=>{tracing=false;});
document.getElementById('next-point').addEventListener('click',advancePoint);
document.getElementById('reset-trace').addEventListener('click',()=>{drawProgress=0;renderTrace();message('TRAÇO REINICIADO.');});
document.getElementById('replay').addEventListener('click',()=>{
  benchProgress=0;toneProgress=0;mistakes=0;drawProgress=0;tracing=false;
  mistakesEl.textContent='00';
  document.querySelectorAll('#bench-choices button,#tone-choices button').forEach(button=>button.disabled=false);
  benchOrder.forEach((_,i)=>document.getElementById('bench-slot-'+i).textContent=String(i+1).padStart(2,'0')+' / ?');
  [...document.getElementById('value-slots').children].forEach((slot,i)=>{slot.textContent=String(i+1).padStart(2,'0')+' / '+toneNames[toneOrder[i]];slot.removeAttribute('style');});
  slider.value='15';slider.dispatchEvent(new Event('input'));
  renderTrace();showPhase(0);
});
renderTrace();
