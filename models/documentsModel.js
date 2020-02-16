'use strict';
let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
let entityName = 'documents';

let EntitySchema = new Schema({
    name: {
        type: String,
        required: "The document must have a name"
    },
    filename: {
        type: String,
        required: "Filename is required"
    },
}, {
    timestamps: true
});

EntitySchema.pre('save', function (next) {
    return next();
});

EntitySchema.plugin(uniqueValidator, {message: '{VALUE} already exist'});
module.exports = mongoose.model(entityName, EntitySchema);
