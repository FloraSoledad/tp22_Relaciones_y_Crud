const path = require('path');
const moment = require('moment');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { title } = require('process');
//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');
//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;
const moviesController = {
    list: (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    new: (req, res) => {
        db.Movie.findAll({
            order : [['release_date', 'DESC']],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    recomended: (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [['rating', 'DESC']]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) { 
        Genres.findAll({
            order : ['name']
        })
            .then(allGenres => {
                return res.render('moviesAdd',{allGenres})
            })
        .catch(error => console.log(error))
      },
    create: function (req, res) {
        const { title, rating, awards, length, release_date, genre_id} = req.body;
        Movies.create({
            title: title.trim(),
            rating,
            awards,
            length,
            release_date,
            genre_id
        }).then(movie => {
            console.log(movie)
            return res.redirect('/movies')
        }).catch(error => console.log(error))
    },
    edit: function (req, res) {
        let Movie = Movies.findByPk(req.params.id)
        let allGenres = Genres.findAll({
            order: ['name']
        });
        Promise.all([Movie, allGenres])
            .then(([Movie,allGenres])=>{
            /*     console.log(Movie)
                console.log(allGenres) */
                console.log(moment(Movie.release_date).format('YYYY-MM-DD'))
                return res.render('moviesEdit',{
                    Movie,
                    allGenres,
                    moment
                })
            })
        .catch(error => console.log(error)) 
    },
    update: function (req, res) {
        return res.send(req.body)
    },
    delete: function (req,res) {},
    destroy: function (req,res) {},
};

module.exports = moviesController;