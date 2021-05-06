import React,{useState} from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import CardSection from './CardSection';

export default function CheckoutForm() {
    const[error,setError]=useState()
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make  sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);

        if (result.error) {
            setError(result.error.message)
        } else {
            function stripeTokenHandler(token) {
                const paymentData = { token: token.id };
                axios.post('/stripe/voygeur', paymentData).then(response=>alert(response.data))
            }
            stripeTokenHandler(result.token);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <CardSection />
            {error}<br />
            <button className="text-white" disabled={!stripe}>Payer</button>
        </form>
    );
}