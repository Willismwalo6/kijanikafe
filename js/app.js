(function(){
const K=window.KK,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const fmt=n=>'KSh '+n.toLocaleString('en-KE');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* cart storage */
let cart=[];try{cart=JSON.parse(localStorage.getItem('kk_cart')||'[]')}catch(e){}
const save=()=>{try{localStorage.setItem('kk_cart',JSON.stringify(cart))}catch(e){}count();document.dispatchEvent(new Event('cart'))};
const count=()=>$$('[data-count]').forEach(e=>e.textContent=cart.reduce((a,b)=>a+b.q,0));
function toast(t){let e=$('.toast');if(!e){e=document.createElement('div');e.className='toast';e.setAttribute('role','status');document.body.append(e)}e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),1800)}
function addItem(id,name,label,price){const k=id+'|'+label,f=cart.find(c=>c.k===k);f?f.q++:cart.push({k,name,label,price,q:1});save();toast('Added: '+name)}
const wa=t=>'https://wa.me/'+K.wa+'?text='+encodeURIComponent(t);
/* nav + contact fills */
const nb=$('.burger'),nv=$('nav');nb&&nb.addEventListener('click',()=>{const o=nv.classList.toggle('open');nb.setAttribute('aria-expanded',o)});
$$('[data-wa]').forEach(a=>a.href=wa('Hello Kijani Kafe, I have a question.'));
$$('[data-tel]').forEach(a=>a.href='tel:'+K.phone.replace(/\s/g,''));
$$('[data-mail]').forEach(a=>a.href='mailto:'+K.email);
$$('[data-map]').forEach(a=>a.href=K.maps);
$$('[data-hours]').forEach(e=>{e.innerHTML=K.hours.length?'<table class="hours">'+K.hours.map(h=>`<tr><td>${esc(h[0])}</td><td>${esc(h[1])}</td></tr>`).join('')+'</table>':'<p>Call or WhatsApp us for today\'s opening hours.</p>'});
$$('[data-social]').forEach(e=>{e.innerHTML=Object.entries(K.social).map(([n,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join(' · ')});
const bar=document.createElement('a');bar.className='obar';bar.setAttribute('aria-live','polite');
 const onOrder=!!document.getElementById('cartpanel');if($('#menu')){bar.href=onOrder?'#cartpanel':'order.html';document.body.append(bar);
 const ub=()=>{const n=cart.reduce((x,c)=>x+c.q,0),t=cart.reduce((x,c)=>x+c.q*c.price,0);bar.classList.toggle('has',n>0);document.body.classList.toggle('hasbar',n>0);bar.innerHTML=`<span>${onOrder?'Go to your order':'View your order'} · ${n} item${n===1?'':'s'}</span><b>${fmt(t)}</b>`};
 document.addEventListener('cart',ub);ub()}
count();
/* scroll reveal */
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12}):null;
$$('.rv').forEach(e=>io?io.observe(e):e.classList.add('in'));
/* hero slideshow */
const hero=$('.hero');if(hero){const sl=$$('.slide',hero),dots=$('.dots',hero);let i=0,t;
 sl.forEach((_,n)=>{const b=document.createElement('button');b.setAttribute('aria-label','Show photo '+(n+1));b.onclick=()=>{go(n);run()};dots.append(b)});
 const go=n=>{i=n;sl.forEach((s,x)=>s.classList.toggle('on',x===n));$$('button',dots).forEach((b,x)=>b.setAttribute('aria-current',x===n))};
 const run=()=>{clearInterval(t);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)t=setInterval(()=>go((i+1)%sl.length),6000)};
 go(0);run();hero.addEventListener('mouseenter',()=>clearInterval(t));hero.addEventListener('mouseleave',run)}
/* menu */
const M=window.MENU||[],root=$('#menu');
if(root){const order=root.dataset.mode==='order';let q='',grp='all',cat='all',best=false;
 const tabs=$('#tabs'),out=$('#mout'),qs=$('#q');
 tabs.innerHTML=`<button class="tab" role="tab" aria-selected="true" data-c="all">All</button>`+M.map(c=>`<button class="tab" role="tab" aria-selected="false" data-c="${c.id}">${esc(c.t)}</button>`).join('');
 const item=(c,it)=>`<div class="mi"><div style="display:flex;gap:14px;align-items:center;min-width:0">${it.img?`<img src="${it.img}" alt="${esc(it.n)}" loading="lazy" width="78" height="78">`:''}<div><span class="nm">${esc(it.n)}</span>${it.best?'<span class="badge">House favourite</span>':''}${it.note?`<small>${esc(it.note)}</small>`:''}</div></div><div class="buy">${it.v.map(v=>`<button class="add" data-id="${it.id}" data-l="${esc(v.l)}" data-p="${v.p}" aria-label="Add ${esc(it.n)} ${esc(v.l)} for ${v.p} shillings"><b>${fmt(v.p).replace('KSh ','')}</b><small>${v.l||'Add'}</small></button>`).join('')}</div></div>`;
 const draw=()=>{const s=q.toLowerCase();let h='',n=0;
  M.forEach(c=>{if(cat!=='all'&&c.id!==cat)return;if(grp!=='all'&&c.g!==grp)return;
   const its=c.items.filter(it=>(!best||it.best)&&(!s||(it.n+' '+c.t+' '+(it.note||'')).toLowerCase().includes(s)));if(!its.length)return;n+=its.length;
   h+=`<div class="mcat" id="${c.id}"><div><h2>${esc(c.t)}</h2><p>${esc(c.blurb||'')}</p></div><div class="items">${its.map(it=>item(c,it)).join('')}</div></div>`});
  out.innerHTML=h||'<p class="empty">No dishes match. Try a different word or clear the filters.</p>';$('#mcount').textContent=n+' items'};
 tabs.onclick=e=>{const b=e.target.closest('.tab');if(!b)return;cat=b.dataset.c;$$('.tab',tabs).forEach(x=>x.setAttribute('aria-selected',x===b));draw()};
 qs.oninput=()=>{q=qs.value.trim();draw()};
 $$('.chip').forEach(b=>b.onclick=()=>{if(b.dataset.g){grp=b.dataset.g;$$('.chip[data-g]').forEach(x=>x.setAttribute('aria-pressed',x===b))}else{best=!best;b.setAttribute('aria-pressed',best)}draw()});
 out.addEventListener('click',e=>{const b=e.target.closest('.add');if(!b)return;const it=M.flatMap(c=>c.items).find(x=>x.id===b.dataset.id);addItem(it.id,it.n,b.dataset.l,+b.dataset.p);b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')});
 draw();if(location.hash){const t=document.getElementById(location.hash.slice(1));t&&t.scrollIntoView()}}
/* cart + checkout */
const cl=$('#cartlines');
if(cl){const sub=$('#sub'),form=$('#orderform'),ok=$('#ordok');
 const draw=()=>{cl.innerHTML=cart.length?cart.map((c,i)=>`<div class="line-i"><div><b>${esc(c.name)}</b>${c.label?` <small>(${esc(c.label)})</small>`:''}<br><small>${fmt(c.price)} each</small></div><div class="price">${fmt(c.price*c.q)}</div><div class="qty" role="group" aria-label="Quantity of ${esc(c.name)}"><button data-a="-" data-i="${i}" aria-label="Decrease">−</button><span>${c.q}</span><button data-a="+" data-i="${i}" aria-label="Increase">+</button></div><button class="rm" data-a="x" data-i="${i}" style="justify-self:end">Remove</button></div>`).join(''):'<p class="empty">Your order is empty. Pick dishes from the menu on the left.</p>';
  sub.textContent=fmt(cart.reduce((a,c)=>a+c.price*c.q,0))};
 cl.onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;const i=+b.dataset.i,a=b.dataset.a;if(a==='+')cart[i].q++;else if(a==='-'){cart[i].q--;if(cart[i].q<1)cart.splice(i,1)}else cart.splice(i,1);save()};
 document.addEventListener('cart',draw);draw();
 const tog=()=>{const d=form.type.value==='Delivery';$('#addrw').hidden=!d;form.address.required=d};
 $$('input[name=type]',form).forEach(r=>r.onchange=tog);tog();
 form.onsubmit=async e=>{e.preventDefault();if(!cart.length){toast('Add at least one item first');return}
  const f=new FormData(form),tot=cart.reduce((a,c)=>a+c.price*c.q,0);
  const lines=cart.map(c=>`${c.q} x ${c.name}${c.label?' ('+c.label+')':''} - ${fmt(c.price*c.q)}`);
  const msg=['*New order - Kijani Kafe*','','Name: '+f.get('name'),'Phone: '+f.get('phone'),'Order type: '+f.get('type'),f.get('type')==='Delivery'?'Delivery address: '+f.get('address'):'','When: '+(f.get('when')||'As soon as possible'),'','*Items*',...lines,'','Subtotal: '+fmt(tot)+(f.get('type')==='Delivery'?' (delivery fee to be confirmed)':''),f.get('notes')?'Instructions: '+f.get('notes'):'','','This is an order request. It is confirmed once Kijani Kafe replies.'].filter((x,i,a)=>x!==''||a[i-1]!=='').join('\n');
  await post({form:'order',...Object.fromEntries(f),items:lines.join('; '),subtotal:tot});
  window.open(wa(msg),'_blank','noopener');ok.classList.add('show');ok.focus();cart=[];save()};}
async function post(d){if(!K.formEndpoint)return;try{await fetch(K.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)})}catch(e){}}
/* reservation + event forms */
$$('form[data-req]').forEach(form=>{const d=$('input[type=date]',form);if(d)d.min=new Date().toISOString().slice(0,10);
 form.onsubmit=async e=>{e.preventDefault();const f=new FormData(form),kind=form.dataset.req,rows=[...f.entries()].filter(([k,v])=>v).map(([k,v])=>`${form.querySelector(`[name=${k}]`).dataset.l||k}: ${v}`);
  const msg=`*${kind==='table'?'Table booking REQUEST':'Event ENQUIRY'} - Kijani Kafe*\n\n${rows.join('\n')}\n\nThis is a request only. Please confirm availability.`;
  await post({form:kind,...Object.fromEntries(f)});window.open(wa(msg),'_blank','noopener');const ok=$('.ok',form.parentNode);ok.classList.add('show');ok.focus();form.reset()}});
/* gallery lightbox */
const gal=$$('.gal button');if(gal.length){const lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Photo viewer');lb.innerHTML='<button class="x" aria-label="Close">×</button><button class="p" aria-label="Previous">‹</button><img alt=""><button class="n" aria-label="Next">›</button>';document.body.append(lb);let vis=[],ix=0,last;
 const show=n=>{ix=(n+vis.length)%vis.length;const im=$('img',vis[ix]);$('img',lb).src=im.dataset.full||im.src;$('img',lb).alt=im.alt};
 const open=b=>{vis=gal.filter(x=>!x.hidden);last=b;show(vis.indexOf(b));lb.classList.add('on');$('.x',lb).focus()},close=()=>{lb.classList.remove('on');last&&last.focus()};
 gal.forEach(b=>b.onclick=()=>open(b));lb.onclick=e=>{if(e.target===lb||e.target.classList.contains('x'))close();if(e.target.classList.contains('p'))show(ix-1);if(e.target.classList.contains('n'))show(ix+1)};
 document.addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(ix-1);if(e.key==='ArrowRight')show(ix+1)});
 $$('[data-gf]').forEach(c=>c.onclick=()=>{$$('[data-gf]').forEach(x=>x.setAttribute('aria-pressed',x===c));gal.forEach(b=>b.hidden=c.dataset.gf!=='all'&&b.dataset.t!==c.dataset.gf)})}
/* reviews */
const R=window.REVIEWS||[];$$('[data-reviews]').forEach(rl=>{rl.innerHTML=R.length?R.map(r=>`<figure class="card" style="margin:0"><div class="tx"><div class="stars" role="img" aria-label="${r.s} out of 5">${'★'.repeat(r.s)}${'☆'.repeat(5-r.s)}</div><h3 style="margin:.5em 0 .3em;font-size:1.15rem">${esc(r.h)}</h3><p>“${esc(r.t)}”</p><b>${esc(r.n)}</b><br><small style="color:var(--muted)">${esc(r.r)}</small></div></figure>`).join(''):'<div class="panel center" style="grid-column:1/-1"><h3>Be the first to review us</h3><p>Share your experience below or on Google.</p></div>'});
 {const rf=$('#reviewform');rf&&(rf.onsubmit=e=>{e.preventDefault();const f=new FormData(rf);window.open(wa(`*Review for Kijani Kafe*\nName: ${f.get('name')}\nRating: ${f.get('rating')}/5\n${f.get('text')}`),'_blank','noopener');$('.ok',rf.parentNode).classList.add('show');rf.reset()})}
})();
