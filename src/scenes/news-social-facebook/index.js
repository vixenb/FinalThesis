import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import { SharedStyles } from "../../styles";

const NewsSocialFacebook = () => {
  return (
    <SafeAreaView style={[
      SharedStyles.layout.flex
    ]}>
      <WebView source={{ uri: "https://www.facebook.com/SuperUho.Festival/" }}
        style={SharedStyles.typography.windowWidth} />
    </SafeAreaView>
  );
};

export default NewsSocialFacebook;
