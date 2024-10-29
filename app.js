import express from 'express';
import routes from 'express';

const app = express();
const PORT = 4000;


app.use('/',routes)

app.use((req, res) => {
    res.status(404).send("404 Not Found"); 
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


