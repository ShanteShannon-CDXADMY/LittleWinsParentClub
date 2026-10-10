"use strict";
const levels={free:0,planner:1,recharge:2,circle:3};
const summaries={free:'The weekly parenting digest.',planner:'The digest, plus an activity and adaptable routine.',recharge:'Family planning extras, plus care for the grown-ups.',circle:'All extras, plus a practical way to coordinate caregivers.'};
const sections=[
{level:1,title:'Family Planner · one shared activity',text:'Choose a five-minute story together. Young children can draw a character; older children can invent the next scene. Let everyone participate at their own pace.'},
{level:1,title:'Family Planner · a routine to try',text:'After breakfast: check today’s supplies together. After coming home: reconnect before starting the next task. Before bed: prepare one essential for tomorrow.'},
{level:2,title:'Parent Recharge · a moment for you',text:'Take one quiet minute while children are safely cared for. Notice how you feel, then choose one task that can wait.'},
{level:2,title:'Parent Recharge · journal prompt',text:'What felt easier this week? What is one specific kind of help I could ask for? Write a sentence in your journal.'},
{level:3,title:'Family Circle · caregiver check-in',text:'Agree who is handling one routine, what supplies they need, and when to check in. Ask each other what support would help. Confirm the plan together instead of assuming.'}
];
const select=document.getElementById('newsletterPackage'),extras=document.getElementById('newsletterExtras');
function render(){const value=Object.hasOwn(levels,select.value)?select.value:'free';document.getElementById('packageSummary').textContent=summaries[value];extras.replaceChildren();for(const section of sections.filter(s=>s.level<=levels[value])){const h=document.createElement('h3'),p=document.createElement('p');h.textContent=section.title;p.textContent=section.text;extras.append(h,p);}if(levels[value]>=2){const a=document.createElement('a');a.href='parent-tools.html';a.textContent='Open your journal';extras.append(a);}}
select.addEventListener('change',render);render();
