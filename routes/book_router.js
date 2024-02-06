import express from 'express';
const router = express.Router();
import bookController from '../controllers/book_controller.js';

router.post('/addNew',bookController.addNewBook);
router.get('/deleteAll',bookController.deleteAll);
router.put('/:book_id',bookController.updateBook);
router.get('/allBooks',bookController.getAllBooks);
router.get('/delete/:book_id',bookController.deleteBook);
export default router;