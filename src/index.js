import express from 'express';
import router from './routes/payment.route.js';
import cors from 'cors'

const app = express()

app.use(cors());
app.use(express.json());
app.use(router)
app.use(express.static('src/public'));


app.listen(3001, () => {
    console.log('Escuchando el puerto 3001')
})

