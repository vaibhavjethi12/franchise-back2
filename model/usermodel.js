var mongoose=require("mongoose");
function getusermodel()
{
    var userScheema=mongoose.Schema;
    
    var userColSchema={
        em:{type:String,required:true,index:true,unique:true},
        txtname:String,
        cont:String,
        add:String,
        exb:String,
        dosi:String,
        sadd:String,
        city:String,
        area:String,
        pin:String,
        radio:String,
        state:String,
        floor:String,
        date_of_application: { type: Date, default: Date.now },
        status:String, 

        
    }
    var ver={
        versionKey: false, // to avoid __v field in table come by default
      }
    var UserColShema=new userScheema(userColSchema,ver);
    var UserColRef=mongoose.model("application-project",UserColShema);
    return UserColRef;
}
module.exports={getusermodel};