(()=>{"use strict";var e={228:(e,t,i)=>{i.d(t,{V:()=>d});var a=i(799),o=i(932);let n,r,m;class d{static OFFSET_X=1e3;static OFFSET_Y=1e3;static local_x=0;static local_y=0;static local_size=1;static cx=e=>(d.OFFSET_X+d.local_x+e)*d.local_size;static cy=e=>(d.OFFSET_Y+d.local_y+e)*d.local_size;static render(){(0,a.$9)("Render Updated"),d.clear();for(let e=0;e<o.Mn.length;e++){let t=[],i=[];const a=o.Mn[e];for(let e of a.pid)for(let a=0;a<o.hm.length;a++)o.hm[a].pid==e&&(t.push(o.hm[a].x),i.push(o.hm[a].y));d.lineRender(t,i,a.color)}}static clear(){(0,a.$9)("Canvas Clear"),a.ej.clearRect(0,0,a.Ji.width,a.Ji.height),a.ej.fillStyle="rgb(230, 230, 230)",a.ej.fillRect(0,0,2*d.OFFSET_X,2*d.OFFSET_Y)}static lineRender(e,t,i){(0,a.$9)("RenderLine",e,t,i),d.strokeWidth(5),d.strokeStyle(i),a.ej.beginPath(),a.ej.moveTo(d.cx(e[0]),d.cy(t[0]));for(let i=1;i<e.length;i++)a.ej.lineTo(d.cx(e[i]),d.cy(t[i]));a.ej.stroke()}static dragstart(e){(0,a.$9)("Start Drag"),m=!0,n=e.offsetX,r=e.offsetY}static dragupdate(e){if(m){if((0,a.$9)("Update Drag"),null==n||null==r)return;let t=1/d.local_size;d.local_x+=(e.offsetX-n)*t,d.local_y+=(e.offsetY-r)*t,n=e.offsetX,r=e.offsetY,d.render()}}static dragend(e){(0,a.$9)("End Drag"),m=!1}static wheelzoom(e){(0,a.$9)("Update WheelZoom"),d.local_size+=-.001*e.deltaY,d.render()}static strokeStyle=e=>a.ej.strokeStyle=e;static strokeWidth=e=>a.ej.lineWidth=e}},932:(e,t,i)=>{i.d(t,{Mn:()=>o,hm:()=>a});const a=[{name:"小宮山口駅",x:544,y:-458,pid:"komiya_komiyasanguchi"},{name:"小宮駅",x:517,y:-449,pid:"komiya_komiya"},{name:"小宮格闘センター前駅",x:484,y:-433,pid:"komiya_komiyafightingcenter"},{name:"小宮南駅",x:527,y:-430,pid:"komiya_komiyaminami"},{name:"小宮村駅",x:458,y:-449,pid:"komiya_komiyamura"},{name:"赤羽駅",x:435,y:-449,pid:"akabane_akabane"},{name:"T村駅",x:449,y:-410,pid:"tmura_tmura"},{name:"北小宮駅",x:550,y:-478,pid:"komiya_kitakomiya"},{name:"北平駅",x:550,y:-478,pid:"komiya_kitahira"}],o=[{name:"小宮電鉄線(テストデータ1)",color:"orange",pid:["komiya_komiyafightingcenter","komiya_komiya","komiya_komiyasanguchi","komiya_kitakomiya"],lid:"komiya_1",type:"train"},{name:"小宮電鉄線(テストデータ2)",color:"orange",pid:["komiya_komiyaminami","komiya_komiya","komiya_komiyamura","akabane_akabane","tmura_tmura"],lid:"komiya_2",type:"train"},{name:"RR秘境線(テストデータ)",color:"yellow",pid:["komiya_komiyaminami","komiya_komiyasanguchi","komiya_kitahira"],lid:"komiya_2",type:"train"}]},799:(e,t,i)=>{i.d(t,{$9:()=>a,Ji:()=>o,ej:()=>n});let a=console.log;console.error;const o=document.getElementById("canvas"),n=o.getContext("2d")},156:(e,t,i)=>{var a=i(799),o=i(932),n=i(228);let r=document.getElementById("pointList"),m=(document.getElementById("directionresults"),document.getElementById("fromPoint")),d=document.getElementById("toPoint"),l=document.getElementById("main"),s=document.getElementById("directions"),c=document.getElementById("information");function y(){(0,a.$9)("Window Resized"),a.Ji.width=2*n.V.OFFSET_X,a.Ji.height=2*n.V.OFFSET_Y,a.Ji.style.width=String(l.clientWidth)+"px",a.Ji.style.height=String(l.clientHeight)+"px",n.V.render()}y(),o.hm.forEach(((e,t,i)=>{r.insertAdjacentHTML("afterbegin",`<option value="${e.name}" id="pin_${e.pid}"></option>`)})),window.onresize=y,a.Ji.addEventListener("mousedown",n.V.dragstart),a.Ji.addEventListener("mousemove",n.V.dragupdate),a.Ji.addEventListener("mouseup",n.V.dragend),a.Ji.addEventListener("wheel",n.V.wheelzoom),window.reverseft=function(){let e=m.value,t=d.value;m.value=t,d.value=e},window.outputresult=function(){if(""==m.value||""==d.value)return;let e,t;for(let t=0;t<o.hm.length;t++)if(o.hm[t].name===m.value){e=o.hm[t].pid;break}for(let e=0;e<o.hm.length;e++)if(o.hm[e].name===d.value){t=o.hm[e].pid;break}},window.startNavi=function(){},window.dismiss_donate=function(){document.getElementById("marumasa_donation")?.remove()},window.tabDir=function(){s.classList.remove("hide"),c.classList.add("hide")},window.tabInfo=function(){c.classList.remove("hide"),s.classList.add("hide")}}},t={};function i(a){var o=t[a];if(void 0!==o)return o.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,i),n.exports}i.d=(e,t)=>{for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i(799),i(932),i(156),i(228)})();