import React, { useState } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";

//  Styles
import { Colors, Typography } from "../../styles";

const SettingsItem = ({ containerPadding, children, title }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (

    <View style={[containerPadding, styles.row]}>
      <View>
        <Text style={[Typography.FONT_SIZE_SMALL]}>
          {title}
        </Text>
        {children}
      </View>
      <View style={styles.endColumn}>
        <Switch
          trackColor={{ false: Colors.themeColor().colors.disabledDarkGray, true: Colors.themeColor().colors.primaryTouchable }}
          thumbColor={isEnabled ? Colors.themeColor().colors.primary : Colors.themeColor().colors.disabledLightGray}
          ios_backgroundColor={Colors.themeColor().colors.disabledDarkGray}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  endColumn: {
    justifyContent: "center"
  }
});

export default SettingsItem;
