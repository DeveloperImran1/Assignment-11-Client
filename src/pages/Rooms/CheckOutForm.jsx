// CheckOutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";

const CheckOutForm = ({ PricePerNight, setShowConfirmModal, setOpenModal }) => {
    const stripe = useStripe();
    const elements = useElements()
    const [error, setError] = useState('')

    const [transactionId, setTransactionId] = useState('')

    const { user } = useContext(AuthContext)
    const [clientSecret, setClientSecret] = useState('')
    console.log('checkoutform js file theke', PricePerNight)

    useEffect(() => {
        if (PricePerNight > 0) {
            axios.post('http://localhost:5000/create-payment-intent', { price: PricePerNight })
                .then(res => {
                    console.log(res.data.clientSecret)
                    console.log(res.data)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [PricePerNight])




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('Payment error', error)
            setError(error.message)
        }
        else {
            console.log('Payment method', paymentMethod)
            setError('')
        }


        //  confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log("Confirm error")
        }
        else {
            console.log('Payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('Transiction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)
                setOpenModal(false)
                setShowConfirmModal(true)

            }
        }



    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        }
                    }
                }}
            > </CardElement>

            <button type="submit" className="btn btn-secondary mt-5" disabled={!stripe} >Pay</button>
     
            <p className="text-red-500" >{error}</p>
            <p className="text-green-500" >Your Transaction Id: {transactionId}</p>
        </form>
    );
};

export default CheckOutForm;