import {articles,recipes} from './companion-catalog.js';
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
export async function companionAPI(req,env){
 const user=req.headers.get('oai-authenticated-user-id');if(!user)return json({error:'Sign in to save your companion plan and Favorites.'},401);
 const db=env.DB;if(!db)return json({error:'Your saved plan is unavailable. Please try again.'},503);
 const path=new URL(req.url).pathname;let input;
 if(req.method!=='GET'){
  if(!['POST','DELETE','PUT'].includes(req.method))return json({error:'Method not allowed'},405);
  if(req.headers.get('Origin')!==new URL(req.url).origin)return json({error:'Reload this page and try again.'},403);
  if(!req.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'JSON required'},415);
  const raw=await req.text();if(raw.length>200000)return json({error:'This plan is too large to save. Remove older notes or completed tasks.'},413);
  try{input=JSON.parse(raw)}catch{return json({error:'Invalid request'},400)}
  if(!input||typeof input!=='object'||Array.isArray(input))return json({error:'Invalid request'},400);
 }
 if(path==='/api/companion/plan'){
  if(req.method==='GET'){const row=await db.prepare('SELECT data,version FROM companion_plans WHERE user_id=?').bind(user).first();return json(row?{accountKey:user,data:JSON.parse(row.data),version:row.version}:{accountKey:user,data:null,version:0});}
  if(req.method!=='PUT'||!Number.isInteger(input.version)||input.version<0||!input.data||typeof input.data!=='object'||Array.isArray(input.data)||!Array.isArray(input.data.children)||!input.data.lists||!input.data.checks)return json({error:'Invalid companion plan'},400);
  const data=JSON.stringify(input.data);if(data.length>190000)return json({error:'This plan is too large to save.'},413);
  const r=input.version===0?await db.prepare('INSERT OR IGNORE INTO companion_plans (user_id,data,version,updated) VALUES (?,?,1,?)').bind(user,data,Date.now()).run():await db.prepare('UPDATE companion_plans SET data=?,version=version+1,updated=? WHERE user_id=? AND version=?').bind(data,Date.now(),user,input.version).run();
  if(r.meta?.changes!==1)return json({error:'Your plan changed in another window or device. Your draft is still here. Reload to load the saved version before making more changes.'},409);
  return json({version:input.version+1});
 }
 if(path==='/api/articles/favorites'){
  if(req.method!=='GET'){
   if(!['POST','DELETE'].includes(req.method)||!articles.some(a=>a.slug===input.articleId))return json({error:'Choose an article from this blog'},400);
   if(req.method==='POST')await db.prepare('INSERT OR IGNORE INTO article_favorites (user_id,article_id,created) VALUES (?,?,?)').bind(user,input.articleId,Date.now()).run();
   else await db.prepare('DELETE FROM article_favorites WHERE user_id=? AND article_id=?').bind(user,input.articleId).run();
  }
  const r=await db.prepare('SELECT article_id FROM article_favorites WHERE user_id=? ORDER BY created DESC').bind(user).all();return json({items:r.results.map(x=>x.article_id)});
 }
 if(path==='/api/favorites'&&req.method==='GET'){
  const results=await Promise.all([db.prepare('SELECT article_id,created FROM article_favorites WHERE user_id=?').bind(user).all(),db.prepare('SELECT stage,activity,created FROM activity_favorites WHERE user_id=?').bind(user).all(),db.prepare('SELECT recipe_id,created FROM recipe_favorites WHERE user_id=?').bind(user).all()]);
  const items=[];for(const x of results[0].results){const a=articles.find(a=>a.slug===x.article_id);if(a)items.push({kind:'article',id:a.slug,title:a.title,body:a.summary,url:'https://littlewinsparentclub.com/articles/'+a.slug+'.html',created:x.created});}
  for(const x of results[1].results)items.push({kind:'activity',id:x.stage+':'+x.activity,stage:x.stage,activity:x.activity,created:x.created});
  for(const x of results[2].results){const r=recipes.find(r=>r.id===x.recipe_id);if(r)items.push({kind:'recipe',id:r.id,title:r.title,body:r.ingredients.join('; '),url:r.source,created:x.created});}
  return json({items:items.sort((a,b)=>b.created-a.created)});
 }
 return json({error:'Not found'},404);
}
