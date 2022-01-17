const { sequelize,Order,Users } = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const Joi=require('joi');

const putValidation=Joi.object().keys({
    date:Joi.date().required(),
    id:Joi.number().integer().required()


})

const postValidation=Joi.object().keys({
    date:Joi.date().required()
})


function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/order', (req, res) => {

    Order.findAll({ include: ['Seller'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});
route.post('/order', (req, res) => {
    postValidation.validateAsync(req.body)
    .then(succ=>{
        
        Users.findOne({ where: { id: req.user.userId } })
            .then( usr => {
            Order.create({ date: req.body.date ,userID:req.user.userId})
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json({msg:"Error bad !"}) );
            })
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json({msg:"Validation error!"}) );
});
route.get('/order/:id', (req, res) => {

    Order.findOne({ where: { id: req.params.id }, include: ['Seller']  })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});
route.put('/order/:id', (req, res) => {
    putValidation.validateAsync(req.body)
    .then(succ=>{
        Order.findOne({ where: { id: req.params.id }, include: ['Seller']  })
            .then( ord => {
                ord.date = req.body.date;

                ord.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json({msg:"Error bad ID!"}) );
        })
        .catch( err => res.status(500).json({msg:"Validation error!"}) );


});

route.delete('/order/:id', (req, res) => {

    Order.findOne({ where: { id: req.params.id }, include: ['Seller']  })
        .then( ord => {
            ord.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json({msg:"Invalid ID!"}) );
});

module.exports = route;