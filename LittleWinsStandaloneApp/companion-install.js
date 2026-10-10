(()=>{
let deferredPrompt=null;
const installed=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const buttons=()=>document.querySelectorAll('[data-install-companion]');
function update(){buttons().forEach(b=>{b.textContent=installed()?'Companion App Installed':'Download Little Wins Companion App';b.disabled=installed();});}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;update();});
window.addEventListener('appinstalled',()=>{deferredPrompt=null;buttons().forEach(b=>{b.textContent='Companion App Installed';b.disabled=true;});});
function instructions(){
let d=document.getElementById('companion-install-dialog');
if(!d){d=document.createElement('dialog');d.id='companion-install-dialog';d.setAttribute('aria-labelledby','companion-install-title');
d.innerHTML='<h2 id="companion-install-title">Download Little Wins Parenting Companion</h2><p>Add Little Wins Parenting Companion to your Home Screen for an easy way back to your family’s day.</p><h3>iPhone or iPad</h3><ol><li>Open the companion app in Safari.</li><li>Tap Share, then Add to Home Screen. If needed, choose More to find Share.</li><li>Turn on Open as Web App if shown, then tap Add.</li></ol><h3>Android or Computer</h3><p>Open the companion app in Chrome or Edge. Use the browser’s Install App or Add to Home Screen option. If the option is unavailable, bookmark the companion app for now.</p><p>Internet access and the site’s existing sign-in requirements still apply.</p><div class="install-dialog-actions"><a class="button" id="install-open-companion">Open Companion App</a><button class="button light" type="button" data-close-install>Close</button></div>';
document.body.appendChild(d);d.querySelector('#install-open-companion').href="/index.html";d.querySelector('[data-close-install]').onclick=()=>d.close();}
d.showModal();
}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-install-companion]');if(!b)return;
if(!deferredPrompt){instructions();return;}
const prompt=deferredPrompt;deferredPrompt=null;b.disabled=true;
try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==='accepted'){b.textContent='Installation Requested';}else{update();}}catch{instructions();update();}finally{if(!installed()&&b.textContent!=='Installation Requested')b.disabled=false;}
});
if('serviceWorker' in navigator)navigator.serviceWorker.register('/companion-sw.js',{scope:'/'}).catch(()=>{});
update();
})();
