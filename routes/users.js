const { sequelize,Users } = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const Joi=require('joi');

const putValidation=Joi.object().keys({
    name:Joi.string().trim().min(6).required(),
   // password:Joi.string().trim().min(6).required(),
    email:Joi.string().email().required(),
    manager:Joi.boolean(),
    id:Joi.number().integer().required()
})

const postValidation=Joi.object().keys({
    name:Joi.string().trim().min(6).required(),
    password:Joi.string().trim().min(6).required(),
    email:Joi.string().email().required(),
    manager:Joi.boolean(),
    id:Joi.number().integer().required()
})

const deleteValidation=Joi.object().keys({
    id:Joi.number().integer().required()
})

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

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

route.get('/users', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( u => {
            if (u.manager) {
                Users.findAll()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Only manager can do see user list!"});
            }
        })
        .catch( err => res.status(500).json(err) );

    
});
route.post('/users', (req, res) => {
    postValidation.validateAsync(req.body)
        .then(succ=>{
                Users.create({ name: req.body.name, email: req.body.email, password: req.body.password, manager: req.body.manager })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );

            })
            .catch( err => res.status(500).json({msg:"Validation error!"} ));

});
route.get('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});
route.put('/users/:id', (req, res) => {
    putValidation.validateAsync(req.body)
        .then(succ=>{
            Users.findOne({ where: { id: req.user.userId } })
                .then( u => {
                    if (u.manager) {
                        Users.findOne({ where: { id: req.params.id } })
                        .then( usr => {
                            usr.name = req.body.name;
                            usr.email = req.body.email;
                            usr.manager=req.body.manager;
                            usr.save()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json({msg:"That ID does not exist!"}) );
                    } else {
                        res.status(403).json({ msg: "Only manager can do that!"});
                    }
                })
                .catch( err => res.status(500).json({msg:"Validation error!1111111"}) );
            })
            .catch( err => res.status(500).json({msg:"Validation error!"} ));


});

route.delete('/users/:id', (req, res) => {


        Users.findOne({ where: { id: req.user.userId } })
        .then( u => {
            if (u.manager) {
            Users.findOne({ where: { id: req.params.id } })
            .then( usr => {
                usr.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json({msg:""}) );
            })
            .catch( err => res.status(500).json({msg:"Error bad ID!"}) );
            } else {
                res.status(403).json({ msg: "Only manager can do that!"});
            }
        })
                    

    
    
});

module.exports = route;