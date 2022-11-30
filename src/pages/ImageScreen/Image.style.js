import { Dimensions, StyleSheet } from "react-native";


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,

    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        padding: 15,
    },
    modalImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    imageScrollView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: height / 7
    },

    video: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: width / 6,
        height: height / 12,
        margin: 7,

    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,

    },//resmi sığdırmak ,için

    editButton: {
        backgroundColor: "#efefef",
        position: "absolute",
        transform: [
            { translateX: -width / 15 },
            { translateY: -height / 50 }
        ],
        left: "100%"
    },
    deleteIcon: {
        backgroundColor: "red",
        position: "absolute",
        transform: [
            { translateX: -width / 15 },
            { translateY: -height / 30 }
        ],
        top: "100%",
        left: "100%"
    },



});