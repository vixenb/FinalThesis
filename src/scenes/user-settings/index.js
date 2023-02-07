import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { ModalReminder, SettingsItem } from "../../components/molecules";
import { RadioButton } from "react-native-paper";

//  Lokalizacija
import { localization, language } from "../../localization";

// Stilovi
import { Colors, SharedStyles, Typography } from "../../styles";

// Application options
import * as ApplicationOptions from "../../application-options";

const UserSettings = () => {
  const [dataReminder] = useState([
    {
      key: "1",
      time: `5 ${localization("minutes")}`
    },
    {
      key: "2",
      time: `10 ${localization("minutes")}`
    },
    {
      key: "3",
      time: `15 ${localization("minutes")}`
    },
    {
      key: "4",
      time: `20 ${localization("minutes")}`
    }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(null);
  const [reminderAlert, setReminderAlert] = useState(localization("choose"));

  const openModal = () => {
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);

    for (const item of dataReminder) {
      if (item.key === checked) {
        setReminderAlert(item.time);
      }
    }
  };

  return (
    <SafeAreaView style={[
      SharedStyles.layout.flex,
      {
        backgroundColor: Colors.themeColor().colors.primaryBackgroundColor
      }
    ]}>
      <View style={[
        SharedStyles.layout.standardHorizontalPadding]}>
        {
          ApplicationOptions.laungageEnabled() &&
          <>
            <View style={[
              SharedStyles.layout.standardVerticalPadding
            ]}>
              <Text style={SharedStyles.typography.title}>{localization("language")}</Text>
              <Text style={[
                styles.subHeader,
                SharedStyles.typography.subtitile
              ]}>
                {language()}
              </Text>
            </View>
            <View style={SharedStyles.horizontalLine.horizontalLine} />
          </>
        }

        {
          ApplicationOptions.reminderEnabled() &&
          <>
            <View style={[
              SharedStyles.layout.standardVerticalPadding
            ]}>
              <Text style={SharedStyles.typography.title}>{localization("favorites")}</Text>
              <Text style={[
                styles.subHeader,
                SharedStyles.typography.subtitile
              ]}
              onPress={openModal}>
                {localization("reminder")}
              </Text>
              <Text style={styles.paragraph}>
                {reminderAlert === localization("choose") ? reminderAlert : `${localization("reminderAlertFirst")} ${reminderAlert} ${localization("reminderAlertSecond")}`}
              </Text>
            </View>

            <View style={SharedStyles.horizontalLine.horizontalLine} />
          </>
        }

        {
          ApplicationOptions.notificationsEnabled() &&
          <>
            <View style={[
              SharedStyles.layout.standardVerticalPadding
            ]}>
              <Text style={SharedStyles.typography.title}>{localization("notifications")}</Text>
              <SettingsItem
                title={localization("notifications")}
                containerPadding={SharedStyles.layout.standardVerticalPadding}
              />
              <SettingsItem
                title={localization("vibrate")}
              />
              <SettingsItem
                title={localization("sounds")}
                containerPadding={SharedStyles.layout.standardPaddingTop}
              />
            </View>
            <View style={SharedStyles.horizontalLine.horizontalLine} />
          </>
        }

        {
          ApplicationOptions.privacyEnabled() &&
          <>
            <View style={[
              SharedStyles.layout.standardVerticalPadding
            ]}>
              <Text style={SharedStyles.typography.title}>{localization("privacy")}</Text>
              <SettingsItem
                title={localization("useOfData")}
                containerPadding={SharedStyles.layout.standardVerticalPadding}
                // eslint-disable-next-line react/no-children-prop
                children={
                  <Text style={styles.paragraph}>
                    {localization("dataUsegeDescription")}
                  </Text>
                }
              />
              <SettingsItem
                title={localization("locationReporting")}
                // eslint-disable-next-line react/no-children-prop
                children={
                  <Text style={styles.paragraph}>
                    {localization("locationReportDescription")}
                  </Text>
                }
              />
              <SettingsItem
                title={localization("privacyPolicy")}
                containerPadding={SharedStyles.layout.standardPaddingTop}
              />
            </View>
          </>
        }

      </View>
      <ModalReminder
        visible={modalVisible}
        onModalClose={onModalClose}
        modalVisible={openModal}
        title={localization("reminder")}
        // eslint-disable-next-line react/no-children-prop
        children={
          <RadioButton.Group
            onValueChange={(newValue) => setChecked(newValue)}
            value={checked}>
            {dataReminder.map((item) => (
              <RadioButton.Item
                key={item.key}
                label={item.time}
                value={item.key}
                color={Colors.themeColor().colors.primary} />
            ))}
          </RadioButton.Group>
        }
      />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  subHeader: {
    paddingTop: 8
  },
  paragraph: {
    color: Colors.themeColor().colors.empty
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  radioButtonLabel: {
    fontSize: Typography.FONT_SIZE_SMALL,
    textTransform: "lowercase"
  }
});

export default UserSettings;
