const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Favorites = require('../models/favorite');
var authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get( cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favorites.find({ user: req.user._id })
    .populate('user')
    .populate('dishes')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
    .then( (favorites) => {
        if( favorites.length === 0 ) {
            Favorites.create({
                user: req.user._id,
                dishes: req.body
            })
            .then( (userFavorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(userFavorites);
            }, (err) => next(err))
        }
        else {
            let newFavs = req.body;
            newFavs.forEach( newFav => {
                if( !favorites[0].dishes.includes( newFav._id ) ) {
                    favorites[0].dishes.push( newFav )
                }
            });
            favorites[0].save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites[0]);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({ user: req.user._id })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

favoriteRouter.route('/:favoriteId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(  cors.cors, authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/:favoriteId');
})
.post( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
    .then( (favorites) => {
        if( favorites.length === 0 ) {
            Favorites.create({
                user: req.user._id,
                dishes: [ { "_id": req.params.favoriteId } ]
            })
            .then( (userFavorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(userFavorites);
            }, (err) => next(err))
        }
        else {
            let newFav = { "_id": req.params.favoriteId };
            if( !favorites[0].dishes.includes( newFav._id ) ) {
                favorites[0].dishes.push( newFav );
                favorites[0].save();
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites[0]);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/:favoriteId');
})
.delete( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
    .then( (favorites) => {
        if( favorites.length === 0 ) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites[0]);
        }
        else {
            let newFav = { "_id": req.params.favoriteId };
            let deleteIndex = favorites[0].dishes.indexOf( newFav._id )
            if( deleteIndex === -1 ) {

                err = new Error('Favourite ' + req.params.favoriteId + ' not found');
                err.status = 404;
                return next(err);
            }
            else {
                favorites[0].dishes.splice( deleteIndex, 1 );
                favorites[0].save();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites[0]);
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = favoriteRouter;
