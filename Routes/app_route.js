
import express from 'express';
import multer from 'multer';

import { deleteOneUser, getAllUser, getOneUser, postUser, update } from '../controller/controller.js';

const router=express.Router()
const upload = multer({ dest: 'uploads/' }); 



router.get('/',getAllUser)
router.post('/newperson' ,upload.single('file'),postUser)
router.get('/user/:id', getOneUser)
router.delete('/user/:index',deleteOneUser)
router.put('/user/:id',update)





export default router;