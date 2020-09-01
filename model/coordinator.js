const mongoose = require('mongoose');
const Joi = require('joi');

const coordinatorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
    portfolio: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
    },
})

const Coord = mongoose.model('Coordinator', coordinatorSchema);

function validateCoord(coord){
    const schema = {
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        portfolio: Joi.string().min(1).required()       
    }

    return Joi.validate(coord, schema);
}

exports.Coord = Coord;
exports.validateCoord = validateCoord;