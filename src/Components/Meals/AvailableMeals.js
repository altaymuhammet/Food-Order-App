import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://food-order-app-6f5a4-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();

        const loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (newError) {
        setIsLoading(false);
        setError(newError.message);
      }
    };
    fetchMeals();
  }, []);

  if (error) {
    return (
      <section className={classes.error}>
        <p style={{textAlign: 'center', color:"red", fontWeight: "bold"}}>{error}</p>
      </section>
    );
  }

  const mealsList = isLoading ? (
    <p style={{ textAlign: "center" }}>Loading...</p>
  ) : (
    meals.map((meal) => {
      return (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          price={meal.price}
          description={meal.description}
        />
      );
    })
  );

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
