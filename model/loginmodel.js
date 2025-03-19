var mongoose=require("mongoose");
function getloginmodel()
{
    var userScheema=mongoose.Schema;
    
    var userColSchema={
        userId:{type:String,required:true,index:true,unique:true},
        password:String,

        
    }
    var ver={
        versionKey: false, // to avoid __v field in table come by default
      }
    var UserColShema=new userScheema(userColSchema,ver);
    var UserColRef=mongoose.model("login-applicant",UserColShema);
    return UserColRef;
}
module.exports={getloginmodel};