import express from 'express';
import morgan from 'morgan'
import router from './routes/payment.route.js';
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(router)

app.listen(PORT, () => {
console.log('Escuchando el puerto 3000')
})

