import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);


const Payment = ({PricePerNight, setShowConfirmModal, setOpenModal}) => {

    return (
        <div>
            <Elements stripe={stripePromise} >
                <CheckOutForm PricePerNight={PricePerNight} setShowConfirmModal={setShowConfirmModal} setOpenModal={setOpenModal} ></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;