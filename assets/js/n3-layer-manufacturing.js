
(()=>{
const root=document.getElementById('n3-fab-explorer');
const q=id=>root.querySelector('#'+id),svg=q('n3-scene');
const ns='http://www.w3.org/2000/svg';
const metals=[
 ['M0','0.013/0.010','Local interconnect joins device contacts to the routing stack.'],
 ['M1','0.028/0.020','The first routing level carries short connections above local interconnect.'],
 ['Mxa','0.012/0.014','Fine-pitch routing connects nearby standard-cell signals.'],
 ['Mxb','0.018/0.017','Another fine-pitch routing level adds crossing and connection options.'],
 ['Mxc','0.018/0.017','Additional local routing distributes signals across nearby logic.'],
 ['Mxd','0.020/0.022','This routing level bridges the fine lower metals and wider upper wiring.'],
 ['Mya','0.038/0.038','Wider intermediate wiring can carry signals over longer distances.'],
 ['Myb','0.038/0.038','Another intermediate level provides extra routing capacity.'],
 ['My','0.038/0.038','Intermediate wiring supports longer signal, clock, or power routes.'],
 ['My','0.038/0.038','Intermediate wiring adds another vertically connected routing plane.'],
 ['My','0.038/0.038','Intermediate wiring carries routes above dense lower-level connections.'],
 ['My','0.038/0.038','This upper-intermediate level expands routing resources.'],
 ['My','0.038/0.038','The last My level in the supplied stack connects upward into Myy.'],
 ['Myy','0.062/0.064','Coarser upper wiring can reduce resistance for long routes.'],
 ['Myy','0.062/0.064','A second Myy level adds capacity above the intermediate stack.'],
 ['Mz','0.360/0.360','Coarse top wiring is suited to low-resistance global connections.'],
 ['Mz','0.360/0.360','The top metal in this image completes the illustrated wiring stack.']
];
const vias=[['VIA0','0.012/0.034'],['VIAxa','0.012/0.036'],['VIAxb','0.012/0.0265'],['VIAxc','0.018/0.017'],['VIAxd','0.018/0.017'],['VIAya','0.020/0.085'],...Array.from({length:6},()=>['VIAy','0.038/0.053']),['VIAyy','0.062/0.064'],['VIAyy','0.062/0.064'],['VIAz','0.324/0.306'],['VIAz','0.324/0.306']];
const feol=[
 ['Silicon starting wafer','Start with a silicon wafer. Wells and channel doping establish the transistor body regions; those details are simplified here.','OD identifies the active device region in the source.'],
 ['Define fins and active regions · OD','Pattern and etch narrow silicon fins. N3 is a FinFET technology: the channel is a raised silicon fin, not a stacked nanosheet.','OD · source annotation 0.032/0.072'],
 ['Isolate adjacent devices · STI','Deposit oxide between fins, then polish and recess it. Shallow-trench isolation separates neighboring active regions while leaving the upper fin exposed.','STI is explanatory context; it is not separately labeled in the image.'],
 ['Pattern a temporary gate · PO','Pattern a sacrificial gate across the fin. Its position defines the channel region and guides the self-aligned source/drain process.','PO · source annotation 0.003/0.045; physical gate integration is schematic.'],
 ['Form spacers and source / drain','Deposit and etch insulating gate spacers. Recess and selectively grow source/drain regions, then activate dopants; exact materials and sequence are process-dependent.','Source/drain regions lie on either side of the gate along the fin.'],
 ['Replace the gate · MG','After dielectric fill and polishing, remove the dummy gate. Form a thin high-k dielectric and a metal gate around the exposed fin, then planarize.','MG denotes the metal gate in the supplied cross-section.'],
 ['Contact the source / drain · MD','Open contact holes through the dielectric to source/drain regions. Prepare the interface, fill with contact metal, and polish to make MD contacts.','MD · source annotation 0.016/0.032'],
 ['Connect gate and diffusion · VG / VD','Etch and fill vertical connections: VG reaches the gate, while VD reaches MD. These contacts connect devices to M0.','VG 0.012/0.0335 · VD 0.012/0.032 (source annotations)']
];
const processes=[
 ['Deposit dielectric','Deposit an insulating dielectric and suitable cap/etch-stop films over the previous level. This separates the next wires from the wiring below.'],
 ['Pattern and etch','Use lithography to define trenches and contact openings, then etch the dielectric. The illustrated via connects downward; actual via-first/trench-first integration can differ.'],
 ['Form liner / barrier','Coat the cavity surfaces with an appropriate liner or diffusion barrier. For copper integration, a conductive seed prepares the surface for filling.'],
 ['Fill the conductor','Fill the openings with conductor. Copper dual-damascene commonly uses electroplating; the image does not identify the conductor or fill recipe at each level.'],
 ['Polish and cap · CMP','Chemical-mechanical polishing removes the overburden, leaving conductor inside the openings. A cap prepares the planar surface for the next level.']
];
let steps=feol.map((s,i)=>({kind:'feol',f:i,title:s[0],desc:s[1],ref:s[2]}));
for(let n=0;n<=16;n++)for(let phase=0;phase<5;phase++)steps.push({kind:'metal',n,phase,title:`M${n}${n?' + V'+(n-1):' over VG / VD'} · ${processes[phase][0]}`});
steps.push({kind:'finish',title:'M0–M16 · Completed illustrated stack'});
let index=0,first=true;
const menu=q('n3-jump');
feol.forEach((s,i)=>{const o=document.createElement('option');o.value=i;o.textContent=['Wafer','OD · fins','STI · isolation','PO · dummy gate','Source / drain','MG · metal gate','MD · contacts','VG / VD'][i];menu.append(o)});
metals.forEach((m,n)=>{const o=document.createElement('option');o.value=8+n*5;o.textContent=`M${n} · ${m[0]}${n?' / V'+(n-1):''}`;menu.append(o)});
const end=document.createElement('option');end.value=steps.length-1;end.textContent='Complete stack';menu.append(end);
function el(tag,attrs={},text='',parent=svg){const e=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text)e.textContent=text;parent.append(e);return e}
function rect(x,y,w,h,cls,parent=svg){return el('rect',{x,y,width:Math.max(0,w),height:Math.max(0,h),class:cls},'',parent)}
function text(x,y,t,anchor='start',parent=svg){return el('text',{x,y,'text-anchor':anchor},t,parent)}
function line(x,y,X,Y,cls='minor'){el('path',{d:`M${x},${y}L${X},${Y}`,class:cls})}
function animate(e,frames,opts={}){if(!first&&!matchMedia('(prefers-reduced-motion: reduce)').matches)e.animate(frames,{duration:950,easing:'cubic-bezier(.2,.7,.3,1)',...opts})}
function device(x,y,w,stage,compact=false){
 if(compact){rect(x,y,w,28,'material-si');rect(x+w*.08,y-10,w*.84,10,'material-si');[.17,.5,.82].forEach((t,j)=>{rect(x+w*t-9,y-27,18,17,j===1?'material-gate':'material-via');rect(x+w*t-4,y-45,8,18,'material-via')});text(x+w/2,y+19,'OD · silicon','middle');return}
 const sub=compact?28:48,fin=compact?12:35;rect(x,y,w,sub,'material-si');
 const gx=x+w*.47,gw=Math.max(12,w*.1),fx=x+w*.08,fw=w*.84;
 if(stage>=1){rect(fx,y-fin,fw,fin,'material-si');text(x+w/2,y+sub-9,'OD · silicon','middle')}
 else text(x+w/2,y+sub/2+4,'Silicon wafer','middle');
 if(stage>=2){rect(x,y-10,w*.08,10,'material-oxide');rect(x+w*.92,y-10,w*.08,10,'material-oxide')}
 if(stage>=3){rect(gx,y-fin-34,gw,34,stage>=5?'material-gate grow':'material-resist grow');if(!compact)text(gx+gw/2,y-fin-42,stage>=5?'MG':'PO','middle')}
 if(stage>=4){rect(gx-5,y-fin-27,5,27,'material-oxide');rect(gx+gw,y-fin-27,5,27,'material-oxide');rect(x+w*.15,y-fin-7,w*.22,18,'material-si');rect(x+w*.68,y-fin-7,w*.20,18,'material-si');if(!compact){text(x+w*.23,y-fin-16,'Source','middle');text(x+w*.79,y-fin-16,'Drain','middle')}}
 if(stage>=6){[.24,.79].forEach(t=>{rect(x+w*t-9,y-fin-35,18,28,'material-via grow');if(!compact)text(x+w*t,y-fin-43,'MD','middle')})}
 if(stage>=7){[.24,.52,.79].forEach((t,j)=>{rect(x+w*t-4,y-fin-68,8,34,'material-via grow');if(!compact)text(x+w*t,y-fin-77,j===1?'VG':'VD','middle')})}
}
function finInset(x,y,w,stage){
 text(x+w/2,y,'Across the fin','middle');rect(x,y+65,w,20,'material-si');rect(x,y+50,w,15,'material-oxide');
 [0.23,0.5,0.77].forEach(t=>{const cx=x+w*t;rect(cx-6,y+27,12,38,'material-si');if(stage>=5){el('path',{d:`M${cx-11} ${y+52}V${y+22}H${cx+11}V${y+52}`,fill:'none',stroke:'var(--viz-series-5)','stroke-width':6})}});
 text(x+w/2,y+106,stage>=5?'Gate wraps three fin sides':'Raised silicon channels','middle');
}
function draw(){
 const s=steps[index],W=Math.max(300,Math.round(q('n3-drawing').getBoundingClientRect().width)),mobile=W<500;
 const H=s.kind==='feol'?350:550;svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.height=H+'px';svg.replaceChildren();
 el('title',{},s.title);el('desc',{},s.kind==='feol'?s.desc:'An enlarged active-layer process is shown above a compressed record of completed layers.');
 const x=18,w=W-110,right=x+w;
 if(s.kind==='feol'){
  text(18,24,mobile?'DEVICE FORMATION · FinFET':'DEVICE FORMATION · conceptual FinFET sections');
  if(mobile){device(x,155,w+65,s.f,false);if(s.f>=2)finInset(x+25,210,w+15,s.f)}
  else{device(x,228,w*.60,s.f,false);finInset(W*.69,140,W*.25,s.f);text(x,310,'Along the fin: source → channel → drain')}
  if(s.f===1){const g=el('g',{class:'move'});for(let j=0;j<8;j++)rect(x+15+j*(w/8),60,2,32,'material-via',g);animate(g,[{transform:'translateY(-25px)',opacity:0},{transform:'translateY(35px)',opacity:1},{transform:'translateY(65px)',opacity:0}])}
  if(s.f===2){const r=rect(x,70,w*.55,7,'material-oxide plate');animate(r,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}]);text(x,58,'Oxide deposition → recess')}
  if(s.f===5&& !mobile)text(W*.69,113,'FinFET gate detail');
 }else{
  const complete=s.kind==='finish',n=complete?17:s.n,phase=complete?4:s.phase;
  const miniTop=complete?80:258,dy=complete?18:11;
  text(x,22,complete?'COMPLETED CROSS-SECTION':'ACTIVE LEVEL · enlarged process detail');
  if(!complete){
   const top=84,bottom=192,bw=w,positions=[.17,.50,.82],metalW=n>=15?bw*.18:bw*.13,viaW=n>=15?bw*.075:bw*.045;
   rect(x,bottom,bw,22,'material-oxide');positions.forEach(t=>rect(x+bw*t-metalW/2,bottom+1,metalW,10,'material-metal'));
   text(right+8,bottom+11,n?`M${n-1}`:'VG / VD');
   const dielectric=rect(x,top,bw,bottom-top,'material-oxide grow');if(phase===0)animate(dielectric,[{transform:'scaleY(0.02)'},{transform:'scaleY(1)'}]);
   if(phase>=1){
    const etch=el('g',{'class':'grow'});etch.style.transformOrigin='top';
    positions.forEach(t=>{rect(x+bw*t-metalW/2,top,metalW,36,'cavity',etch);rect(x+bw*t-viaW/2,top+34,viaW,bottom-top-34,'cavity',etch)});
    if(phase===1){animate(etch,[{transform:'scaleY(0.01)'},{transform:'scaleY(1)'}]);const resist=el('g',{class:'move'});let cursor=x;positions.forEach(t=>{const hole=x+bw*t-metalW/2;rect(cursor,top-10,hole-cursor,8,'material-resist',resist);cursor=hole+metalW});rect(cursor,top-10,right-cursor,8,'material-resist',resist);text(x,54,'Lithography → trench / via etch');}
   }
   if(phase>=2){const g=el('g',{class:'move'});positions.forEach(t=>{const a=x+bw*t;el('path',{d:`M${a-metalW/2} ${top}V${top+36}H${a-viaW/2}V${bottom}H${a+viaW/2}V${top+36}H${a+metalW/2}V${top}`,fill:'none',stroke:'var(--viz-series-5)','stroke-width':3},'',g)});if(phase===2)animate(g,[{transform:'translateY(-12px)',opacity:0},{transform:'translateY(0)',opacity:1}]);}
   if(phase>=3){const g=el('g',{class:'grow'});positions.forEach(t=>{rect(x+bw*t-metalW/2+2,top+2,metalW-4,32,'material-metal',g);rect(x+bw*t-viaW/2+2,top+34,Math.max(3,viaW-4),bottom-top-35,'material-via',g)});if(phase===3){rect(x,top-13,bw,13,'material-metal',g);animate(g,[{transform:'scaleY(.01)'},{transform:'scaleY(1)'}]);text(x,54,'Conductor fill + overburden')}else{const pad=rect(x,top-16,bw*.28,9,'material-resist move');animate(pad,[{transform:'translateX(0px)'},{transform:`translateX(${bw*.7}px)`},{transform:`translateX(${bw*.7}px)`,opacity:0}]);text(x,54,'CMP removes excess → planar surface')}}
   text(right+8,top+24,`M${n}`);text(right+8,top+76,n?`V${n-1}`:'VG / VD');
   if(phase===0)text(x,54,mobile?'Deposit insulating film':'Insulating film grows over the previous level');
   if(phase===2)text(x,54,'Conformal liner / barrier');
   line(x,234,W-12,234);text(x,251,mobile?'BUILT SO FAR · compressed':'BUILT SO FAR · compressed vertical scale');
  }
  const bandCount=complete?17:n,baseY=miniTop+(complete?17:17)*dy;
  for(let k=0;k<bandCount;k++){
   const yy=baseY-(k+1)*dy;rect(x,yy,w,dy,'material-oxide');
   [.17,.50,.82].forEach(t=>{const width=k>=15?w*.18:w*.1;rect(x+w*t-width/2,yy,width,Math.max(4,dy*.47),'material-metal');rect(x+w*t-3,yy+dy*.47,6,dy*.53,'material-via')});
   if(complete||k%2===0||k===bandCount-1)text(right+8,yy+Math.max(9,dy*.7),`M${k}`);
  }
  if(!complete&&n===0)text(x,baseY-22,mobile?'Contacts ready for M0':'First wiring level: contacts are ready');
  device(x,baseY+45,w,7,true);
  text(right+8,baseY+25,'Contacts');text(right+8,baseY+56,'OD');
  if(complete){text(x,54,mobile?'M0–M16 joined by V0–V15':'M0–M16 with V0–V15 between adjacent routing levels');text(x,baseY+95,'MG / MD → VG / VD → M0 → … → M16')}
 }
 root.querySelectorAll('.grow').forEach(e=>{if(s.kind==='feol')animate(e,[{transform:'scaleY(.03)'},{transform:'scaleY(1)'}])});
 first=false;
}
function update(){const s=steps[index];q('n3-heading').textContent=s.title;q('n3-count').textContent=`${index+1} / ${steps.length}`;q('n3-region').textContent=s.kind==='feol'?(s.f<6?'Front end · FEOL':'Contacts · MOL'):'Wiring · BEOL';
 q('n3-back').disabled=index===0;q('n3-next').disabled=index===steps.length-1;
 menu.value=s.kind==='feol'?s.f:s.kind==='finish'?steps.length-1:8+s.n*5;
 if(s.kind==='feol'){q('n3-caption').textContent=s.desc;q('n3-reference').textContent=s.ref}
 else if(s.kind==='finish'){q('n3-caption').textContent='Transistors switch current; contacts reach the devices; vias join wiring levels. Final passivation and pad openings normally follow, but are not drawn in the supplied stack.';q('n3-reference').textContent='Layer names follow the reference cross-section. Repeated routing columns are illustrative; neighboring layers may route in different directions.'}
 else{q('n3-caption').textContent=processes[s.phase][1]+' '+metals[s.n][2];let v=s.n?vias[s.n-1]:null;q('n3-reference').textContent=`Source: M${s.n} / ${metals[s.n][0]} ${metals[s.n][1]}${v?' · V'+(s.n-1)+' / '+v[0]+' '+v[1]:''}. Numeric pairs are transcribed; units and definitions are not specified in this crop.`}
 let p=100*index/(steps.length-1);q('n3-bar').style.width=p+'%';q('n3-progress').setAttribute('aria-valuenow',Math.round(p));draw();}
function move(d){index=Math.max(0,Math.min(steps.length-1,index+d));update()}
q('n3-back').addEventListener('click',()=>move(-1));q('n3-next').addEventListener('click',()=>move(1));menu.addEventListener('change',()=>{index=Number(menu.value);update()});
root.addEventListener('keydown',e=>{if(e.target.matches('select,input,textarea')||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
new ResizeObserver(()=>draw()).observe(q('n3-drawing'));update();
})();
