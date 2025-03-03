const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const blockSchema = new mongoose.Schema(
    {
        major: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Major'
        },
        numberNeeded: {
            type: Number,
            required: true
        },
        courses: [{
            type: String,
            required: true
        }]
    }
)

blockSchema.plugin(AutoIncrement, {
    inc_field: 'number',
    id: 'blockNum',
})

module.exports = mongoose.model('Block', blockSchema)