
import express from 'express';
const router=express.Router()



router.get('/', (req, res) => {
    res.send("Welcome to the homepage!"); 
});


router.get('/hello', (req, res) => {
    res.send("Hello there!"); 
});


router.get('/goodbye', (req, res) => {
    res.send("Goodbye! Have a great day!"); 
});
export default router;