var { getusermodel } = require("../model/usermodel");
var { getloginmodel } = require("../model/loginmodel");
var {sales} =require("../model/sales");
const { get } = require("mongoose");
var UserColRef1= getloginmodel();
var UserColRef = getusermodel();
var userColRef2=sales();

function dosave(req, resp) {
    console.log(req.body);
    var userObj = new UserColRef(req.body);
    userObj.save().then((document) => {
        resp.json({ doc: document, status: true, msg: "Saved successfully" });
    }).catch((err) => {
        console.log(err.message);
        resp.json({ status: false, msg: err.message });
    });
}

function dofind(req, resp) {
    UserColRef.find().then((document) => {
        resp.json({ data: document, status: true });
    }).catch((err) => {
        resp.json({ status: false, msg: err.message });
    });
}

function updateaccept(req, resp) {
    UserColRef.updateOne({ em: req.query.em }, { $set: { status: "1" } }).then((document) => {
        resp.json({ data: document, status: true, msg: "Updated successfully" });
    }).catch((err) => {
        resp.json({ status: false, msg: err.message });
    });
}

function updatedec(req, resp) {
    UserColRef.updateOne({ em: req.query.em }, { $set: { status: "-1" } }).then((document) => {
        resp.json({ data: document, status: true, msg: "Updated successfully" });
    }).catch((err) => {
        resp.json({ status: false, msg: err.message });
    });
}

function getinfo(req, resp) {
    UserColRef.findOne({ em: req.query.em }).then((document) => {
        resp.json({ data: document, status: true });
    }).catch((err) => {
        resp.json({ status: false, msg: err.message });
    });
}
function updatefranchise(req,resp)
{
    UserColRef.updateOne({em:req.query.em},{$set:{status:"2"}}).then((doc)=>{
        resp.json({data:doc,status:true,msg:"Updated successfully"});   
    }).catch((err)=>{
        resp.json({status:false,msg:err.message});

    })
    
}
function dologinsave(req,resp)
{
    console.log(req.body);
    var userobj=new UserColRef1(req.body);
    userobj.save().then((doc)=>{
        resp.json({doc:doc,status:true,msg:"Saved succesfully"});
    }).catch((err)=>{
        resp.json({status:false,msg:err.message});
    })
}
function dosalessave(req,resp)
{
    console.log(req.body);
    var userobj=new userColRef2(req.body);
    userobj.save().then((doc)=>{
        resp.json({doc:doc,status:true,msg:"Saved succesfully"});
    }).catch((err)=>{
        resp.json({status:false,msg:err.message});
    })


}
function getsales(req,resp)
{
    const { fromDate, fromMonth, fromYear, toDate, toMonth, toYear } = req.query;

    // Check if all required query parameters are provided
    if (!fromDate || !fromMonth || !fromYear || !toDate || !toMonth || !toYear) {
        return resp.json({ status: false, msg: "Missing required query parameters" });
    }

   

    // Log the query parameters and constructed dates
    

    userColRef2.find({ date: { $gte: fromDate, $lte: toDate },month:{$gte:fromMonth,$lte:toMonth},year:{$gte:fromYear,$lte:toYear}} ).then((doc) => {
        console.log("Fetched Documents:", doc);
        resp.json({ data: doc, status: true, msg: "Data fetched successfully" });
    }).catch((err) => {
        console.error("Error fetching data:", err);
        resp.json({ status: false, msg: err.message });
    });

}
function changepass(req,resp)
{
    userColRef2.updateOne({userId:req.query.userId,password:req.query.oldpass},{$set:{password:req.query.newpass}}).then((doc)=>{
        resp.json({data:doc,status:true,msg:"Updated successfully"});
    }).catch((err)=>{
        resp.json({status:false,msg:err.message});
    })
}
function getDailySales(req, resp) {
    userColRef2.aggregate([
        {
            $group: {
                _id: { date: "$date", month: "$month", year: "$year" },
                totalSales: { $sum: "$totalSales" },
                customersVisited: { $sum: "$customersVisited" }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1, "_id.date": 1 }
        }
    ]).then((doc) => {
        const formattedData = doc.map(item => ({
            date: `${item._id.date}/${item._id.month}/${item._id.year}`,
            totalSales: item.totalSales,
            customersVisited: item.customersVisited
        }));
        resp.json({ data: formattedData, status: true, msg: "Daily sales data fetched successfully" });
    }).catch((err) => {
        resp.json({ status: false, msg: err.message });
    });
}
function getMonthlySales(req, resp) {
    userColRef2.aggregate([
        {
            $group: {
                _id: { month: "$month", year: "$year" },
                totalSales: { $sum: "$totalSales" },
                customersVisited: { $sum: "$customersVisited" }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 }
        }
    ]).then((doc) => {
        const formattedData = doc.map(item => ({
            month: `${item._id.month}/${item._id.year}`,
            totalSales: item.totalSales,
            customersVisited: item.customersVisited
        }));
        resp.json({ data: formattedData, status: true, msg: "Monthly sales data fetched successfully" });
    }).catch((err) => {
        resp.json({ status: false, msg: err.message });
    });
}
function getpass(req,resp)
{
    UserColRef1.findOne({userId:req.query.userId}).then((doc)=>{
        resp.json({data:doc,status:true,msg:"Data fetched successfully"});
    }).catch((err)=>{
        resp.json({status:false,msg:err.message});
    })
}

module.exports = { dosave, dofind, updateaccept, updatedec, getinfo,updatefranchise,dologinsave,dosalessave,getsales,changepass,getDailySales,getMonthlySales,getpass};