const express = require('express')
const router = express.Router()
const blocksController = require('../controllers/blocksController')

router.route('/')
    .get(blocksController.getAllBlocks)
    .post(blocksController.createNewBlock)
    .patch(blocksController.updateBlock)
    .delete(blocksController.deleteBlock)

module.exports = router
