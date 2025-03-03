const User = require('../models/User')
const Block = require('../models/Block')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all blocks
// @route GET /blocks
// @access Private
const getAllBlocks = asyncHandler(async (req, res) => {
    const blocks = await Block.find().lean()
    if (!blocks?.length) {
        return res.status(400).json({ message: 'No blocks found'})
    }
    res.json(blocks)
})

// @desc Crease new block
// @route POST /blocks
// @access Private
const createNewBlock = asyncHandler(async (req, res) => {
    const { major, numberNeeded, courses} = req.body

    // Confirm data
    if (!major || !numberNeeded || !Array.isArray(courses) || !courses.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate
    const duplicate = await Block.findOne({ major, numberNeeded, courses }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate block' })
    }

    const blockObject = { major, numberNeeded, courses}

    // Create and store new block
    const block = await Block.create(blockObject)

    if (block) { //created
        res.status(201).json({ message: `New block of ${major} major created with ${numberNeeded} needed from ${courses}` })
    } else {
        res.status(400).json({ message: `Invalid block data received` })
    }
})

// @desc Update a block
// @route PATCH /blocks
// @access Private
const updateBlock = asyncHandler(async (req, res) => {
    const { id, major, numberNeeded, courses } = req.body

    // Confirm data
    if (!id || !major || !numberNeeded || !Array.isArray(courses) || !courses.length) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    const block = await Block.findById(id).exec()

    if (!block) {
        return res.status(400).json({ message: 'Block not found'})
    }

    // Check for duplicate
    const duplicate = await Block.findOne({ major, numberNeeded, courses }).lean().exec()
    // Allow updates to the original block
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate block' })
    }

    block.major = major
    block.numberNeeded = numberNeeded
    block.courses = courses

    const updatedBlock = await block.save()

    res.json({ message: `$Block for ${updatedBlock.major} major updated!`})
})

// @desc Delete a block
// @route DELETE /blocks
// @access Private
const deleteBlock = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Block ID required' })
    }

    const block = await Block.findById(id).exec()

    if (!block) {
        return res.status(400).json({ message: 'Block not found'})
    }

    const result = await block.deleteOne()

    const reply = `Block ${result.name} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllBlocks,
    createNewBlock,
    updateBlock,
    deleteBlock
}