const express = require('express');
const { sequelize ,Storage} = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const Joi=require('joi');

const putValidation=Joi.object().keys({
    capacity:Joi.number().integer().required(),
    id:Joi.number().integer().required()
});
const postValidation=Joi.object().keys({
    capacity:Joi.number().integer().required(),
});

const deleteValidation=Joi.object().keys({
    id:Joi.required()
});

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

route.get('/storage', (req, res) => {

    Storage.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});
route.post('/storage', (req, res) => {
    postValidation.validateAsync(req.body)
    .then(succ=>{
        Storage.create({ capacity: req.body.capacity })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json({msg:"Validation error!"}) );


});
route.get('/storage/:id', (req, res) => {

    Storage.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});
route.put('/storage/:id', (req, res) => {
    putValidation.validateAsync(req.body)
    .then(succ=>{
        Storage.findOne({ where: { id: req.params.id } })
            .then( str => {
                str.capacity = req.body.capacity;

                str.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json({msg:"Invalid ID!"}) );
    })
    .catch( err => res.status(500).json({msg:"Validation error!"}) );

});

route.delete('/storage/:id', (req, res) => {

    Storage.findOne({ where: { id: req.params.id } })
        .then( str => {
            str.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json({msg:"Error bad !"}) );
        })
        .catch( err => res.status(500).json({msg:"Error bad ID!"}) );
});

module.exports = route;