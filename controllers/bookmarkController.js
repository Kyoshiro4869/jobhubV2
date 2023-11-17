const Bookmark  = require('../models/Bookmark')
const Job = require('../models/jobschema')

module.exports = {
  createBookmark:async(req,res) => {
    const jobId = req.body.job; //BookmarkSchema
    const userId = req.user.id;

    console.log('Received jobId: ', jobId);  // Add this line

    try{
      const job = await Job.findById(jobId);

      if(!job){
        
        return res.status(400).json({message:'Job not found'});
      }

      const newBookmark = new Bookmark({job:jobId, userId:userId});

      const saveBookmark = await newBookmark.save();

      return res.status(200).json({status:true,bookmarkId:saveBookmark._id})

    }catch(error){
      return res.status(500).json({message:error.message})

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