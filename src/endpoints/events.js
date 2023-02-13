import * as Config from "../../configuration";


export const eventEnv = Config.getEnvVars();

const artists = `${eventEnv.host}artist`;
const schedule = `${eventEnv.host}schedules`;
const stages = `${eventEnv.host}stage`;
const token = `${eventEnv.host}tokens`;

export const getArtists = async () => {
  const response = await fetch(artists);
  return await response.json();
};

export const getArtistDetails = async (id) => {
  const response = await fetch(`${artists}/${id}`);
  return await response.json();
};

export const getSchedule = async () => {
  const response = await fetch(schedule);
  return await response.json();
};

export const getStages = async () => {
  const response = await fetch(stages);
  return await response.json();
};

export const getTokens = async () => {
  const response = await fetch(token);
  return await response.json();
};

export const saveToken = async (id) => {
  const bodyData = {
    token_id: id
  };

  const response = await fetch(token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyData)
  });
  return await response.json();
};
