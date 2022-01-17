const express = require('express');
const { sequelize,Watch } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const Joi=require('joi');

const putValidation=Joi.object().keys({
    brand:Joi.string().trim().min(1).required(),
    model:Joi.string().trim().min(1).required(),
    id:Joi.number().integer().required(),
    refNumber:Joi.number().integer().required(),
    orderID:Joi.number().integer().required(),
    storageID:Joi.number().integer().required()
});
const postValidation=Joi.object().keys({
    brand:Joi.string().trim().min(1).required(),
    model:Joi.string().trim().min(1).required(),
    refNumber:Joi.number().integer().required(),
    orderID:Joi.number().integer().required(),
    storageID:Joi.number().integer().required()
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
route.get('/watch', (req, res) => {

    Watch.findAll({ include: ['str','ord'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});
route.post('/watch', (req, res) => {
    postValidation.validateAsync(req.body)
    .then(succ=>{
        Watch.create({ brand: req.body.brand, refNumber: req.body.refNumber, model: req.body.model, storageID: req.body.storageID, orderID: req.body.orderID })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    })
    .catch( err => res.status(500).json({msg:"Validation error!"}) );


    

});
route.get('/watch/:id', (req, res) => {

    Watch.findOne({ where: { id: req.params.id }, include: ['str','ord']  })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});
route.put('/watch/:id', (req, res) => {
    putValidation.validateAsync(req.body)
    .then(succ=>{
        Watch.findOne({ where: { id: req.params.id }, include: ['str','ord']  })
            .then( wt => {
                wt.brand = req.body.brand;
                wt.refNumber = req.body.refNumber;
                wt.model = req.body.model;
                wt.orderID=req.body.orderID;
                wt.storageID=req.body.storageID;

                wt.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json({msg:"Invalid ID!"}) );
        })
        .catch( err => res.status(500).json({msg:"Validation error!"}) );
    });

route.delete('/watch/:id', (req, res) => {

    Watch.findOne({ where: { id: req.params.id }, include: ['str','ord']  })
        .then( wt => {
            wt.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json({msg:"Invalid ID!"}) );
});

module.exports = route;