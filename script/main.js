(()=>{"use strict";var e={932:(e,t,i)=>{i.d(t,{Mn:()=>o,hm:()=>d,rA:()=>a,vV:()=>n});const a=7,n=420,d=[{name:"小宮山口駅",x:544,y:-458,pid:"komiya_komiyasanguchi"},{name:"小宮駅",x:517,y:-449,pid:"komiya_komiya",description:"小宮市の市街地の地下に位置する主要な旅客ターミナル駅。小宮電鉄線を中心にいくつかの路線が乗り入れている。",src:"https://i.ibb.co/Wv6mTnV/komiya-sta.png"},{name:"小宮格闘センター前駅",x:484,y:-433,pid:"komiya_komiyafightingcenter"},{name:"小宮南駅",x:527,y:-430,pid:"komiya_komiyaminami"},{name:"小宮村駅",x:458,y:-449,pid:"komiya_komiyamura"},{name:"赤羽駅",x:435,y:-449,pid:"akabane_akabane"},{name:"T村駅",x:449,y:-410,pid:"tmura_tmura"},{name:"北小宮駅",x:550,y:-478,pid:"komiya_kitakomiya"},{name:"北平駅",x:550,y:-478,pid:"komiya_kitahira"}],o=[{name:"小宮電鉄東北線",color:"orange",pid:["komiya_komiyafightingcenter","komiya_komiya","komiya_komiyasanguchi","komiya_kitakomiya"],lid:"komiya_1",type:"train"},{name:"小宮電鉄線",color:"red",pid:["komiya_komiyaminami","komiya_komiya","komiya_komiyamura","akabane_akabane","tmura_tmura"],lid:"komiya_2",type:"train"},{name:"RR秘境線",color:"yellow",pid:["komiya_komiyaminami","komiya_komiyasanguchi","komiya_kitahira"],lid:"komiya_2",type:"train"}]},799:(e,t,i)=>{i.d(t,{$9:()=>n,Ji:()=>d,QR:()=>l,Y3:()=>r,ej:()=>o});let a=[],n=(...e)=>{console.log(e),a.push(e)};const d=document.getElementById("canvas"),o=d.getContext("2d"),l=e=>e*Math.PI/180,r=e=>"station"==e?"#007bff":""},565:(e,t,i)=>{i.d(t,{H:()=>n});var a=i(932);class n{static get(e,t,i){let n=[...a.hm],d={},o={},l=[];for(n.forEach((e=>{d[e.pid]=1/0})),d[e.pid]=0;n.length>0;){n.sort(((e,t)=>d[e.pid]-d[t.pid]));let e=n.shift();a.Mn.filter((t=>t.pid.includes(e.pid)&&t.type===i)).forEach((t=>{t.pid.map((e=>a.hm.find((t=>t.pid===e)))).filter((t=>t!==e)).forEach((i=>{let a=(n=e,r=i,Math.sqrt(Math.pow(n.x-r.x,2)+Math.pow(n.y-r.y,2)));var n,r;d[e.pid]+a<d[i.pid]&&(d[i.pid]=d[e.pid]+a,o[i.pid]=e,l.push(t))}))}))}let r=[],c=t;for(;c!==e;){let e,t=o[c.pid],n=l.find((e=>e.pid.includes(c.pid)&&e.pid.includes(t.pid))),s=10*(d[c.pid]-d[t.pid]);e="train"==i?Math.ceil(s/a.vV):0,r.unshift({distance:Math.ceil(s),min:e,direction:n,from:t,to:c,line:n}),c=t}let s,m=10*d[t.pid];return s="train"==i?Math.ceil(m/a.vV):0,{distance:Math.round(m),min:s,direction:r}}}},386:(e,t,i)=>{i.d(t,{k:()=>n});let a=document.getElementById("directionresults");class n{static clear(){a.innerHTML=""}static add(e){a.insertAdjacentHTML("afterbegin",e)}}},974:(e,t,i)=>{var a=i(799),n=i(932),d=i(645),o=i(565),l=i(386),r=i(446),c=i(349);let s=document.getElementById("routeGuide");class m{static clear(){s.innerHTML=""}static add(e){for(let t=0;t<e.direction.length;t++){const i=e.direction[t];e.direction.length-1!=t?(s.insertAdjacentHTML("afterbegin",r.D.direcitonMainCard(i.min,i.line.name,`${i.from.name} >>> ${i.to.name}`,i.line.color,i.distance)),s.insertAdjacentHTML("afterbegin",r.D.direcitonSubCard(i.to.name,i.line.name,e.direction[t+1].line.name))):s.insertAdjacentHTML("afterbegin",r.D.direcitonMainCard(i.min,i.line.name,`${i.from.name} >>> ${i.to.name}`,i.line.color,i.distance))}}static show(){s.classList.remove("hide")}static hide(){s.classList.add("hide")}}let p,h,y,f=document.getElementById("pointList"),u=document.getElementById("fromPoint"),g=document.getElementById("toPoint"),v=document.getElementById("main"),k=document.getElementById("directions"),_=document.getElementById("information");function x(){(0,a.$9)("Window Resized"),a.Ji.width=2*d.V.OFFSET_X,a.Ji.height=2*d.V.OFFSET_Y,a.Ji.style.width=String(v.clientWidth)+"px",a.Ji.style.height=String(v.clientHeight)+"px",d.V.render()}n.hm.forEach((e=>{f.insertAdjacentHTML("afterbegin",`<option value="${e.name}" id="pin_${e.pid}"></option>`),d.V.addClickEvent(e.x,e.y,10,(()=>{null!=p&&(h=p),p=e,c.D.set(e)}),e.pid),d.V.addPinFlag(e.x,e.y,(0,a.Y3)("station"))})),x(),window.onresize=x,a.Ji.addEventListener("mousedown",d.V.dragstart),a.Ji.addEventListener("mousemove",d.V.dragupdate),a.Ji.addEventListener("mouseup",d.V.dragend),a.Ji.addEventListener("wheel",d.V.wheelzoom),a.Ji.addEventListener("contextmenu",(e=>{}),!1),window.reverseft=function(){let e=u.value,t=g.value;u.value=t,g.value=e},window.outputresult=function(){if(""==u.value||""==g.value)return;let e,t;for(let t=0;t<n.hm.length;t++)if(n.hm[t].name===u.value){e=n.hm[t];break}for(let e=0;e<n.hm.length;e++)if(n.hm[e].name===g.value){t=n.hm[e];break}if(null!=e&&null!=t){let i;l.k.clear(),y=[],i=o.H.get(e,t,"train"),y.push(i);let a="";for(let e of i.direction)a+=e.line.name+"、";l.k.add(r.D.directionResultCard("train",i.min,i.distance,a,"startNavi","0"))}},window.startNavi=function(e){m.clear();let t=y[e];null!=t&&(m.add(t),m.show())},window.closeNavi=function(){m.clear()},window.dismiss_donate=function(){document.getElementById("marumasa_donation")?.remove()},window.tabDir=function(){k.classList.remove("hide"),_.classList.add("hide")},window.tabInfo=function(){_.classList.remove("hide"),k.classList.add("hide")}},349:(e,t,i)=>{i.d(t,{D:()=>a});class a{static info_image=document.getElementById("info_image");static info_description=document.getElementById("info_description");static info_title=document.getElementById("info_title");static set(e){null!=e.src?a.info_image.src=e.src:a.info_image.src="",a.info_title.textContent=e.name,null!=e.description?a.info_description.textContent=e.description:a.info_description.textContent=""}}},645:(e,t,i)=>{i.d(t,{V:()=>r});var a=i(799),n=i(932);let d,o,l;class r{static OFFSET_X=2e3;static OFFSET_Y=2e3;static local_x=0;static local_y=0;static local_size=1;static clickFlag=[];static pinRenderFlag=[];static lineRenderFlag=[];static cx=e=>(r.OFFSET_X+r.local_x+e)*r.local_size;static cy=e=>(r.OFFSET_Y+r.local_y+e)*r.local_size;static render(){(0,a.$9)("Render Updated"),r.clear();for(let e=0;e<n.Mn.length;e++){let t=[],i=[];const a=n.Mn[e];for(let e of a.pid)for(let a=0;a<n.hm.length;a++)n.hm[a].pid==e&&(t.push(n.hm[a].x),i.push(n.hm[a].y));r.lineRender(t,i,a.color)}if(null!=r.pinRenderFlag)for(let e of r.pinRenderFlag)r.pinRender(e.x,e.y,e.r,e.c)}static clear(){(0,a.$9)("Canvas Clear"),a.ej.clearRect(0,0,a.Ji.width,a.Ji.height),a.ej.fillStyle="rgb(230, 230, 230)",a.ej.fillRect(0,0,2*r.OFFSET_X,2*r.OFFSET_Y)}static lineRender(e,t,i){(0,a.$9)("RenderLine",e,t,i),r.strokeWidth(10),r.strokeStyle(i),a.ej.beginPath(),a.ej.moveTo(r.cx(e[0]),r.cy(t[0]));for(let i=1;i<e.length;i++)a.ej.lineTo(r.cx(e[i]),r.cy(t[i]));a.ej.stroke()}static pinRender(e,t,i,n){(0,a.$9)("RenderPin",e,t,i,n),r.fillStyle(n),a.ej.beginPath(),a.ej.arc(r.cx(e),r.cy(t),i,(0,a.QR)(0),(0,a.QR)(360),!1),a.ej.fill(),(0,a.$9)(r.cx(e),r.cy(t),i,(0,a.QR)(0),(0,a.QR)(360),!1)}static dragstart(e){(0,a.$9)("Start Drag"),l=!0,d=e.offsetX,o=e.offsetY}static dragupdate(e){if(l){if((0,a.$9)("Update Drag"),null==d||null==o)return;let t=1/r.local_size;r.local_x+=(e.offsetX-d)*t,r.local_y+=(e.offsetY-o)*t,d=e.offsetX,o=e.offsetY,r.render()}}static dragend(e){(0,a.$9)("End Drag"),l=!1}static wheelzoom(e){(0,a.$9)("Update WheelZoom");let t=-.002*e.deltaY;r.local_size+=t,r.render()}static addClickEvent=(e,t,i,n,d)=>{r.clickFlag.push([e-i,t-i,e+i,t+i,n]),a.Ji.addEventListener("click",(d=>{let o=a.Ji.getBoundingClientRect(),l=(d.clientX-o.left)*(a.Ji.width/o.width),c=(d.clientY-o.top)*(a.Ji.height/o.height);l>r.cx(e-i)&&c>r.cy(t-i)&&l<r.cx(e+i)&&c<r.cy(t+i)&&n(e,t,i)}))};static addPinFlag=(e,t,i)=>r.pinRenderFlag.push({x:e,y:t,r:n.rA,c:i});static strokeStyle=e=>a.ej.strokeStyle=e;static strokeWidth=e=>a.ej.lineWidth=e;static fillStyle=e=>a.ej.fillStyle=e}},446:(e,t,i)=>{i.d(t,{D:()=>a});class a{static directionResultCard(e,t,i,a,n,d=""){let o;switch(e){case"train":o="t";break;case"car":o="c"}return`<div class="di_res"><div><div class="i ${o}"></div><div><h3>${String(t)}分 / ${i}m</h3><p>${a}</p></div></div><div><a href="javascript:${n}(${d});" class="s text">開始</a></div></div>`}static direcitonSubCard(e,t,i){return`<div class="t"><div class="tl"><span>${e}</span></div><div class="mt"><h3>乗り換え</h3><p>${t} >>> ${i}<br><span>駅によっては乗り換えが不可能な場合もございます。ご了承ください。</span></p></div></div>`}static direcitonMainCard(e,t,i,a,n){return`<div class="t"><div class="tl" style="border-right: 0.5vw solid ${a};"><span>${String(e)}分</span></div><div class="mt"><h3>${t} (${String(n)}m)</h3><p>${i}</p></div></div>`}}}},t={};function i(a){var n=t[a];if(void 0!==n)return n.exports;var d=t[a]={exports:{}};return e[a](d,d.exports,i),d.exports}i.d=(e,t)=>{for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i(799),i(932),i(974),i(565),i(386),i(349),i(645),i(446)})();