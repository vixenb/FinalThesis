import * as Config from "../../configuration";

// // Helpers
// import { PersistentStorageHelper } from "../helpers";

// https://test.mplatform.solutions/
export const cashlessEnv = Config.getEnvVars();
const appSlug = "eventwallet";

const eventWallet = `${cashlessEnv.host}modules/eventwallet/api/v1`;

const artistsView = `${eventWallet}/artists`;
const artistDetails = `${eventWallet}/artists/details`;
const scheduleView = `${eventWallet}/schedules`;
const stagesView = `${eventWallet}/stages`;

export const getArtists = async () => {
  const bodyData = {
    client_slug: cashlessEnv.CLIENT_SLUG
  };

  const response = await fetch(artistsView, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Language": "en",
      "X-Authorization": cashlessEnv.xAuthorization
    },
    body: JSON.stringify(bodyData)
  });
  return await response.json();
};

export const getArtistDetails = async (artistId) => {
  const bodyData = {
    id: artistId,
    client_slug: cashlessEnv.CLIENT_SLUG
  };

  const response = await fetch(artistDetails, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Language": "en",
      "X-Authorization": cashlessEnv.xAuthorization
    },
    body: JSON.stringify(bodyData)
  });
  return await response.json();
};

export const getSchedule = async () => {
  const bodyData = {
    client_slug: cashlessEnv.CLIENT_SLUG,
    app_slug: appSlug
  };

  const response = await fetch(scheduleView, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Language": "en",
      "X-Authorization": cashlessEnv.xAuthorization
    },
    body: JSON.stringify(bodyData)
  });
  return await response.json();
};

export const getStages = async () => {
  const bodyData = {
    client_slug: cashlessEnv.CLIENT_SLUG
  };

  const response = await fetch(stagesView, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Language": "en",
      "X-Authorization": cashlessEnv.xAuthorization
    },
    body: JSON.stringify(bodyData)
  });
  return await response.json();
};
