import express from 'express';
import morgan from 'morgan'
import path from 'path'
import router from './routes/payment.route.js';
import cors from 'cors'

const app = express()

app.use(morgan('dev'))

app.use('/', express.static('src/public'));
app.use(cors());
app.use(express.json());
app.use(router)

app.listen(3000, () => {
    console.log('Escuchando el puerto 3000')
})

