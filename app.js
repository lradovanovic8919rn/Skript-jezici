const express = require('express');
const { sequelize } = require('./models');
const usr=require('./routes/users');
const ord=require('./routes/order');
const wtch=require('./routes/watch');
const strg=require('./routes/storage');

const cors=require('cors');


const app=express();

var corso={
    origin:'http://127.0.0.1:9000',
    optionsSuccessStatus:200
};

const path = require('path');

app.use(cors(corso));

app.use('/admin',usr);
app.use('/admin',ord);
app.use('/admin',wtch);
app.use('/admin',strg);



app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});