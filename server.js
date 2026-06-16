require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'RECEIVER_EMAIL'];
const missingEnv = requiredEnv.filter(key => !process.env[key]);

if (missingEnv.length > 0) {
  console.warn(`Lipsește variabila de mediu: ${missingEnv.join(', ')}`);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Toate câmpurile sunt necesare.' });
  }

  if (missingEnv.length > 0) {
    return res.status(500).json({ success: false, error: 'Mail serverul nu este configurat complet.' });
  }

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: `Mesaj de la ${name} - FinART-Diamant`,
    text: `Nume: ${name}\nEmail: ${email}\nMesaj:\n${message}`,
    html: `<p><strong>Nume:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mesaj:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Mesaj trimis cu succes:');
    console.log(`- Nume: ${name}`);
    console.log(`- Email: ${email}`);
    console.log(`- Mesaj: ${message}`);

    return res.json({ success: true, message: 'Mesaj trimis cu succes. Vei primi confirmarea pe email.' });
  } catch (error) {
    console.error('Eroare la trimiterea emailului:', error);
    return res.status(500).json({ success: false, error: 'Eroare la trimiterea mesajului. Încearcă din nou mai târziu.' });
  }
});

app.listen(port, () => {
  console.log(`Server pornit pe http://localhost:${port}`);
});
