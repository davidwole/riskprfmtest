const Message = require("../models/messageModel");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    service:'yahoo',
    secure: true,
    auth: {
      user: 'davidoluwole67@yahoo.com', // your Gmail email address
      pass: 'ssjjzhhzrtnjlqcn', // your Gmail password or an app-specific password
    },
});

// Function to send the email
const sendMessageEmail = async (messageData) => {
  const mailOptions = {
    from: 'davidoluwole67@yahoo.com', // sender address (must be the same as the authenticated user)
    to: 'davidecipher@gmail.com', // recipient email address
    subject: 'New Contact Message',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333; text-align: center;">Contact Message</h2>
    
    <ul style="list-style: none; padding: 0;">
      <li style="margin-bottom: 10px;">Name: ${messageData.name}</li>
      <li style="margin-bottom: 10px;">Email: ${messageData.email}</li>
      <li style="margin-bottom: 10px;">Message: ${messageData.message}</li>
    </ul>
  </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

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
    const messageData = req.body;

   try {
        // Send the email
        await sendMessageEmail(messageData);
        res.status(200).json({ message: 'Message created successfully and email sent' });
      } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).json({ error: 'Internal server error' }); 
      }
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
