import React from "react";
import { Text, StyleSheet, Modal, View, Pressable } from "react-native";

//  Styles
import { Colors, SharedStyles } from "../../styles";

const ModalReminder = ({ children, ...props }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onModalClose}>
      <Pressable
        onPress={props.onModalClose}
        style={styles.modal}>
        <Pressable
          onPress={props.modalVisible}
          style={styles.modalContainer}>
          <View style={[
            SharedStyles.layout.standardHorizontalPadding,
            SharedStyles.layout.standardVerticalPadding]}>
            <Text style={SharedStyles.typography.title}>{props.title}</Text>
            <View style={SharedStyles.layout.standardVerticalPadding}>
              {children}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.themeColor().colors.secondaryBackgroundColor,
    opacity: Colors.MODAL_OPACITY,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    backgroundColor: Colors.themeColor().colors.primaryBackgroundColor,
    width: "85%"
  }
});

export default ModalReminder;
