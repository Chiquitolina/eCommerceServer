import express from 'express';
import router from './routes/payment.route.js';
import cors from 'cors'

const app = express()

app.use(express.static('src/public'));
app.use(cors());
app.use(express.json());
app.use(router)


app.listen(3000, () => {
    console.log('Escuchando el puerto 3001')
})

