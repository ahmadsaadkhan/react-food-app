import { useEffect, useState } from 'react'
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState('')

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("https://food-app-24a38-default-rtdb.firebaseio.com/meals.json")
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch((error) => {
      setIsLoading(false)
      setIsError(error.message)
    });
  }, []);


  if (isLoading) {
    return <section className={classes.Mealsloading}><p>Loading ...</p></section>
  }
  if (isError) {
    return <section className={classes.Mealsloading}><p>Api not working ...</p></section>
  }

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))
  return (
    <section className={classes.meals}>
      <ul>
        <Card>
          {mealList}
        </Card>
      </ul>
    </section>
  );
}

export default AvailableMeals;