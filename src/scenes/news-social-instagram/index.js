import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import { SharedStyles } from "../../styles";

const NewsSocialInstagram = () => {
  return (
    <SafeAreaView style={[
      SharedStyles.layout.flex
    ]}>
      <WebView source={{ uri: "https://www.instagram.com/zagrebtourist/?hl=hr" }}
        style={SharedStyles.typography.windowWidth} />
    </SafeAreaView>
  );
};

export default NewsSocialInstagram;
