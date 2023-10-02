require('dotenv').config()
const http = require('http')
const express = require('express')
app = express();
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5500;
const server = http.createServer(app)
const router = require('./routes');
const cors = require('cors');



const corsoption = {
    credentials:true,
    origin: ['http://localhost:3000']
}
app.use(cors(corsoption));
app.use(bodyParser.json())
app.use(router);
app.get('/',(req,res) =>{
    res.send("hello from the express js");
});

app.use(cors(corsoption));

server.listen(PORT,()=>{console.log(`server is listening to the port ${PORT}`)})
