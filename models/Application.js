const mongoose = require('mongoose');


const applicationSchema = new mongoose.Schema({

  user:{type: mongoose.Schema.Types.ObjectId ,ref:"User"},
  job:{type: mongoose.Schema.Types.ObjectId ,ref:"Job"},


},{timestamps : true}); // timestampsオプションは、createdAtとupdatedAtフィールドを自動的に管理


module.exports = mongoose.model('Application', applicationSchema);