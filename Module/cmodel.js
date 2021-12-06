const mongoose = require("mongoose");

const carModelSchema = mongoose.Schema({
    model_id : String,
    model_name : String,
    company_id : String,
})

const carModelModule = mongoose.model("cmodel",carModelSchema,"cmodel");

module.exports = carModelModule;