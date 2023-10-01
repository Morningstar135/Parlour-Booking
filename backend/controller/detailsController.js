const Details = require('../model/lyconDetailsModel')

exports.createDetails=async(req,res)=>{
try
 {   const {data} = req.body
    const addedDetails = await Details.create(data)
    if(!addedDetails){
        res.status(400).json({
            message:"Details is Not Created"
        })
    }
    res.status(200).json({
        message:"Details Created Successfully",
        addedDetails
    })
    }catch(err){
        res.status(500).json({
            message:"Some Internal Server Error"
        })
    }
}
exports.updateDetails = async(req,res)=>{
    try{
        const {id,update} =req.body
        const resObj = await Details.findByIdAndUpdate({id},update)
        if(!resObj){
            res.status(400).json({
                message:"Details Updation Failed"
            })
            return
        }
        res.status(200).json({
            message:"Details Updation Success",
            resObj
        })
    }catch(err){
        res.status(500).json({
            message:"Some Internal Server Error"
        })
    }
    
}
exports.getDetails=async(req,res)=>{
    const {id} =req.body
    const resObj =await Details.findById(id)
    if(!resObj){
        res.status(400).json({
            message:"Details Not Found"
        })
        return
    }
    res.status(200).json({
        message:"Success",
        resObj
    })
}