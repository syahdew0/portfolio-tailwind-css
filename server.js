const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Endpoint untuk mengirim email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Buat transporter menggunakan email dan password pengguna
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            name: name,
            user: email,      // Email dari form
            text: message    
        }
    });

    const mailOptions = {
        from: email, // Pengirim adalah email dari form
        to: 'rezasyahdewo@gmail.com', // Tujuan email
        subject: `Pesan dari ${email}`, // Subjek email
        text: message // Pesan email
    };

    // Kirim email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            return res.status(500).json({ message: 'Gagal mengirim email', error: error.message });
        } else {
            console.log('Email terkirim: ' + info.response);
            return res.status(200).json({ message: 'Email berhasil dikirim' });
        }
    });
});

// Jalankan server
app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});
