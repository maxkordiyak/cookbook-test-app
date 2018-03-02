const express = require('express');
const router = express.Router();
const _ = require('lodash');

const Recipe = require('../../models/recipe');

router.get('/', function(req, res) {
    const { page = 1, limit = 10, query = '', sort = '' } = req.query;

    Recipe.paginate(Object.assign({}, query ? _.omitBy(JSON.parse(query), _.isEmpty) : {}), { page, limit: parseInt(limit), sort: sort ? JSON.parse(sort) : '' })
        .then(result => {
            res.json({
                data: result.docs,
                pagination: {
                    page: result.page,
                    pageCount: result.pages
                }
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', function(req, res) {
    const { id } = req.params;

    Recipe.findById(id)
        .exec()
        .then(recipe => {
            res.json({
                data: recipe
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/', function(req, res) {
    new Recipe(Object.assign(req.body))
        .save()
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/:id', function(req, res) {

    Recipe.findByIdAndUpdate(req.params.id, Object.assign(req.body))
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', function(req, res) {
    Recipe.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
