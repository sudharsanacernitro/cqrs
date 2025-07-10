const express=require('express');

const router=express.Router();

const {get , getById ,add,update,deleteProd } = require('../controllers/productController');


router.get('/get',get);
router.get('/getById/:id',getById)
router.post('/add',add);
router.patch('/update',update);
router.delete('/delete/:id',deleteProd);

module.exports=router;