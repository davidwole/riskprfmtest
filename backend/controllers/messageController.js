const Message = require("../models/messageModel");

const getMessages = async(req, res) => {
    const Messages = await Message.find();

    res.status(200).json(Messages)
}

const getSingleMessage = async(req, res) => {
    const allMessages = await Message.findById(req.params.id);

    res.json(allMessages)
}

const createMessage = async(req, res) => {
    const newMessage = await Message.create(req.body);

    res.json(newMessage);
}

const deleteMessage = async(req, res) => {
    const deleteMessge = await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({message: 'User deleted successfully'});
}

module.exports = {
    getMessages,
    getSingleMessage,
    createMessage,
    deleteMessage
}