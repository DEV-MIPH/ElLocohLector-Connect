import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (req: Request, res: Response): Promise<void> => {
  const { to, subject, text, html } = req.body;
  console.log('Enviando correo a:', req.body);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
    res.status(200).json({ message: 'Correo enviado', info: info.response });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Error al enviar el correo', details: error.message });
    } else {
      res.status(500).json({ error: 'Error al enviar el correo', details: 'Unknown error' });
    }
  }
};
