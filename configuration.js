import Constants from "expo-constants";

const ENV = {
  dev: {
    host: "https://webserviceevent20230213163542.azurewebsites.net/api/"
  },
  staging: {
    host: "https://webserviceevent20230213163542.azurewebsites.net/api/"
  },
  prod: {
    host: "https://webserviceevent20230213163542.azurewebsites.net/api/"
  }
};

//   dev: {
//     host: "https://test.mplatform.solutions/",
//     xAuthorization: "ymRZ2AXdLoT6Kx3uISMAtWWy96N298b0ZEX2Pgkk",
//     MID: "KRUNO_MID_1",
//     TID: "KRUNO_TID_1",
//     CLIENT_SLUG: "superuho_festival",
//     onesignal: {
//       appId: "8598d2a8-f87d-4ea7-9e82-c98566e50568",
//       googleProjectNumber: "63760154567",
//       restApiKey: "ZWM1ZGVlODItMjQ5OS00Y2Y1LWJmN2EtYTE2OWE0NTkwMTY4",
//       large_icon:
//         "https://storage.mplatform.solutions/fcommunication/photo/20190404154322_3af91f09-608b-4c88-b527-6b3963a77a98.jpeg"
//     },
//     firebase: {
//       apiKey: "AIzaSyCjr464e3q6JvdUlZ0YrpnQzS76HGsLTMg",
//       authDomain: "ew-conferences.firebaseapp.com",
//       databaseURL: "https://ew-conferences.firebaseio.com/",
//       projectId: "ew-conferences",
//       storageBucket: "ew-conferences.appspot.com"
//     },
//     paymentGateway: {
//       merchantId: "EWMID2",
//       secretKey: "User10##",
//       host: "https://mcheckouttest.mstart.hr:9443/",
//       endpoint: "icheckout2/confirm.xhtml"
//     }
//   },
//   staging: {
//     host: "https://test.mplatform.solutions/",
//     xAuthorization: "ymRZ2AXdLoT6Kx3uISMAtWWy96N298b0ZEX2Pgkk",
//     MID: "ZATON",
//     TID: "APK0001",
//     CLIENT_SLUG: "superuho_festival",
//     onesignal: {
//       appId: "8598d2a8-f87d-4ea7-9e82-c98566e50568",
//       googleProjectNumber: "63760154567",
//       restApiKey: "ZWM1ZGVlODItMjQ5OS00Y2Y1LWJmN2EtYTE2OWE0NTkwMTY4",
//       large_icon:
//         "https://storage.mplatform.solutions/fcommunication/photo/20190404154322_3af91f09-608b-4c88-b527-6b3963a77a98.jpeg"
//     },
//     firebase: {
//       apiKey: "AIzaSyCjr464e3q6JvdUlZ0YrpnQzS76HGsLTMg",
//       authDomain: "ew-conferences.firebaseapp.com",
//       databaseURL: "https://ew-conferences.firebaseio.com/",
//       projectId: "ew-conferences",
//       storageBucket: "ew-conferences.appspot.com"
//     },
//     paymentGateway: {
//       merchantId: "EWMID2",
//       secretKey: "User10##",
//       host: "https://mcheckouttest.mstart.hr:9443/",
//       endpoint: "icheckout2/confirm.xhtml"
//     }
//   },
//   prod: {
//     host: "https://mplatform.solutions/",
//     xAuthorization: "ymRZ2AXdLoT6Kx3uISMAtWWy96N298b0ZEX2Pgkk",
//     MID: "ZATON",
//     TID: "APK0001",
//     CLIENT_SLUG: "superuho_festival",
//     onesignal: {
//       appId: "bf506201-2568-4546-bc5d-c19165b704c3",
//       googleProjectNumber: "944013683807",
//       restApiKey: "NTI1YmMzNGUtZDI0OC00NDI5LThiOGItY2MwNzE3ODVkNTc0",
//       large_icon:
//         "https://storage.mplatform.solutions/fcommunication/photo/20190404154322_3af91f09-608b-4c88-b527-6b3963a77a98.jpeg"
//     },
//     firebase: {
//       apiKey: "AIzaSyCw4csNfIaiRJVg0nnrPoLCY6RPitWWxRM",
//       authDomain: "ew-conferences-prod.firebaseapp.com",
//       databaseURL: "https://ew-conferences-prod.firebaseio.com/",
//       projectId: "ew-conferences-prod",
//       storageBucket: "ew-conferences-prod.appspot.com"
//     },
//     paymentGateway: {
//       merchantId: "THOMID",
//       secretKey: "WYNiZP2z0htBnvf",
//       host: "https://mcheckout.mstart.hr/",
//       endpoint: "icheckout2/confirm.xhtml"
//     }
//   }
// };

export const getEnvVars = () => {
  // TODO: BUG#1 - na expo sdk 46 vraca null
  // const env = Constants.manifest.releaseChannel;

  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  // eslint-disable-next-line no-undef

  // TODO: BUG#1 - nastavak
  // if (__DEV__) {
  //   return ENV.dev;
  // } else if (env === "staging") {
  //   return ENV.staging;
  // } else if (env === "prod") {
  //   return ENV.prod;
  // }

  // Ako se ne specificira channel, publisha se na `default` channel
  return ENV.dev;
};
