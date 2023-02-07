import * as React from "react";
import { SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

//  Styles
import { Colors, SharedStyles, Typography } from "../../styles";

//  Components
import { EmptySpace } from "../../components/molecules";

const Notifications = () => {
  return (
    <SafeAreaView style={[SharedStyles.layout.containerLight, { paddingBottom: 70 }]}>
      <EmptySpace
        icon={<MaterialIcons name="notifications-active" size={200} color={Colors.themeColor().colors.disabledGray} />}
        headerLabel={"No notifications yet!"}
        descriptionLabel={"Check this section for updates, news and general notifications."}
        textBoxStyle={{ paddingHorizontal: Typography.FONT_SIZE_TITLE_MD * 3 }}
      />
    </SafeAreaView>
  );
};

export default Notifications;
