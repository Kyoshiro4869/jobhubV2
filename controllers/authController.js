const User = require('./models/User');
const CryptJS = require('crypto-js');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async(req, res)=> {
    const user = req.body;

    try{
      await admin.auth().getUserByEmail(user.email);

      return res.status(400).json({
        message: 'User already exists'
      });
    } catch (error){
      if(error.code === 'auth/user-not-found' ){
        try{
          const userResponse = await admin.auth().createUser({
            email:user.email,
            password:user.password,
            emailVerified:false, //Firebaseはメールアドレスに確認用のリンクを含むメールを送信 ユーザーがそのリンクをクリックすると、メールアドレスが「検証済み」としてマークされ、emailVerified プロパティが true になる
            disabled:false,  //ユーザーのアカウントが有効であることを示す 無効の場合ログインできなくなる
          })

          console.log(userResponse.uid);

          const newUser = await new User({
            uid:userResponse.uid,
            username:user.username,
            email:user.email,
            password:CryptJS.AES.encrypt(user.password,process.env.SECRET).toString(),
            //crypto-jsライブラリを使用してユーザーのパスワードを暗号化し、その他のユーザー情報と共に新しいUserモデルインスタンスを作成

          }) 
          await newUser.save();
          res.status(201).json({status:true})
        } catch (error){
          res.status(500).json({error: 'An error occured while creating account'})
        }
      }

    }
  },

  loginUser: async(req, res)=> {
    try{
      const user = await User.findOne({email: req.body.email}, 
        {__v:0, createdAt:0, updatedAt:0, skills: 0, email:0});

      if(!user){
        return res.status(400).json({
          message:'User not found'
        });
      }

      const decryptedPassword = CryptJS.AES.decrypt(user.password, process.env.SECRET);
      const depassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

      if(depassword !== req.body.password){
        return res.status(400).json({
          message:'Invalid password'
        })
      }
      const userToken = jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin,
        isAgent:user.isAgent,
        uid: user.uid,

      }, process.env.JWT_SEC,{expiresIn:'21d'});
      
      const {password, isAdmin, ...others} = user._doc

      res.status(200).json(...others,userToken)
    } catch (error){
      res.status(500).json({error: 'An error occured while logining'})
    }
  }
}
