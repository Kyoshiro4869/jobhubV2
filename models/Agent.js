const mongoose = require('mongoose');

// Bookmarkのスキーマを定義
const AgentSchema = new mongoose.Schema({

  userId:{type: String ,requrired:true},
  uid:{type: String ,requrired:true},
  company:{type: String ,requrired:true},
  hq_address:{type: String ,requrired:true},
  working_hrs:{type: String ,requrired:true},
  

},{timestamps : true}); // timestampsオプションは、createdAtとupdatedAtフィールドを自動的に管理


module.exports = mongoose.model('Agent', AgentSchema);
