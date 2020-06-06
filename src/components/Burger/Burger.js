import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

function Burger(props) {
    let transformedIngredient = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, index) => {
            return <BurgerIngredient key = {igKey + index} type = {igKey} />
        })
    })
    .reduce((arr, ele) => {
       return  arr.concat(ele)
    }, [])
    // console.log(transformedIngredient)

    if(transformedIngredient.length === 0){
        transformedIngredient = "Please Start Adding Ingredients"
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type = 'bread-top' />
            {transformedIngredient}
            <BurgerIngredient type = 'bread-bottom' />
        </div>
    )
}

export default Burger