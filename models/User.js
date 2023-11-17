const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid:{type:String, required: true, unique: true},  
  username:{type:String, required: true, unique: true},  
  email:{type:String, required: true, unique: true},  
  password:{type:String, required: true},  
  location:{type:String},
  phone:{type:String},
  updated:{type:Boolean, default: false},
  isAgent:{type:Boolean, default: false},
  isAdmin:{type:Boolean, default: false},
  skills:{type:Boolean, default: false, required:false},
  profile:{type:String,required:true, default:"https://cdn.icon-icons.com/icons2/2699/PNG/512/google_logo_icon_169090.png"},
  
},{timestamps : true});

module.exports = mongoose.model('User', UserSchema);

//mongoose.model('User', UserSchema) を使用して User モデルを作成し、これをエクスポートしています。これにより、他のファイルからこのモデルを require することで、アプリケーションの他の部分で MongoDB の User コレクションに対して操作を行うことができるようになります。