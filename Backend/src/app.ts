import express from 'express';
import userRoute from './routes/user.route';
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors({ origin: 'http://localhost:4000' }));

app.use(userRoute);
app.get('/', (_request, response) => {
  response.send({ API_Status: 'ok' });
});

export default app;
