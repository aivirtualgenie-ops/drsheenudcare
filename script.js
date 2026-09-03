document.getElementById('year').textContent=new Date().getFullYear();
const btn=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
if(btn)btn.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));