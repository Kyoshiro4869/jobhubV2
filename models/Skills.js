const mongoose = require('mongoose');

// Bookmarkのスキーマを定義
const skillSchema = new mongoose.Schema({

  userId:{type: String ,requrired:true},
  skill:{type: String ,requrired:true},
},{timestamps : true}); // timestampsオプションは、createdAtとupdatedAtフィールドを自動的に管理


module.exports = mongoose.model('Skill', skillSchema);

//※ObjectIdはMongoDBのデータ型の一つで、各ドキュメントに一意のIDを提供