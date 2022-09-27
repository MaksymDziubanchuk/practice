const express = require('express')
const morgan = require("morgan")
require('dotenv').config();

const app = express();

const {postsRouter} = require('./routers/postsRouter')

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/posts', postsRouter);

app.listen(PORT, (err) => {
    if(err)         console.log("Error at eserver launch:", err);
    
    console.log(`Server works at port ${PORT}`)
});


