import React, { useEffect, useState } from 'react';
import MealDetails from './MealDetails';

const MealFinder = () => {
    const [search, setSearch] = useState('');
    const [meals, setMeal] = useState([]);

    useEffect(()=>{
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
            .then(res=>res.json())
            .then(result=>setMeal(result.meals))
    },[search])
     const handleChange = event =>{
        setSearch(event.target.value);
    }
    return (
        <div className='container'>
        <h1 style={{color:'white'}}>Find your Meal in Here</h1>
            <input type="text" onChange={handleChange} placeholder='find food'/>
            <p style={{color:'white'}}>You are Searching for: {search}</p>
            <p style={{color:'white'}}> your Meals list: {meals?.length || 0}</p>
            {/* <img src={meals[0]?.strMealThumb} alt='' height="200px"/> */}
            <div className="row d-flex justify-content-center">
            {
                    meals?.map(meal=><MealDetails meal={meal} key={meal.idMeal}/>)   
            }
            </div>
        </div>
    );
};

export default MealFinder;