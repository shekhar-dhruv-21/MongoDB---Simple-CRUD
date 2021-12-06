const { response } = require ("express");
const express = require ("express");
const companyModule = require("./Module/ccompany");
const carModelModule = require("./Module/cmodel");
const serviceModule = require("./Module/cservice");
const app = express();
app.use(express.json());
require("dotenv").config();

const port = process.env.PORT || 5000;

require("dotenv").config();
//---------------- mongoose --------------------------
const mongoose = require("mongoose");
mongoose
 .connect(process.env.MONGOURL)
 .then(() => console.log("MongoDB is Connected"))
 //---------------------------------------------------
app.get("/",(req,res) => {
    res.json({data: "Welcome To Car Service System"})
})

//------------------- Add company --------------------
app.post("/add-company/", (req,res) => {
    const {newCompany} = req.body;
    const addCompany = companyModule.create(newCompany);
    return res.json({data : "Comapny Inserted"});
})
//----------------------------------------------------

//------------------- Add Model --------------------
app.post("/add-model",(req,res) => {
    const { newModel } = req.body;
    const addModel = carModelModule.create(newModel);
    return res.json({data: "Model Inserted"});
})
//----------------------------------------------------

//------------------- Add Service --------------------
app.post("/add-service", (req,res) => {
    const { newService } = req.body;
    const addService = serviceModule.create(newService);
    return res.json({data : "Service Inserted"})
})
//----------------------------------------------------

//------------------ Update Company ------------------
app.put("/update-company/:id", async (req,res) => {
    const cid = req.params.id;
    const cname = req.body.company_name;
    const updatecompany = await companyModule.findOneAndUpdate(
        {company_id : cid},
        {company_name : cname},
        {new : true}
    )
    res.json({data: "Comapany Updated"})
})
//-----------------------------------------------------

//------------------ Update model ---------------------
app.put("/update-model/:id", async (req,res) => {
    const mid = req.params.id;
    const mname = req.body.model_name;
    const cid = req.body.company_id;

    const updatemodel = await carModelModule.updateMany(
        { model_id : mid },
        {$set : { model_name : mname, company_id : cid}}
    )
     
    res.json({data: "Model Updated"})
})
//----------------------------------------------------

//---------------- Update Service --------------------
app.put("/update-service/:id", async (req,res) => {
    const sid = req.params.id;
    const sname = req.body.service_name;
    const mid = req.body.model_ids;

    const updateservice = await serviceModule.updateMany(
        { service_id: sid },
        {$set : {service_name : sname},$addToSet:{model_ids : mid}}
    )

    res.json({data : "Service Updated"})
})
//-----------------------------------------------------

//------------------Delete Company --------------------
app.delete("/delete-company/:id", async (req, res) => {
    const cid = req.params.id;

    const deleteCompany = await companyModule.findOneAndDelete(
        {company_id : cid}
    )
    return res.json({data: "Comapany Deleted"})
})
//-----------------------------------------------------

//------------------Delete model --------------------
app.delete("/delete-model/:id", async (req, res) => {
    const mid = req.params.id;

    const deletemodel = await carModelModule.findOneAndDelete(
        {model_id : mid}
    )
    return res.json({data: "Model Deleted"})
})
//-----------------------------------------------------

//------------------Delete model --------------------
app.delete("/delete-service/:id", async (req, res) => {
    const sid = req.params.id;

    const deleteservice = await serviceModule.findOneAndDelete(
        {service_id : sid}
    )
    return res.json({data: "Service Deleted"})
})
//-----------------------------------------------------

//------------------list services --------------------
app.get("/list-services", async (req,res) => {
    const listservice = await serviceModule.find();
    return res.json({data: listservice});
})
app.listen(port, () => console.log(`App is running on port ${port}`));