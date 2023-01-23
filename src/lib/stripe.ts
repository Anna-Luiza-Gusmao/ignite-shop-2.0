import Stripe from "stripe"

const activeEnv = process.env.STRIPE_SECRET_KEY || '';

export const stripe = new Stripe(activeEnv, {
    apiVersion: '2022-11-15',
    appInfo: {
        name: 'Ignite Shop'
    }
})