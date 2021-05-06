/**
* Use the CSS tab above to style your Element's container.
*/
import React,{useEffect} from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import $ from 'jquery';
import './Styles.css'

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },

    },
};
function CardForm() {
    useEffect(() => {
            $("label").css({
                "color": "#6b7c93",
                "font-weight":"300",
                "letter-spacing":"0.025em",
                "margin-top":"16px",
                "display":"block",
            }
        )
       
    }, [])
    return (
        <label>
            Card details
            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
    );
};
export default CardForm;