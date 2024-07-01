import { config } from 'dotenv';
config();

console.log('Stripe Private Key:', process.env.STRIPE_PRIVATE_KEY); // Añade esta línea para depurar

export const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;