const express = require('express')
const router = express.Router();


// Article model
let { articleModel, articlesWithContent, articlesNoContent } = require('../models/Article');

// CREATE article
router.route('/').post((req, res, next) => {
    const { title, content, description } = req.body

    if (!title || !content) {
        return res.status(400).send('TITLE and CONTENT are required');
    }

    if (!description) {
        req.body.description = null;
    }

    articleModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // console.log(data);
            res.json(data);
        }
    })
});

// GET articles
router.route('/').get((req, res, next) => {
    const { content } = req.query;
    let articlesProjection;

    if (content) {
        articlesProjection = articlesWithContent
    } else {
        articlesProjection = articlesNoContent
    }

    articleModel.find({}, articlesProjection, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // console.log(data);
            res.json(data);
        }
    })
})

// GET article by ID
router.route('/:id').get((req, res, next) => {
    const { content } = req.query;
    let articlesProjection;

    if (content) {
        articlesProjection = articlesWithContent
    } else {
        articlesProjection = articlesNoContent
    }

    articleModel.findById(req.params.id, articlesProjection, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // console.log(data);
            res.json(data);
        }
    })
})

// GET article by TITLE
router.route('/title/:title').get((req, res, next) => {
    const { content } = req.query;
    let articlesProjection;

    if (content) {
        articlesProjection = articlesWithContent
    } else {
        articlesProjection = articlesNoContent
    }

    articleModel.find({title: req.params.title}, articlesProjection, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // console.log(data);
            res.json(data);
        }
    })
})

// UPDATE article by TITLE
router.route('/edit/:title').post((req, res, next) => {
    const { content } = req.body
    articleModel.findOneAndUpdate(
        {title: req.params.title},
        {content: content},
        {new: true, useFindAndModify: false},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                // console.log(data);
                res.json(data);
            }
        })
})

// DELETE article by ID
router.route('/:id').delete((req, res, next) => {
    articleModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // console.log(data);
            res.status(200).json({
                msg: data
            })
        }
    })
})

// DELETE article by TITLE
router.route('/title/:title').delete((req, res, next) => {
    articleModel.findOneAndDelete({title: req.params.title}, {}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // console.log(data);
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;
