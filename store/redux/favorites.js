import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
  },
  reducers: {
    //action carries the extra data/payload
    addFavorite: (state, action) => {
      console.log("addFavorite method called in store");
      state.ids.push(action.payload.id);
    },
    removeFavorite: (state, action) => {
      console.log("removeFavorite method called in store");
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

//export reducers in order to dispatch from other components
export const addFavorite = favoriteSlice.actions.addFavorite;
export const removeFavorite = favoriteSlice.actions.removeFavorite;

export default favoriteSlice.reducer;
