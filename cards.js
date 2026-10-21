/* Карточки-диктант для чата Claude. Подключается из виджета: перед скриптом задаётся W = [["№","русское","английское"],...].
   Кнопка «Отправить итог в чат» вызывает sendPrompt (есть в виджете чата). */
(function(){
var css='.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;padding:1rem 0}'+
'.k{background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;padding:1rem 1.25rem}'+
'.k.ok{border:2px solid var(--border-success);background:var(--bg-success)}'+
'.k.nr{border:2px solid var(--border-warning);background:var(--bg-warning)}'+
'.k.bad{border:2px solid var(--border-danger);background:var(--bg-danger)}'+
'.n{font-size:12px;color:var(--text-muted)}.r{font-size:17px;font-weight:500;margin:4px 0 8px}.k input{width:100%}'+
'.s{display:flex;align-items:center;gap:8px;margin-top:8px;min-height:30px;flex-wrap:wrap}.m{font-size:13px}'+
'.ok .m{color:var(--text-success)}.nr .m{color:var(--text-warning)}.bad .m{color:var(--text-danger)}'+
'.e{font-weight:500;color:var(--text-accent)}.t{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.c{font-size:13px;color:var(--text-muted)}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var root=document.getElementById('app')||document.body;
root.innerHTML='<div class="t"><button id="all">Проверить все</button><button id="send">Отправить итог в чат ↗</button><span class="c" id="cnt"></span></div><div class="g" id="g"></div>';
function norm(t){return t.toLowerCase().replace(/[’`]/g,"'").replace(/\s+/g,' ').replace(/[.!?]+$/,'').trim()}
function answers(e){var o=[norm(e)],p=e.split(/ \/ |, /);if(p.length>1)p.forEach(function(x){o.push(norm(x))});return o}
function noArt(t){return t.replace(/\b(a|an|the)\b/g,' ').replace(/\s+/g,' ').trim()}
function lev(a,b){var m=a.length,n=b.length,d=[],i,j;for(i=0;i<=m;i++)d[i]=[i];for(j=1;j<=n;j++)d[0][j]=j;for(i=1;i<=m;i++)for(j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function grade(v,e){var al=answers(e);if(al.indexOf(v)>-1)return{r:'ok'};for(var i=0;i<al.length;i++)if(noArt(v)===noArt(al[i])&&noArt(al[i]))return{r:'nr',m:'Почти: проверь артикли.'};for(var j=0;j<al.length;j++)if(al[j].length>=4&&lev(v,al[j])===1)return{r:'nr',m:'Почти: ошибка в одной букве.'};return{r:'bad',m:'Неверно'}}
var g=document.getElementById('g'),C=[];
function upd(){var ok=C.filter(function(o){return o.st==='ok'}).length;document.getElementById('cnt').textContent='Верно: '+ok+' из '+C.length}
function chk(o){var v=norm(o.i.value);if(!v){o.k.className='k';o.m.textContent='';return}
 var r=grade(v,o.e);o.tries++;if(r.r!=='ok')o.typed.push(o.i.value.trim());
 o.st=r.r;o.k.className='k '+r.r;o.m.textContent=r.r==='ok'?'Верно':r.m;upd()}
var WL=[];try{WL=JSON.parse(root.getAttribute('data-w')||'[]')}catch(e){}
if(!WL.length)WL=window.W||[];
WL.forEach(function(x){var k=document.createElement('div');k.className='k';
 k.innerHTML='<div class="n"></div><div class="r"></div><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="по-английски"><div class="s"><span class="m"></span><button class="sh">Показать</button><span class="e"></span></div>';
 k.children[0].textContent='№'+x[0];k.children[1].textContent=x[1];
 var o={k:k,e:x[2],id:x[0],ru:x[1],i:k.querySelector('input'),m:k.querySelector('.m'),sh:k.querySelector('.e'),tries:0,typed:[],st:'',gaveUp:false};
 o.i.addEventListener('keydown',function(ev){if(ev.key==='Enter')chk(o)});
 k.querySelector('.sh').onclick=function(){if(o.sh.textContent){o.sh.textContent=''}else{o.sh.textContent=x[2];o.gaveUp=true}};
 g.appendChild(k);C.push(o)});
document.getElementById('all').onclick=function(){C.forEach(chk)};
document.getElementById('send').onclick=function(){
 C.forEach(function(o){if(o.i.value.trim()&&o.tries===0)chk(o)});
 var d=new Date(),p=function(n){return(n<10?'0':'')+n};
 var L=['Итог диктанта в чате '+p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+d.getFullYear()+', верно '+C.filter(function(o){return o.st==='ok'}).length+' из '+C.length+':'];
 C.forEach(function(o){var s=o.st==='ok'?(o.tries===1?'верно с 1-й попытки':'верно с '+o.tries+'-й попытки'):(o.tries?'не закрыто ('+(o.st==='nr'?'почти':'ошибка')+')':'не отвечал');
  if(o.gaveUp)s+=', смотрел ответ';
  var line='№'+o.id+' '+o.e+' ('+o.ru+'): '+s;if(o.typed.length)line+='; писал: '+o.typed.join(' | ');L.push(line)});
 if(window.sendPrompt)sendPrompt(L.join('\n'))};
upd();
})();
