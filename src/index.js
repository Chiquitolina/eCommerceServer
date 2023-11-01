import express from 'express';
import morgan from 'morgan'
import router from './routes/payment.route.js';
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors());
app.use(express.json());
app.use(router)
app.use(express.static('src/public'));


app.listen(PORT, () => {
    console.log('Escuchando el puerto 3000')
    return {
    status: 200,
    }
})

