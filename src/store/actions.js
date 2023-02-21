export const actions = {
  START_LOADER: "start loader",
  END_LOADER: "end loader",
  SET_ARTISTS: "set artists",
  SET_SCHEDULE: "set schedule",
  SET_STAGES: "set stages",
  SET_FAVOURITES: "set favourites",
  SET_NOTIFICATIONS: "set notifications",
  SET_USER_CARD: "set card"

};

export const createAction = (type, payload) => {
  return {
    type,
    payload
  };
};
