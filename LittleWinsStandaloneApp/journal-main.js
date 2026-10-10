(function(){
"use strict";
const byId=id=>document.getElementById(id), key='littleWins.journal.v1';
let entries={};try{const parsed=JSON.parse(localStorage.getItem(key));if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))for(const [date,value] of Object.entries(parsed))if(/^\d{4}-\d{2}-\d{2}$/.test(date)&&typeof value==='string')entries[date]=value;}catch{}
const now=new Date();byId('entryDate').value=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
function loadEntry(){byId('journal').value=entries[byId('entryDate').value]||'';byId('journalStatus').textContent='';}
byId('entryDate').onchange=loadEntry;loadEntry();
function persist(){try{localStorage.setItem(key,JSON.stringify(entries));return true;}catch{byId('journalStatus').textContent='Unable to save. Download your journal before leaving this page.';return false;}}
byId('journalForm').onsubmit=e=>{e.preventDefault();entries[byId('entryDate').value]=byId('journal').value;if(persist())byId('journalStatus').textContent='Saved on this device.';};
byId('deleteEntry').onclick=()=>{if(!confirm('Delete the entry for '+byId('entryDate').value+'?'))return;delete entries[byId('entryDate').value];if(persist()){loadEntry();byId('journalStatus').textContent='Entry deleted.';}};
function download(name,text){const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
byId('exportJournal').onclick=()=>{const copy={...entries,[byId('entryDate').value]:byId('journal').value};download('little-wins-journal.txt',Object.keys(copy).sort().map(d=>d+'\n'+copy[d]).join('\n\n'));};

})();
