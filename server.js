const express=require("express");
const http=require("http");
const {WebSocketServer}=require("ws");
const app=express();
app.use(express.json());
app.use(express.static("public"));
const server=http.createServer(app);
const wss=new WebSocketServer({server,path:"/ws"});
const clients=new Set();
wss.on("connection",ws=>{clients.add(ws);ws.send(JSON.stringify({type:"hello",message:"Mine To Earn connected"}));ws.on("close",()=>clients.delete(ws));});
app.post("/api/event",(req,res)=>{
  const allowed=["zombie","tnt","lightning","creepers","catastrophe","dragon"];
  const event=req.body&&req.body.event;
  if(!allowed.includes(event)) return res.status(400).json({ok:false,error:"Unknown event"});
  const payload=JSON.stringify({type:"event",event});
  for(const ws of clients){if(ws.readyState===1) ws.send(payload);}
  console.log("EVENT:",event,"clients:",clients.size);
  res.json({ok:true,event,clients:clients.size});
});
const PORT=process.env.PORT||10000;
server.listen(PORT,()=>console.log("Mine To Earn running on port "+PORT));
