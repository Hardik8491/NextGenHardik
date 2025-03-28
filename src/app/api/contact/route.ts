
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';



export async function POST(req: NextRequest) {
     const reqBody = await req.json();
     
    const { name, email, message } =reqBody;
  
      

    //Create transporter for sending email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Change this according to the email service you use
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: email, // Sender's email address
      to: 'hardikbhammar808@gmail.com', // Recipient's email address (your email)
      subject: `New Message from ${name}`, // Subject line
      text: `
        You have received a new message!
    
        Name: ${name}
        Email: ${email}
    
        Message:
        ${message}
      `, // Body of the email with proper formatting for readability
    };
    

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return NextResponse.json({
      message: 'Email sent successfully!',
        success: true,  
      });
 
    } catch (error: any) {
      console.error(error);
      NextResponse.json({ message: 'Error sending email', error: error.message },{ status: 500 });
    }
 
}
