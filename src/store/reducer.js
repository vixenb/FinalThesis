import { createContext } from "react";

import { actions } from "./actions";
// import { initialState } from "./initial-state";

export const StoreContext = createContext(null);

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.START_LOADER:
      return {
        ...state,
        isLoading: true
      };
    case actions.END_LOADER:
      return {
        ...state,
        isLoading: false
      };

    case actions.SET_ARTISTS:
      return {
        ...state,
        artists: action.payload,
        isLoading: false
      };

    case actions.SET_FAVOURITES:
      return {
        ...state,
        favouriteArtists: action.payload,
        isLoading: false
      };

    case actions.SET_STAGES:
      return {
        ...state,
        stages: action.payload,
        isLoading: false
      };

    case actions.SET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
        isLoading: false
      };
    
    case actions.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
};
