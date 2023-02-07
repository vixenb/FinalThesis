/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

import { SharedStyles } from "../../styles";

const Browser = ({ route }) => {
  const [link, setLink] = useState(route.params.link);

  return (
    <SafeAreaView style={[
      SharedStyles.layout.flex
    ]}>
      <WebView source={{ uri: link }}
        style={SharedStyles.typography.windowWidth} />
    </SafeAreaView>
  );
};

export default Browser;
