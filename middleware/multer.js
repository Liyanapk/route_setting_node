import multer from 'multer';
import fs from 'fs'

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        // console.log(fs.existsSync("/uploads"),"test")

        
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    },
});


export const upload = multer({ storage: storage });


export const uploadUser = (req, res) => {
    const userData = req.body; 
    const file = req.file; 

   
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

   
    res.send({
        message: 'User created successfully!',
        userData: userData, 
        file: file.filename, 
    });
};



