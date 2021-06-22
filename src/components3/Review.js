import React from 'react';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const history = useHistory()
    const processOrder = () =>{
        history.push("/shipment")
    }
    return (
        <div>
            <button type="button" onClick={() =>processOrder()}>Process to order</button>
            
        </div>
    );
};

export default Review;