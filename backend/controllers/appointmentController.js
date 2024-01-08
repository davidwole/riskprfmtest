const Appointment = require("../models/appointmentModel"); 

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
const sendAppointmentEmail = async (appointmentData) => {
  const mailOptions = {
    from: 'davidoluwole67@yahoo.com', // sender address (must be the same as the authenticated user)
    to: 'davidecipher@gmail.com', // recipient email address
    subject: 'Appointment Confirmation',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333; text-align: center;">Appointment Confirmation</h2>
    
    <ul style="list-style: none; padding: 0;">
      <li style="margin-bottom: 10px;">Name: ${appointmentData.name}</li>
      <li style="margin-bottom: 10px;">Email: ${appointmentData.email}</li>
      <li style="margin-bottom: 10px;">Phone: ${appointmentData.phone}</li>
      <li style="margin-bottom: 10px;">Make: ${appointmentData.make}</li>
      <li style="margin-bottom: 10px;">Model: ${appointmentData.model}</li>
      <li style="margin-bottom: 10px;">Service: ${appointmentData.service}</li>
      <li style="margin-bottom: 10px;">Date: ${appointmentData.date}</li>
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


const getAppointments = async(req, res) => {
    const Appointments = await Appointment.find();


    res.json(Appointments)
}

const getSingleAppointment = async(req, res) => {
    const singleAppointment = await Appointment.findById(req.params.id);

    res.json(singleAppointment)
}

const createAppointment = async(req, res) => {
  const appointmentData = req.body;

    const newAppointment = await Appointment.create(req.body);
    
    // Send the email
    try {
        // Send the email
        await sendAppointmentEmail(appointmentData);
        res.status(200).json({ message: 'Appointment created successfully and email sent' });
      } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).json({ error: 'Internal server error' }); 
      }

}

const deleteAppointment = async(req, res) => {
    const deleteAppointment = await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({message: 'User deleted successfully'});
}

module.exports = {
    getAppointments,
    getSingleAppointment,
    createAppointment,
    deleteAppointment
}