var express=require("express");

var obj=require("../controller/usercontroller");
var userRouter=express.Router();
userRouter.post("/savepost",obj.dosave);
userRouter.get("/find",obj.dofind);
userRouter.get("/updatestatus",obj.updateaccept);
userRouter.get("/updatedec",obj.updatedec);
userRouter.get("/getinfo",obj.getinfo);
userRouter.get("/updatefranchise",obj.updatefranchise);
userRouter.post("/login",obj.dologinsave)
userRouter.post("/salessave",obj.dosalessave);
userRouter.get("/getsales",obj.getsales);
userRouter.get("/changepassword",obj.changepass);
userRouter.get("/daily-sales",obj.getDailySales);
userRouter.get("/monthly-sales",obj.getMonthlySales)
userRouter.get("/getpass",obj.getpass);

module.exports=userRouter;