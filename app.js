// console.log('process.env.PDW',process.env.PWD);

const PORT = process.env.PORT || 8000;

const express = require('express');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const add = require('./add.js');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.route('/add').post((req,res,err)=>{

  add(req.body,(err)=>{

    if(err) return res.status(400).send(err);

    else res.send();

  });

});

app.use(express.static('public'));


app.listen(PORT , err => {

  console.log(err || `Server listening on port ${PORT}`);

});
