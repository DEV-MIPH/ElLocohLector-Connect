// Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./lokolector-firebase.json');

// Inicializar la app de Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Configurar Express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(new Error('No permitido'));
      }
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para logear usuarios
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificar el usuario con Firebase
    const userRecord = await admin.auth().getUserByEmail(email);
    if (!userRecord) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Autenticar el usuario
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    res.status(200).json({ token: customToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para crear un nuevo usuario
app.post('/create-user', async (req, res) => {
  const { email, password, displayName } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
