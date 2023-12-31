const express = require('express');
const router = express.Router();
const {
    getMessages,
    getSingleMessage,
    createMessage,
    deleteMessage
} = require('../controllers/messageController');

router.get('/', getMessages);
router.get('/:id', getSingleMessage);
router.post('/', createMessage);

module.exports = router; 