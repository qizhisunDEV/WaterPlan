const mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose)

const majorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        oav: {
            type: Number,
            required: true
        },
        mav: {
            type: Number,
            required: true
        },
        mathCredits: {
            type: Number,
            required: true
        },
        otherCredits: {
            type: Number,
            required: true
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Block'
        }],
    }, 
    {
        timestamps: true
    }
)
/*
[
    {
        "_id": "67c0904145f65f8e0b1d560b",
        "name": "C&O",
        "year": 2025,
        "oav": 60,
        "mav": 65,
        "mathCredits": 13,
        "otherCredits": 5,
        "courses": [],
        "createdAt": "2025-02-27T16:18:09.427Z",
        "updatedAt": "2025-02-27T16:18:09.427Z",
        "__v": 0
    },
    {
        "_id": "67c0904e45f65f8e0b1d560e",
        "name": "PMATH",
        "year": 2025,
        "oav": 60,
        "mav": 65,
        "mathCredits": 13,
        "otherCredits": 5,
        "courses": [],
        "createdAt": "2025-02-27T16:18:22.720Z",
        "updatedAt": "2025-02-27T16:18:22.720Z",
        "__v": 0
    },
    {
        "_id": "67c0905645f65f8e0b1d5611",
        "name": "AMATH",
        "year": 2025,
        "oav": 60,
        "mav": 65,
        "mathCredits": 13,
        "otherCredits": 5,
        "courses": [],
        "createdAt": "2025-02-27T16:18:30.087Z",
        "updatedAt": "2025-02-27T16:18:30.087Z",
        "__v": 0
    }
]
    */

module.exports = mongoose.model('Major', majorSchema)