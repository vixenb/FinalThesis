/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { View, Image } from "react-native";

// Styles
import { Colors, Typography } from "../../styles";

// expo marker
import { Marker } from "react-native-maps";

const MarkerDropWithBG = ({ marker, color, image }) => {
  // -----> STATE KORISTEN ZA RERENDER <------
  const [rerender, setRerender] = useState(false);

  return (
    <Marker
      coordinate={{ latitude: marker.lat, longitude: marker.lng }}
      title={marker.title}
      tracksViewChanges={false}
    >
      <View style={{ marginBottom: Typography.FONT_SIZE_TITLE_MD * 0.5 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: Typography.FONT_SIZE_TITLE_MD * 2,
              height: Typography.FONT_SIZE_TITLE_MD * 2,
              borderTopLeftRadius: Typography.FONT_SIZE_TITLE_MD,
              borderTopRightRadius: Typography.FONT_SIZE_TITLE_MD,
              borderBottomLeftRadius: Typography.FONT_SIZE_TITLE_MD,
              backgroundColor: color,
              transform: [{ rotateZ: "45deg" }]
            }}
          >
            <View
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                backgroundColor: Colors.themeColor().colors.primaryTextColor,
                borderRadius: Typography.FONT_SIZE_TITLE_MD * 2.5,
                transform: [{ rotateZ: "-45deg" }]
              }}
            >
              <Image
                source={image}
                // ------> IZMJENA STATE-A ZA RERENDER <-------
                // onLoad={() => setRerender(true)}
                // key={rerender}
                style={{
                  width: Typography.FONT_SIZE_TITLE_MD,
                  height: Typography.FONT_SIZE_TITLE_MD,
                  margin: Typography.FONT_SIZE_TITLE_MD * 0.25,
                  tintColor: color
                }}
              ></Image>
            </View>
          </View>
        </View>
      </View>
    </Marker>
  );
};

export default MarkerDropWithBG;
