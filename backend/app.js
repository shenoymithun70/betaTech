const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const host = 'localhost';
const routes = require('./Routes/index');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors());
app.options('*',cors());

app.use(bodyParser.json());

app.use('/',routes);


mongoose.connect('mongodb+srv://gaurang:G@ghthakkar5418@cluster0.7kakw.mongodb.net/ims?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(res => {
    app.listen(port, host, () => {
        console.log(`Server Running on ${host}:${port}`)
    });
}).catch(err => { console.log(err) })


