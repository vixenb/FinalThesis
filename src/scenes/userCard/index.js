import React, { useRef, useState, useContext } from "react";
import { View, Text, StyleSheet, Animated, Pressable, Image, TouchableOpacity, ActivityIndicator } from "react-native";

// Localization
import { localization } from "../../localization";

import * as ImagePicker from "expo-image-picker";

// Styles
import { Colors, SharedStyles, Typography } from "../../styles";

// Expo vector icons
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// store
import { StoreContext } from "../../store/reducer";

// Actions
import { actions, createAction } from "../../store/actions";
import Alert from "../../components/molecules/alert";


const UserCard = ({ navigation }) => {

    const store = useContext(StoreContext);
    const dispatch = store.dispatch;
    const state = store.state;
    const [isLoading, setIsLoading] = useState(false);

    // Anim
    const slideValue = useRef(new Animated.Value(-150)).current;

    const slideInAnim = () => {
        Animated.spring(
            slideValue,
            {
                toValue: 120,
                useNativeDriver: true
            }
        ).start();

        setTimeout(() => {
            slideOutAnim();
        }, 2000);
    };

    const slideOutAnim = () => {
        Animated.spring(
            slideValue,
            {
                toValue: -150,
                useNativeDriver: true
            }
        ).start(() => {
            setSuccessImgAdd(null);
        });
    };

    const pickImage = async () => {
        const cards = [];

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });


        if (!result.cancelled) {
            setIsLoading(true);
            cards.push(result.uri);
            dispatch(createAction(actions.SET_USER_CARD, cards));
            setIsLoading(false);
            // slideInAnim();
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", backgroundColor: Colors.themeColor().colors.secondaryBackgroundColor }}>
                <ActivityIndicator size="large" color={Colors.themeColor().colors.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.container]}>
            {/* <Alert
                slideValue={slideValue}
                slideOutAnim={slideOutAnim}
                text={successImgAdd ? localization("Uspjesno dodana slika") : errorMsg}
                icon={successImgAdd ? <MaterialCommunityIcons
                    name="checkbox-marked-circle-outline"
                    size={Typography.FONT_SIZE_TITLE_MD}
                    color={Colors.themeColor().success} /> : <Feather
                    name="x-octagon"
                    size={Typography.FONT_SIZE_TITLE_MD}
                    color={Colors.themeColor().error} />
                }
                backgroundColor={successImgAdd ? "green" : "red"}
                textColor={successImgAdd ? "white" : "white"}
                dividerColor={successImgAdd ? "black" : "black"}
            /> */}
            <TouchableOpacity
                onPress={() => pickImage()}
                style={{
                    borderWidth: 0.2,
                    borderRadius: 20,
                    borderColor: Colors.themeColor().colors.disabledGray,
                    width: 200,
                    height: 200,
                    justifyContent: "center",
                    overflow: "hidden",
                    alignItems: "center",
                    padding: state.card == null ? Typography.FONT_SIZE_NORMAL * 2 : 0,
                    backgroundColor: Colors.themeColor().colors.primaryBackgroundColor,
                    alignSelf: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>
                {
                    state.card == null ?
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons style={{ marginBottom: Typography.FONT_SIZE_MEDIUM }}
                                name="qr-code-outline"
                                size={Typography.FONT_SIZE_TITLE_LG * 2}
                                color={Colors.themeColor().colors.disabledDarkGray} /><Text style={[SharedStyles.typography.textCenter, { color: Colors.themeColor().colors.disabledDarkGray }]}>
                                {"Dodajte kartu"}
                            </Text>
                        </View> : <View style={{ alignItems: "center" }}>
                            <Image style={{ resizeMode: "cover", width: 200, height: 200 }} source={state.card} />
                        </View>
                }

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Typography.FONT_SIZE_TITLE_LG * 2,
        backgroundColor: Colors.themeColor().colors.primaryTextColor
    }
});

export default UserCard;
