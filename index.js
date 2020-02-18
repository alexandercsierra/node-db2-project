const express = require('express');
const server = express();
server.use(express.json());

const db = require('./data/dbConfig')

server.get('/', (req, res)=>{
    db('car-dealer')
        .then(cars => res.status(200).json(cars))
        .catch(err=>{
            console.log(err.message);
            res.status(500).json({message:'server error'})
        })
})

server.get('/:id', ValidateCarId, (req, res)=>{
    getById(req.params.id)
        .then(car => res.status(200).json(car))
        .catch(err=>{
            console.log(err.message);
            res.status(500).json({message:'server error'})
        })
})

server.post('/', ValidateCar, (req, res)=>{
    db('car-dealer').insert(req.body)
        .then(cars => res.status(201).json(cars))
        .catch(err=>{
            console.log(err.message);
            res.status(500).json({message:'server error'})
        })
})

server.put('/:id', ValidateCarId, ValidateCar, (req, res)=>{
    db('car-dealer').where({id: req.params.id}).update(req.body)
        .then(car=>res.status(200).json(car))
        .catch(err=>{
            console.log(err.message);
            res.status(500).json({message:'server error'})
        })
})

server.delete('/:id', ValidateCarId, (req, res)=>{
    db('car-dealer').where({id: req.params.id}).del()
        .then(car=>res.status(200).json(car))
        .catch(err=>{
            console.log(err.message);
            res.status(500).json({message:'server error'})
        })
})


function getById(id){
    return db('car-dealer').where({id}).first();
}

function ValidateCarId (req, res, next){
    getById(req.params.id)
        .then(car => {
            car ? next() : res.status(404).json({message: 'car with that ID does not exist'})
        })
        .catch(err=>{
            console.log(err.message);
            res.status(500).json({message:'there was an error validating the car ID'})
        })
}

function ValidateCar (req, res, next){
    let body = req.body;
    let keys = Object.keys(body);
    if (keys.length === 0){
        res.status(400).json({message: 'must have a car object'})
    }
    if (!body.VIN || !body.make || !body.model || !body.milage){
        res.status(400).json({message: 'car object must contain VIN, make, model, and milage properties'})
    }
    next();
}

const PORT = process.env.PORT || 4001;

server.listen(PORT, ()=>console.log(`listening on port ${PORT}`))