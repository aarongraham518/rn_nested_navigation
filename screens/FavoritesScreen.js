import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import MealsList from "../components/MealsList/MealsList";
// import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

function FavoritesScreen() {
//   const favoritesMealsCtx = useContext(FavoritesContext);

const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  /**if the id of a meal(raw data) and if the id of a meal is included in the
   * favorited meals id, return true, and the item will be kept in the newly
   * created array that is returned by filter.
   *
   * So filter will return an array with all the meals that have an entry in our ids array
   * in our Context
   *
   */
  const favoriteMeals = MEALS.filter((meal) =>
    // favoritesMealsCtx.ids.includes(meal.id)
    favoriteMealIds.includes(meal.id)

  );

  if(favoriteMeals.length === 0){
      return <View style={styles.rootContainer}>
          <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
  }
  return <MealsList items={favoriteMeals} />;
}
export default FavoritesScreen;

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})
