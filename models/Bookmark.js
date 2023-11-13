const mongoose = require('mongoose');

// Bookmarkのスキーマを定義
const BookmarkSchema = new mongoose.Schema({

  job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Job' // 'Job'は参照先のモデル名（jobschema.jsのJobschema)
  },
  userId:{type: String ,requrired:true}
},{timestamps : true}); // timestampsオプションは、createdAtとupdatedAtフィールドを自動的に管理


module.exports = mongoose.model('Bookmark', BookmarkSchema );

//※ObjectIdはMongoDBのデータ型の一つで、各ドキュメントに一意のIDを提供