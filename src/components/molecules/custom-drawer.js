import { DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import { StyleSheet, View, Image } from "react-native";
import React from "react";

//  Styles
import { Colors, SharedStyles } from "../../styles";

const DefaultDrawer = (props) => (
  <View style={styles.container}>
    <DrawerContentScrollView {...props}>
      <View style={[styles.content]}>
        <Image style={[styles.headerDrawer, SharedStyles.typography.headerLogo]} source={require("../../assets/images/icons/superear_logo.png")}></Image>
        <View style={styles.contentlist}>
          <DrawerItemList {...props} />
        </View>
      </View>
    </DrawerContentScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeColor().colors.primary
  },
  headerDrawer: {
    marginTop: 60,
    marginBottom: 40
  }
});

export default DefaultDrawer;
