const compare=document.getElementById('compare');
if(compare){
  const before=document.getElementById('before');
  const line=document.getElementById('compare-line');
  const position=document.getElementById('position');
  compare.addEventListener('input',()=>{
    const value=Number(compare.value);
    before.style.clipPath='inset(0 '+(100-value)+'% 0 0)';
    line.style.left=value+'%';
    position.value=value+'%';
  });
}
