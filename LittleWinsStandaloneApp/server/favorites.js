const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
async function favorites(req,env){
 const user=req.headers.get('oai-authenticated-user-id');if(!user)return json({error:'Sign in to save and view favorites.'},401);
 const db=env.DB;if(!db)return json({error:'Favorites are temporarily unavailable. Please try again.'},503);
 if(req.method!=='GET'){
  if(!['POST','DELETE'].includes(req.method))return json({error:'Method not allowed'},405);
  if(req.headers.get('Origin')!==new URL(req.url).origin)return json({error:'Reload this page and try again.'},403);
  if(!req.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'JSON required'},415);
  const raw=await req.text();if(raw.length>500)return json({error:'Request too large'},413);let input;try{input=JSON.parse(raw)}catch{return json({error:'Invalid activity'},400)}
  if(!input||!Number.isInteger(input.stage)||input.stage<0||input.stage>8||!Number.isInteger(input.activity)||input.activity<0||input.activity>5)return json({error:'Invalid activity'},400);
  if(req.method==='POST')await db.prepare('INSERT OR IGNORE INTO activity_favorites (user_id,stage,activity,created) VALUES (?,?,?,?)').bind(user,input.stage,input.activity,Date.now()).run();
  else await db.prepare('DELETE FROM activity_favorites WHERE user_id=? AND stage=? AND activity=?').bind(user,input.stage,input.activity).run();
 }
 const rows=await db.prepare('SELECT stage,activity FROM activity_favorites WHERE user_id=? ORDER BY created DESC').bind(user).all();return json({items:rows.results});
}
export {favorites};
