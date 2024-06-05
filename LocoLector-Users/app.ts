import express from 'express';
import admin from './services/firebaseConfig';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Ruta protegida
app.get('/protected', async (req, res) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).send('No token provided.');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return res.status(200).send(`Hello, ${decodedToken.email}`);
  } catch (error) {
    return res.status(401).send('Invalid token.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
