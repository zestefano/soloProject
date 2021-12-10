const express = require('express')
const asyncHandler = require('express-async-handler')
const { check } = require('express-validator');

const {setTokenCookie, restoreUser} = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const {User, Comment, Song} = require('../../db/models')

const router = express.Router()


router.post('/', asyncHandler(async(req, res) => {
    const {userId, songId, comment} = req.body;
    const comments = {
        userId,
        songId,
        comment
    }
    const newComment = await Comment.create(comments)
    res.json(newComment)
}))

router.get('/', asyncHandler(async(req, res) => {
    const comments = await Comment.findAll({
        include: [User, Song]
    })
    res.json(comments)
}))


router.delete('/:id(\\d+)', async(req, res) => {
    const comment = await Comment.findByPk(req.params.id, {
        include: User
    })
    await comment.destroy()
    return res.json(comment)
})

module.exports = router;