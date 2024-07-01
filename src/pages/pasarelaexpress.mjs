
import { STRIPE_PRIVATE_KEY } from './config.mjs';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_PRIVATE_KEY);



const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: transformedItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error al crear la sesión de pago en Stripe:', error);
    res.status(500).json({ error: 'Hubo un error al crear la sesión de pago en Stripe' });
  }
});

const PORT = 4242;
app.listen(PORT, () => console.log(`Servidor Stripe corriendo en http://localhost:${PORT}`));