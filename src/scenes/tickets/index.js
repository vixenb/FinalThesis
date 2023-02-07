import * as React from "react";
import { Button, View, Text, SafeAreaView } from "react-native";

const Tickets = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginBottom: 16
            }}>
            This is the third Page under First Page Option
          </Text>
          <Button
            title="Go to Second Page"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Tickets;
