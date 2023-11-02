require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 8000;
const helmet = require('helmet');
const cors = require('cors')

const app = express();

app.use(helmet());
app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
