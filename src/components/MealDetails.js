import React from 'react';

const MealDetails = (props) => {
    // console.log(props.meal)
    const meal = props.meal;
    return (
        
            <div class="card col-lg-3 col-md-6 m-5 p-5 align-items-center">
                    <img src={meal.strMealThumb} alt="" height='150px' width='150px'/>
                    <div class="card-body">
                    <h5 class="card-title">{meal.strArea}</h5>
                    </div>
            </div>
            
    );
};

export default MealDetails;