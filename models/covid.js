const mongoose = require("mongoose");

const CovidSchema = new mongoose.Schema({
    iso_code: String,
    continent: String,
    location: String,
    date: String,
    total_cases: Number,
    new_cases: Number,
    total_deaths: Number,
    new_deaths: Number,
    total_cases_per_million: Number,
    total_deaths_per_million: Number,
    icu_patients: Number,
    population: Number,
    median_age: Number,
    hospital_beds_per_thousand: Number
});

module.exports = mongoose.model("covid", CovidSchema);