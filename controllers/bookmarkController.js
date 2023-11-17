const Bookmark  = require('../models/Bookmark')
const Job = require('../models/jobschema')

module.exports = {
    createBookmark: async (req, res) => {
      const jobId = req.body.job; // BookmarkSchema
      const userId = req.user.id;
  
      console.log('Received jobId: ', jobId); // リクエストの受信をログに記録
  
      try {
        console.log('Searching for job with ID: ', jobId); // ジョブ検索開始をログに記録
        const job = await Job.findById(jobId);
  
        if (!job) {
          console.log('Job not found for ID: ', jobId); // ジョブが見つからなかった場合のログ
          return res.status(400).json({ message: 'Job not found' });
        }
  
        console.log('Job found: ', job); // ジョブが見つかった場合のログ
  
        const newBookmark = new Bookmark({ job: jobId, userId: userId });
  
        console.log('Saving new bookmark...'); // ブックマーク保存開始をログに記録
        const savedBookmark = await newBookmark.save();
        console.log('Bookmark saved: ', savedBookmark); // 保存されたブックマークをログに記録
  
        return res.status(200).json({ status: true, bookmarkId: savedBookmark._id });
      } catch (error) {
        console.error('Error in createBookmark: ', error); // エラーをログに記録
        return res.status(500).json({ message: error.message });
      }
    },


  deleteBookmark: async (req,res) => {
    const bookmarkId = req.params.bookmarkId;
    try{
      await Bookmark.findByIdAndDelete(bookmarkId)

      res.status(200).json({stauts: true,message:'Bookmark deleted'})
    }catch(error){
      res.status(500).json({message:error.message})
    }
  },

  getAllBookmarks: async (req, res) => {
    const userId = req.user.id;
  
    try{
      console.log(`Getting bookmarks for user: ${userId}`); // Debug: Print the user ID
  
      const bookmarks = await Bookmark.find({userId:userId},{createdAt:0,updatedAt:0,__v:0}).populate(
        {
           path:'job',
           select:"-requriement -description -createdAt -updatedAt -__v"
        }
      )
  
      console.log(`Found ${bookmarks.length} bookmarks`); // Debug: Print the number of bookmarks found
  
      // Debug: Print each bookmark and its associated job
      bookmarks.forEach((bookmark, i) => {
        console.log(`Bookmark ${i}: ${JSON.stringify(bookmark)}`);
      });
  
      res.status(200).json(bookmarks)
    } catch (error){
      console.log(`Error getting bookmarks: ${error.message}`); // Debug: Print the error message
      res.status(500).json({message:error.message})
    }
  },

  getBookmark:async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.id;

    try{
      const bookmark = await Bookmark.findOne({userId:userId, job:jobId})
      if(!bookmark){
        return res.status(200).json(null)
      }    
      res.status(200).json({status:true, bookmarkId : bookmark._id})
    } catch (error){
      res.status(500).json({message:error.message})

    }
  },


}