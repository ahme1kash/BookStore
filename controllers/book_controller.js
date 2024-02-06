import book from '../models/book_model.js'
const getAllBooks = async(req,res)=>{
   try{
    const books = await book.find();
    res.json(books)
   }
   catch(error){
    res.status(500).json({ message: error.message });
    console.log(error.mesage)
   }
}
const addNewBook = async(req,res)=>{
    try{
        const author = req.body.author
        const title = req.body.title
        const existingBook = await book.findOne({author:author,title:title});
        if (existingBook){
            console.log(existingBook)
            // console.log(existingUSer.name)
            return res.status(409).redirect("back");
        }
        
    const newBook = new book({
        author:req.body.author,
        title:req.body.title,
        description: req.body.description,
        price: req.body.price,
        sellCount: req.body.sellCount
    }
    )
    
    
    if(await newBook.save()){
        console.log("Book saved")
        res.json(newBook); 
    }
}
    catch(err){
        console.log(err)
        res.json(err.messaage); 
        console.log(err.messaage)
    }
}
const updateBook = async(req,res)=>{
    try{
        const originalBookInfo = await book.findById(req.params.book_id)
        console.log(originalBook)
        const updatedBook = {
            author :req.body.author,
            title :req.body.book,
            description: req.body.description,
            price: req.body.price,
            sellCount: req.body.sellCount
        }
        const updatedInfo = await book.findByIdAndUpdate(
            {_id:req.params.book_id},
            updatedBook,
            {new:true}  // This is important to add.
            )
            console.log(originalBookInfo,updatedInfo)
            res.json(updated)
        }
        catch(err){
            console.log(err.messaage)
        }
}
const deleteBook = async(req,res)=>{
    try{
        console.log(req.params)
        const book_removed = await book.findByIdAndDelete(req.params.book_id)
        console.log(`Deleted Book is ${book_removed}`)
        res.redirect('back')
    }
    catch(err){
        console.log(err.message)
    }
  }
 
 const deleteAll = async(req,res)=>{

   try{
    console.log("Delete Function Called")
    await book.deleteMany()
    res.json("Everything deleted")
   }
catch(err){
    res.json(err.message)
}
}
  export default{
    addNewBook,
    getAllBooks,
    updateBook,
    deleteBook,
    deleteAll
  }