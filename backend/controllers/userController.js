const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); 
const { default: mongoose } = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Invite = require('../models/inviteModel');

// Token for user authentication
const createToken = (_id) => {
    const token = jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});

    return token;
}

const generateUniqueToken = () => {
    return crypto.randomBytes(16).toString('hex');
}

  
const  sendInvitationEmail = (email, invitationLink) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service:'yahoo',
        secure: true,
        auth: {
          user: 'davidoluwole67@yahoo.com', // replace with your email
          pass: 'ssjjzhhzrtnjlqcn', // replace with your password
        },
      });
    
      const mailOptions = {
        from: 'davidoluwole67@yahoo.com',
        to: email,
        subject: 'Invitation to Join My App',
        text: `Click the following link to create your account: ${invitationLink}`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending invitation email:', error);
        } else {
          console.log('Invitation email sent:', info.response);
        }
      });}

// Gets all users
const getAllUsers = async(req, res) => {
    const users = await User.find();

    res.json(users);
}


// Gets a single user
const getSingleUser = async (req, res) => {
    const singleUser = await User.findById(req.params.id);

    res.status(200).json(singleUser);
}

// Invite user 

const inviteUser = async (req, res) => {
    const { email } = req.body;

    try {
  
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists.' });
        }
      
        // Generate a unique token for the invitation
        const token = generateUniqueToken();
      
        // Set the expiration date for the invitation (e.g., 24 hours)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);
      
        // Save the invitation in the database
        const invite = new Invite({ email, token, expiresAt });
        await invite.save();
      
        // Send an email to the new user with the invitation link
        const invitationLink = `https://riskprfm.com/register/${token}`;
        sendInvitationEmail(email, invitationLink);
      
        res.json({ message: 'Invitation sent successfully.', link: invitationLink });
    } catch(error){
        res.status(400).json({error: error});
    }
}

const reqigsterwithToken = async (req, res) => {
    const { token } = req.params;
    const { name, email, password } = req.body;

    try{
  
        // Validate the token and check if it's still valid
        const invite = await Invite.findOne({ token, expiresAt: { $gt: new Date() } });
        if (!invite) {
          return res.status(400).json({ message: 'Invalid or expired invitation token.' });
        }
      
        // Create a new user with the provided details
        const newUser = await User.signup(name, email, password);
      
        // Remove the used invitation from the database
        await Invite.findByIdAndDelete(invite._id);
      
        res.json({ message: 'User registered successfully.' });

    } catch(error){
        res.status(400).json({error: error});
    }
}
  

// Signup User
const signupUser = async(req, res) => {
    const { name, email, password } = req.body;
    

    try {
        const user = await User.signup(name, email, password);
        const token = createToken(user._id);

        res.status(200).json({
            name,
            email,
            token
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

// Logins user
const loginUser = async (req, res) => {
    const { email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        const body = {
            user: user._id,
            ip: req.ip
        };
        const name = user.name;
        const id = user._id;

    

        res.status(200).json({id, name, email, token});
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// edit user information
const editUser = async(req, res) => {
        const {name, email, sameEmail} = req.body;
    
        if(!name || !email){
          return res.status(400).json({error: 'Please fill in the field'});
        }
      
        const exists = User.find({ email: req.body.email });
   
        
        
        
    try {
        const editedUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(editedUser)
        
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
}

const findInviteEmail = async (req, res) => {
    const invite = await Invite.find({ token: req.params.token});
    res.status(200).json({email: invite[0].email})
}

// Deletes a user
const deleteUser = async(req, res) => {
    try {
        const editedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'User deleted successfully'})
        
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
}
module.exports = {
    loginUser,
    inviteUser,
    reqigsterwithToken,
    signupUser,
    getAllUsers,
    getSingleUser,
    editUser,
    deleteUser,
    findInviteEmail
}
