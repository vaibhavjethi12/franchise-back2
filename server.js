var express=require("express");
var fileuploader=require("express-fileupload");
var mongoose=require("mongoose");
var cors=require("cors");
var {url}=require ( "./config/config");
var app=express();

// app.use(cors());
app.use(
    cors({
      origin: "https://joyful-brioche-b72c79.netlify.app",
      methods: "GET,POST,PUT,DELETE",
    //   credentials: true, // If using cookies/auth
    })
  );
app.listen(2025,function(){
    console.log("Server Started...");
})

app.use(express.urlencoded({ extended: true }));
app.use(fileuploader());
var urll=url;

mongoose.connect(urll).then(()=>{
    console.log("Connected...");
}).catch((err)=>{
    console.log(err.message);
    // resp.send(err.message);
})
var userRouter=require("./router/userrouter");
app.use("/user",userRouter);