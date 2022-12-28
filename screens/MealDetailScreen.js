import { useContext, useLayoutEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";

import { MEALS } from "../data/dummy-data";
import {addFavorite, removeFavorite} from '../store/redux/favorites';

// import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailScreen({ route, navigation }) {

  //context to provide
  // const favoriteMealsCtx = useContext(FavoritesContext);

  //redux 
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();
  //get the meal id from the route
  const mealId = route.params.mealId;

  //find the meal id that matches the data meal id
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  //find out if the current meal is a favorite or not (meaning the id is in the array);
  //used for context
  // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

  //used for redux
  const mealIsFavorite = favoriteMealIds.includes(mealId);

  /**
   * Accessing methods and properties from our store
   */
  function changeFavoriteStatusHandler() {
    //will change favorite to non-favorite
    if(mealIsFavorite){
      // favoriteMealsCtx.removeFavorite(mealId);
      dispatch(removeFavorite({id: mealId}));
    }else{
      // favoriteMealsCtx.addFavorite(mealId);
      dispatch(addFavorite({id: mealId}))
    }
  }
  useLayoutEffect(() => {
    //note! these are the same options as in the Stack.Screen options object
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
        // return <Button title="Tap me!" onPress={headerButtonPressHandler}/>
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />

          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>

      {/* {selectedMeal.steps.map((step) => (
        <Text key={step}>{step}</Text>
      ))} */}
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
