// import package dependencies
import mongoose from 'mongoose';

var Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: String,
    description: String
});

export default mongoose.model('Hero', Schema);