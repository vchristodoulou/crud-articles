const express = require('express')
const router = express.Router();


// Category model
let { categoryModel } = require('../models/Category');

// CREATE category
router.route('/').post((req, res, next) => {
    categoryModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // console.log(data);
            res.json(data);
        }
    })
});

// GET categories
router.route('/').get((req, res, next) => {
    categoryModel.find({}, {_id: true, name: true}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // console.log(data);
            res.json(data);
        }
    })
})

// DELETE category by ID
router.route('/:id').delete((req, res, next) => {
    categoryModel.findByIdAndRemove(req.params.id, (error, data) => {
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

// DELETE category by NAME
router.route('/name/:name').delete((req, res, next) => {
    categoryModel.findOneAndDelete({name: req.params.name}, {}, (error, data) => {
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
