import mercadopago from 'mercadopago'
import dotenv from 'dotenv'
dotenv.config()

export const createOrder = async (req, res) => {

    let data = req.body.items
    let itemss = []

    data.forEach(element => {
        let item = {
            title: element.product.name,
            quantity: element.cantidad,
            currency_id: 'ARS',        
            unit_price: element.product.price}
        itemss.push(item)
    });
    
    mercadopago.configure({
        access_token: 'APP_USR-7164111176476079-103013-c07b7b3052b41805a443030050951190-1105995931',
    })
    
    const result = await mercadopago.preferences.create({
        items: itemss,
        back_urls: {
            success:'http://localhost:3000/success',
            failure:'http://localhost:3000/failure',
            pending:'http://localhost:3000/pending'
        },
        notification_url: 'https://379f-190-16-205-196.ngrok.io/web-hook'
    })

    console.log(result)

    console.log(itemss)

    res.json({ message: result.body.init_point});
}

export const healthCheck = async (req, res) => {
    res.status(200).send("OK");
}

export const receiveWebhook = async (req, res) => {
    const payment = req.query

    if (payment.type === 'payment') {
        const data = await mercadopago.payment.findById(payment['data.id']);
        console.log(data)
    }
    res.sendStatus(204)
}