import express from 'express';
import dotenv from "dotenv"
import router from './Routes/app_route.js';
import bodyParser from "body-parser"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001

app.use(bodyParser.json())
app.use('/',router)

// Error handling middleware
// app.use((err,req,res,next)=>{
// console.log(err.stack);
// res.json({ message: err.message });

// })


app.use(express.static('uploads'));
  


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
