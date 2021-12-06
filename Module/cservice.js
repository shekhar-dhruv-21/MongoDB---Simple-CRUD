const mongoose = require("mongoose");

const carServiceSchema = mongoose.Schema({
    service_id : String,
    service_name : String,
    model_ids : [String],
})

const serviceModule = mongoose.model("cservice",carServiceSchema,"cservice");

module.exports = serviceModule;