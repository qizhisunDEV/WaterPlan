const express = require('express')
const router = express.Router()
const majorsController = require('../controllers/majorsController')

router.route('/')
    .get(majorsController.getAllMajors)
    .post(majorsController.createNewMajor)
    .patch(majorsController.updateMajor)
    .delete(majorsController.deleteMajor)

module.exports = router