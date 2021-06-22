import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../App';
import './Shipment.css';
const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        console.log(data)
    };
    console.log(watch("example")); 
    return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}> 

      <input placeholder='Enter your name' defaultValue={loggedInUser.name} {...register("name", { required: true })} /> 
      {errors.name && <span className="error text-start">This name field is required</span>}

      <input placeholder='Enter your email' defaultValue={loggedInUser.email} {...register("email", { required: true })} /> 
      {errors.email && <span className="error text-start">This email field is required</span>}

      <input placeholder='Enter your address' {...register("address", { required: true })} /> 
      {errors.address && <span className="error text-start">This address field is required</span>}

      <input placeholder='Enter your phone number' {...register("phone", { required: true })} /> 
      {errors.phone && <span className="error text-start">This phone field is required</span>}
        
      <input type="submit" />

    </form>
    );
};

export default Shipment;