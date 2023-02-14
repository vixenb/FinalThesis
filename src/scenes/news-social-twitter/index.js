import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import { SharedStyles } from "../../styles";

const NewsSocialTwitter = () => {
  return (
    <SafeAreaView style={[
      SharedStyles.layout.flex
    ]}>
      <WebView source={{ uri: "https://twitter.com/zagreb_tourist" }}
        style={SharedStyles.typography.windowWidth} />
    </SafeAreaView>
  );
};

export default NewsSocialTwitter;
