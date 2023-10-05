const checkData = (req, res, next)=>{
    let {title,author,category,publicationYear,price,quantity,description,imageUrl}= req.body;
    if (title && author && category && publicationYear && price && quantity && description && imageUrl){
        next();
    }
    else{
        res.status(400).send({message: 'All fields are required'});
    }
}


module.exports = {checkData}
