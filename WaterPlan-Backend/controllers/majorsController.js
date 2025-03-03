const User = require('../models/User')
const Major = require('../models/Major')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all majors
// @route GET /majors
// @access Private
const getAllMajors = asyncHandler(async (req, res) => {
    const majors = await Major.find().lean()
    if (!majors?.length) {
        return res.status(400).json({ message: 'No majors found'})
    }
    res.json(majors)
})

// @desc Crease new major
// @route POST /majors
// @access Private
const createNewMajor = asyncHandler(async (req, res) => {
    const { name, year, oav, mav, mathCredits, otherCredits, courses} = req.body

    // Confirm data
    if (!name || !oav || !mav || !mathCredits || !otherCredits || !Array.isArray(courses)) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate
    const duplicate = await Major.findOne({ name, year }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate major' })
    }

    const majorObject = { name, year, oav, mav, mathCredits, otherCredits, courses}

    // Create and store new major
    const major = await Major.create(majorObject)

    if (major) { //created
        res.status(201).json({ message: `New major ${name} created` })
    } else {
        res.status(400).json({ message: `Invalid major data received` })
    }
})

// @desc Update a major
// @route PATCH /majors
// @access Private
const updateMajor = asyncHandler(async (req, res) => {
    const { id, name, year, oav, mav, mathCredits, otherCredits, courses } = req.body

    // Confirm data
    if (!id || !name || !oav || !mav || !mathCredits || !otherCredits || !Array.isArray(courses) || !courses.length) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    const major = await Major.findById(id).exec()

    if (!major) {
        return res.status(400).json({ message: 'Major not found'})
    }

    // Check for duplicate
    const duplicate = await Major.findOne({ name, year}).lean().exec()
    // Allow updates to the original major
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate major' })
    }

    major.name = name
    major.year = year
    major.oav = oav
    major.mav = mav
    major.mathCredits = mathCredits
    major.otherCredits = otherCredits
    major.courses = courses

    const updatedMajor = await major.save()

    res.json({ message: `${updatedMajor.name} for year ${updatedMajor.year} updated!`})
})

// @desc Delete a major
// @route DELETE /majors
// @access Private
const deleteMajor = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Major ID required' })
    }

    const major = await Major.findById(id).exec()

    if (!major) {
        return res.status(400).json({ message: 'Major not found'})
    }

    const result = await major.deleteOne()

    const reply = `Major ${result.name} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllMajors,
    createNewMajor,
    updateMajor,
    deleteMajor
}