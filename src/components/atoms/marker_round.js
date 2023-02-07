import React from "react";
import { View, Image } from "react-native";

// Styles
import { Colors, Typography } from "../../styles";

// expo marker
import { Marker } from "react-native-maps";

const CustomMarkerRound = ({ marker, color, image }) => (
  <Marker
    coordinate={{ latitude: marker.lat, longitude: marker.lng }}
    title={marker.title}
    tracksViewChanges={false}
  >
    <View style={{ marginBottom: Typography.FONT_SIZE_TITLE_MD * 0.5 }}>
      <View
        style={{
          borderRadius: Typography.FONT_SIZE_TITLE_MD * 2.5,
          backgroundColor: Colors.themeColor().colors.primaryTextColor,
          borderColor: color,
          borderWidth: Typography.FONT_SIZE_SMALL * 0.5
        }}
      >
        <View
          style={{
            textAlign: "center",
            textAlignVertical: "center"
          }}
        >
          <Image
            source={image}
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
  </Marker>
);

export default CustomMarkerRound;
