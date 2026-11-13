/* Карточки-диктант для чата Claude. Подключается из виджета: перед скриптом задаётся W = [["№","русское","английское"],...].
   Кнопка «Отправить итог в чат» вызывает sendPrompt (есть в виджете чата). */
(function(){
var AUD=["abroad", "accessibility.wav", "accident", "accommodation.wav", "acquaintance", "actually", "adaptation.wav", "addict.wav", "adjective", "advantage", "adverb", "affordable.wav", "agree", "although", "am", "amoral.wav", "appear", "appoint.wav", "art", "ask", "assemble", "attempt", "attention", "attic.wav", "automate", "awake", "award", "background", "bad", "badly", "barely.wav", "basement", "basic.wav", "bathroom", "beard", "being", "beneficial.wav", "benefit", "bill", "billiard.wav", "blinds.wav", "block", "borrow", "box", "breath", "breathe", "bring", "buckwheat", "cameraman.wav", "canteen.wav", "cast", "cause", "century", "certain", "charming", "cheating.wav", "chemist", "chemistry", "choice", "church", "clothes", "coast", "coat", "colleague", "comma", "commitment.wav", "conditions", "consequences", "contain.wav", "container.wav", "control", "conversation", "cottage", "countable.wav", "couple", "create", "cunning", "cupboard", "cure", "curtains", "date", "debt", "deceive", "definitely", "delay", "delicious", "describe", "destroy", "develop", "direct", "directed", "direction", "disadvantage.wav", "disappointed", "disfigure.wav", "disgusting", "distract.wav", "dormitory.wav", "downstairs", "drawers.wav", "drive", "during", "each", "earlier", "earn", "earphone.wav", "enemy", "enjoy", "enough", "equip.wav", "equipment", "especially", "even", "exclude", "exclusion", "exhaust", "exhausted", "exist", "exit", "expulsion.wav", "extend.wav", "fail", "failure.wav", "favorite", "few", "fiber", "films", "flexibility", "flexible", "floor", "follow", "food", "forger.wav", "found", "freezer.wav", "fridge", "friendly", "fully", "furniture", "genre", "get", "gift", "give", "glasses", "glove", "govern", "government", "half", "hall", "ham", "harm", "health", "heartburn.wav", "heat", "hidden", "hit", "hollywood.wav", "hometown.wav", "honor", "hope", "hygiene", "immediate", "immediately", "importance", "important", "impossible", "impress.wav", "impression", "impressive", "inheritance", "inspiration", "inspire.wav", "inspiring.wav", "instead", "involve.wav", "issue", "judo.wav", "keep", "kick", "kind", "kindness", "lamb", "landlord.wav", "landscape.wav", "laptop", "last", "late", "laugh", "leather", "leave", "lend", "letters", "list", "loan", "location", "lonely", "lungs", "manage", "may.wav", "medicine", "meet", "mentor.wav", "menu", "might", "miss", "modern", "movies.wav", "muscles", "neater", "necessary", "neighbour", "neighbourhood", "nominated.wav", "noodles", "notice", "notion", "noun.wav", "nurse", "oatmeal.wav", "obey", "observation", "obvious", "offer", "operator.wav", "option", "orally.wav", "oscar.wav", "page", "pain", "peace", "peers.wav", "perceive", "perhaps", "personal", "persuade", "piece", "plead", "plot", "pm.wav", "poems", "poor", "popcorn", "pork", "porpoise", "posse.wav", "possess", "possible", "possibly", "postpone", "potatoes.wav", "power", "powerful", "predict", "prefer", "preferable", "pregnant", "preposition", "prescribe.wav", "producer.wav", "promise", "promising.wav", "proper", "properly", "proposal.wav", "protected", "proud", "provide", "purpose", "push", "quiet", "quite", "quote", "race", "ransom.wav", "rave.wav", "reasons", "receipt", "receive", "recycling", "refuse", "regret", "relate", "related", "relatives", "relevant.wav", "remember", "remind.wav", "restaurant.wav", "reviews", "ruin", "rule", "run", "sail", "sales", "same", "scenes", "schedule", "script", "sentence", "set", "similar", "sink", "sofa", "some", "sometimes", "spell", "spelling", "sphere", "staff", "steak", "steal.wav", "still", "storage", "suggest", "sunset", "supplies", "supporting", "surgeon.wav", "surname", "taste", "tasty", "temple", "term", "thick", "thought", "thoughts", "threat", "throw", "till", "together", "tonight", "treat", "treatment", "tremble.wav", "true", "tube", "unkind.wav", "unlike", "up-to-date", "upbringing.wav", "upstairs", "use", "useful", "useless", "vacancy", "vacation", "value", "verb", "view", "violent", "waiter", "wardrobe", "warm-up", "way", "wear", "wedding", "weekday", "worse", "wound.wav"];
var css='.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;padding:1rem 0}'+
'.k{background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;padding:1rem 1.25rem}'+
'.k.ok{border:2px solid var(--border-success);background:var(--bg-success)}'+
'.k.nr{border:2px solid var(--border-warning);background:var(--bg-warning)}'+
'.k.bad{border:2px solid var(--border-danger);background:var(--bg-danger)}'+
'.n{font-size:12px;color:var(--text-muted)}.r{font-size:17px;font-weight:500;margin:4px 0 8px}.k input{width:100%}'+
'.s{display:flex;align-items:center;gap:8px;margin-top:8px;min-height:30px;flex-wrap:wrap}.m{font-size:13px}'+
'.ok .m{color:var(--text-success)}.nr .m{color:var(--text-warning)}.bad .m{color:var(--text-danger)}'+
'.fam{background:var(--surface-2);border:0.5px solid var(--border);border-radius:12px;padding:1rem 1.25rem;display:flex;flex-direction:column;gap:6px}.fh{font-size:12px;color:var(--text-muted)}.fam .n{display:none}.fam .k{padding:.5rem .6rem;border-radius:10px}.fam .k:not(.ok):not(.nr):not(.bad){background:none;border-color:transparent}.fam .r{font-size:15px;margin:0 0 6px}.fam .s{margin-top:4px;min-height:0}'+
'.e{font-weight:500;color:var(--text-accent)}.t{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.c{font-size:13px;color:var(--text-muted)}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var root=document.getElementById('app')||document.body;var AUTO=!!(root.getAttribute&&root.getAttribute('data-sound')==='1');
root.innerHTML='<div class="t"><button id="all">Проверить все</button><button id="send">Отправить итог в чат ↗</button><span class="c" id="cnt"></span></div><div class="g" id="g"></div>';
var VOICE=null;
function pickVoice(){try{var vs=speechSynthesis.getVoices().filter(function(v){return /^en[-_](GB|US)/i.test(v.lang)});var best=vs.filter(function(v){return /premium|enhanced/i.test(v.name)});VOICE=(best[0]||vs.filter(function(v){return /^en[-_]GB/i.test(v.lang)})[0]||vs[0])||null}catch(e){}}
try{if(window.speechSynthesis){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}}catch(e){}
var BASE=(function(){try{var c=document.currentScript&&document.currentScript.src;return c?c.replace(/cards\.js(\?.*)?$/,''):''}catch(e){return ''}})();
function tts(t){try{if(!window.speechSynthesis)return;var u=new SpeechSynthesisUtterance(t);if(VOICE){u.voice=VOICE;u.lang=VOICE.lang}u.rate=0.9;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function say(t,auto){if(auto&&!AUTO)return;var w=String(t).trim(),k=w.toLowerCase();var fn=null;if(BASE&&typeof AUD!=='undefined'){if(AUD.indexOf(k)>=0)fn=k+'.ogg';else if(AUD.indexOf(k+'.wav')>=0)fn=k+'.wav'}if(!fn){tts(w);return}try{var au=new Audio(BASE+'audio/'+fn),done=false;au.onerror=function(){if(!done){done=true;tts(w)}};au.play().catch(function(){if(!done){done=true;tts(w)}})}catch(e){tts(w)}}
function rec(){}
function norm(t){return t.toLowerCase().replace(/[’`]/g,"'").replace(/\s+/g,' ').replace(/[.!?]+$/,'').trim()}
function answers(e){var o=[norm(e)],p=e.split(/ \/ |, /);if(p.length>1)p.forEach(function(x){o.push(norm(x))});var m=e.match(/^(.*?)(\S+)\/(\S+)(.*)$/);if(m){[m[1]+m[2]+m[4],m[1]+m[3]+m[4],m[1]+m[3]+'/'+m[2]+m[4],m[1]+m[2]+' or '+m[3]+m[4],m[1]+m[2]+' and '+m[3]+m[4]].forEach(function(x){o.push(norm(x))})}return o}
function noArt(t){return t.replace(/\b(a|an|the)\b/g,' ').replace(/\s+/g,' ').trim()}
function lev(a,b){var m=a.length,n=b.length,d=[],i,j;for(i=0;i<=m;i++)d[i]=[i];for(j=1;j<=n;j++)d[0][j]=j;for(i=1;i<=m;i++)for(j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function grade(v,e){var al=answers(e);if(al.indexOf(v)>-1)return{r:'ok'};for(var i=0;i<al.length;i++)if(noArt(v)===noArt(al[i])&&noArt(al[i]))return{r:'nr',m:'Почти: проверь артикли.'};for(var j=0;j<al.length;j++)if(al[j].length>=4&&lev(v,al[j])===1)return{r:'nr',m:'Почти: ошибка в одной букве.'};return{r:'bad',m:'Неверно'}}
var g=document.getElementById('g'),C=[];
function upd(){var ok=C.filter(function(o){return o.st==='ok'}).length;document.getElementById('cnt').textContent='Верно: '+ok+' из '+C.length}
function chk(o){var v=norm(o.i.value);if(!v){o.k.className='k';o.m.textContent='';return}
 var r=grade(v,o.e);o.tries++;if(r.r!=='ok')o.typed.push(o.i.value.trim());
 o.st=r.r;o.k.className='k '+r.r;if(r.r==='ok')say(o.e,1);o.m.textContent=r.r==='ok'?'Верно':r.m;upd()}
var WL=[];try{WL=JSON.parse(root.getAttribute('data-w')||'[]')}catch(e){}
if(!WL.length)WL=window.W||[];
function mk(x,par){var k=document.createElement('div');k.className='k';
 k.innerHTML='<div class="n"></div><div class="r"></div><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="по-английски"><div class="s"><span class="m"></span><button class="sh">Показать</button><button class="sp" title="Произнести">🔊</button><span class="e"></span></div>';
 k.children[0].textContent='№'+x[0];k.children[1].textContent=x[1];
 var o={k:k,e:x[2],id:x[0],ru:x[1],i:k.querySelector('input'),m:k.querySelector('.m'),sh:k.querySelector('.e'),tries:0,typed:[],st:'',gaveUp:false,peekAt:-1};
 o.i.addEventListener('keydown',function(ev){if(ev.key==='Enter')chk(o)});
 k.querySelector('.sp').onclick=function(){say(x[2])};
 k.querySelector('.sh').onclick=function(){if(o.sh.textContent){o.sh.textContent=''}else{o.sh.textContent=x[2];say(x[2],1);if(!o.gaveUp){o.peekAt=o.tries;o.typed.push('[смотрел]')}o.gaveUp=true}};
 par.appendChild(k);C.push(o);rec(String(x[2]).trim())}
WL.forEach(function(x){if(Array.isArray(x[2])){var f=document.createElement('div');f.className='fam';var h=document.createElement('div');h.className='fh';h.textContent='№'+x[0]+' · семья слов';f.appendChild(h);x[2].forEach(function(e,j){mk([x[0]+'.'+(j+1),x[1][j],e],f)});g.appendChild(f)}else mk(x,g)});
document.getElementById('all').onclick=function(){C.forEach(chk)};
document.getElementById('send').onclick=function(){
 C.forEach(function(o){if(o.i.value.trim()&&o.tries===0)chk(o)});
 var d=new Date(),p=function(n){return(n<10?'0':'')+n};
 var L=['Итог диктанта в чате '+p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+d.getFullYear()+', верно '+C.filter(function(o){return o.st==='ok'}).length+' из '+C.length+':'];
 C.forEach(function(o){var s=o.st==='ok'?(o.tries===1?'верно с 1-й попытки':'верно с '+o.tries+'-й попытки'):(o.tries?'не закрыто ('+(o.st==='nr'?'почти':'ошибка')+')':'не отвечал');
  if(o.gaveUp)s+=o.peekAt>0?', смотрел ответ после '+o.peekAt+'-й попытки':', смотрел ответ сразу, до попыток';
  var line='№'+o.id+' '+o.e+' ('+o.ru+'): '+s;if(o.typed.length)line+='; писал: '+o.typed.join(' | ');L.push(line)});
 if(window.sendPrompt)sendPrompt(L.join('\n'))};
upd();
})();
