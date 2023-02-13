import React, { useContext } from "react";
import { View, SafeAreaView, FlatList, ActivityIndicator, Image } from "react-native";

//  Components
import { ArtistGridItem } from "../../components/molecules";
import { Btn } from "../../components/atoms";

//  Styles
import { Colors, SharedStyles } from "../../styles";

//  Vector icon
import { Entypo } from "@expo/vector-icons";

//  Shuffle - lodash
import { shuffle } from "lodash";

//  Deep Link
import { DeepLink } from "../../helper";

// Store
import { StoreContext } from "../../store/reducer";
import { localization } from "../../localization";

// exampleData
// export const DATAGRID = [
//   {
//     key: "123",
//     value: "actress",
//     name: "Afrojack",
//     favorites: "false",
//     imageBW: "https://www.image-line.com/wp-content/uploads/2011/04/Afrojack-Large-e1663173243384-1600x900.jpeg",
//     image: require("../../assets/images/artists/actress.png"),
//     stage: "Main Stage",
//     description: localization("aboutAfrojack"),
//     start: "2021-02-22 10:00:00",
//     end: "2021-02-22 11:00:00",
//     webLink: "https://en.wikipedia.org/wiki/Actress_(musician)",
//     facebookLink: "https://www.facebook.com/actressmusic/",
//     instagramLink: "https://www.instagram.com/ghettovillian/",
//     youtubeLink: "https://www.youtube.com/watch?v=t_5qdnKra9g&list=PLZ5bCluesRCQPnEajUuxHshLthem6nSlR&index=2"
//   },
//   {
//     key: "124",
//     value: "calexico",
//     favorites: "false",
//     name: "Calexico",
//     imageBW: "https://www.image-line.com/wp-content/uploads/2011/04/Afrojack-Large-e1663173243384-1600x900.jpeg",
//     image: require("../../assets/images/artists/calexico.png"),
//     stage: "Main Stage",
//     description: localization("aboutAfrojack"),
//     start: "2021-02-22 11:05:00",
//     end: "2021-02-22 12:05:00",
//     webLink: "https://en.wikipedia.org/wiki/Calexico_(band)",
//     facebookLink: "https://www.facebook.com/calexico/",
//     instagramLink: "https://www.instagram.com/casadecalexico/",
//     youtubeLink: "https://www.youtube.com/channel/UC66HWSL-hGJWfkHjqaUuQyw"
//   },
//   {
//     key: "123",
//     value: "actress",
//     name: "Afrojack",
//     favorites: "false",
//     imageBW: "https://www.image-line.com/wp-content/uploads/2011/04/Afrojack-Large-e1663173243384-1600x900.jpeg",
//     image: require("../../assets/images/artists/actress.png"),
//     stage: "Main Stage",
//     description: localization("aboutAfrojack"),
//     start: "2021-02-22 10:00:00",
//     end: "2021-02-22 11:00:00",
//     webLink: "https://en.wikipedia.org/wiki/Actress_(musician)",
//     facebookLink: "https://www.facebook.com/actressmusic/",
//     instagramLink: "https://www.instagram.com/ghettovillian/",
//     youtubeLink: "https://www.youtube.com/watch?v=t_5qdnKra9g&list=PLZ5bCluesRCQPnEajUuxHshLthem6nSlR&index=2"
//   },
//   {
//     key: "124",
//     value: "calexico",
//     favorites: "false",
//     name: "Calexico",
//     imageBW: "https://www.image-line.com/wp-content/uploads/2011/04/Afrojack-Large-e1663173243384-1600x900.jpeg",
//     image: require("../../assets/images/artists/calexico.png"),
//     stage: "Main Stage",
//     description: localization("aboutAfrojack"),
//     start: "2021-02-22 11:05:00",
//     end: "2021-02-22 12:05:00",
//     webLink: "https://en.wikipedia.org/wiki/Calexico_(band)",
//     facebookLink: "https://www.facebook.com/calexico/",
//     instagramLink: "https://www.instagram.com/casadecalexico/",
//     youtubeLink: "https://www.youtube.com/channel/UC66HWSL-hGJWfkHjqaUuQyw"
//   }
// ];

const Home = ({ navigation }) => {
  const store = useContext(StoreContext);
  const state = store.state;

  const renderGridItem = ({ item }) => (
    <ArtistGridItem
      name={item.name}
      img={{ uri: item.image }}
      press={() => navigation.navigate("Artist", {
        artistId: item.id
      })}
    />
  );

  const openCashless = () => {
    DeepLink.openLink({
      cashlessLink: "ewalletcashlessdemo://",
      appName: "eWallet cashless demo",
      appStoreId: "us",
      playStoreId: "com.mstart.ewallet_cashless_demo"
    });
  };

  return (
    <View style={SharedStyles.layout.containerBlack}>
      <SafeAreaView style={SharedStyles.layout.flex}>
        <View>
          <FlatList
            data={shuffle(state.artists)}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.key}
            numColumns={2}
          />
        </View>
      </SafeAreaView>
      <Btn
        press={openCashless}
        btncolor={Colors.themeColor().colors.primary}
        btnpresscolor={Colors.themeColor().colors.primaryTouchable}
        style={[
          SharedStyles.buttons.cashlessButton,
          SharedStyles.shadow.elevation6
        ]}>
        <Entypo name="wallet" size={35} color={Colors.themeColor().colors.secondary} />
      </Btn>
    </View>
  );
};

export default Home;
