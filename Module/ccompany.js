const mongoose = require("mongoose");

const carCompanySchema = mongoose.Schema({
    company_id : String,
    company_name : String,
})

const companyModule = mongoose.model("ccompany",carCompanySchema,"ccompany");

module.exports = companyModule;