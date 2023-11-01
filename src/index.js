import express from 'express';
import path from 'path'
import router from './routes/payment.route.js';
import cors from 'cors'

const app = express()

app.use('/', express.static('src/public'));
app.use(cors());
app.use(express.json());
app.use(router)

const STATIC = path.resolve('src/public');

app.use(express.static(STATIC));

app.get('*', (_, res) => {
  res.sendFile(path.join('src/public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Escuchando el puerto 3001')
})

