import React, { useEffect, useRef, useState, useContext } from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

//  Styles
import { Colors, SharedStyles, Typography } from "../../styles";

//  Components
import { EmptySpace } from "../../components/molecules";


// store
import { StoreContext } from "../../store/reducer";


const Notifications = () => {
  const store = useContext(StoreContext);
  const state = store.state;

  const [notification, setNotification] = useState(state.notifications);
  const notificationListener = useRef();
  const responseListener = useRef();



  return (
    <SafeAreaView style={[SharedStyles.layout.containerLight, { paddingBottom: 70 }]}>

      {notification.length !== 0 ? (
        <View style={{ alignItems: "flex-start", justifyContent: "flex-start", flex: 1 }}>
          {
            notification.map((element, key) => (
              <View style={{ flexDirection:"row", marginHorizontal: Typography.FONT_SIZE_TITLE_LG, paddingVertical: Typography.FONT_SIZE_SMALL  }}>
                <View>
                  <Image source={require("../../assets/icon.png")} style={{width: 60, height: 60}}/>
                </View>
                <View style={{marginLeft: Typography.FONT_SIZE_TITLE_MD}}>
                  <Text style={{fontWeight:"700", textTransform:"uppercase", paddingBottom: 4, fontSize: Typography.FONT_SIZE_NORMAL}}>{element.title}</Text>
                  <Text style={{fontWeight:"500", textTransform:"capitalize", fontSize: Typography.FONT_SIZE_SMALL}}>{element.body}</Text>
                </View>
              </View>
            ))}
        </View>
      ) : (
        <EmptySpace
          icon={
            <MaterialIcons
              name="notifications-active"
              size={200}
              color={Colors.themeColor().colors.disabledGray}
            />
          }
          headerLabel={"No notifications yet!"}
          descriptionLabel={
            "Check this section for updates, news and general notifications."
          }
          textBoxStyle={{ paddingHorizontal: Typography.FONT_SIZE_TITLE_MD * 3 }}
        />
      )}

    </SafeAreaView>
  );
};

export default Notifications;
