const express=require("express");
const app=express();
app.use(express.json());
app.use(express.static("public"));
const PORT=process.env.PORT||10000;
app.post("/api/event",(req,res)=>{
  const allowed=["zombie","tnt","lightning","creepers","catastrophe","dragon"];
  const event=req.body&&req.body.event;
  if(!allowed.includes(event)) return res.status(400).json({ok:false,error:"Unknown event"});
  console.log("EVENT:",event);
  res.json({ok:true,event});
});
app.listen(PORT,()=>console.log("Mine To Earn running on port "+PORT));