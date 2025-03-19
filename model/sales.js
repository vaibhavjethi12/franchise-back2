var mongoose=require("mongoose");
function sales()
{
    var userScheema=mongoose.Schema;
    
    var userColSchema={
        month:String,
        year:Number,
        date: Number,
        totalSales:Number,
        customersVisited:Number,
        

       

        
    }
    var ver={
        versionKey: false, // to avoid __v field in table come by default
      }
    var UserColShema=new userScheema(userColSchema,ver);
    var UserColRef=mongoose.model("today-sales",UserColShema);
    return UserColRef;
}
module.exports={sales};