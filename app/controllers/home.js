const express = require('express');
const router = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use('/', router);
  app.use(bodyParser.urlencoded({ extended: false}));
};

router.get('/', (req, res, next) => {
  db.sequelize.query('SELECT * FROM public."Articles"', {
    model: db.Article,
    mapToModel: true // pass true here if you have any mapped fields
  })
  .then((articles) => { 
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

router.get('/cars', (req, res, next) => {
  db.sequelize.query('SELECT * FROM public.cars', {
    model: db.Car,
    mapToModel: true // pass true here if you have any mapped fields
  })
  .then((cars) => { 
    res.render('cars', {
      title: 'Generator-Express MVC',
      cars: cars
    });
  });
});

router.post('/add_car', (req, res, next) => {
  var id = req.body.id;
  var mark = req.body.mark;
  var year = req.body.year;

  // INSERT INTO public.cars
  // VALUES (4, 'Toyota', 1999)
  db.sequelize.query('INSERT INTO public.cars ' +
    'VALUES (' + id + ', \'' + mark + '\', ' + year + ');' , 
  {
    model: db.Car,
    mapToModel: true // pass true here if you have any mapped fields
  })
  .then(() => { 
    res.redirect('localhost:3000/cars');
  });
});