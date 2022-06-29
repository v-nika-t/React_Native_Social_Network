import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    container: {
        flexDirection: "column",
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',

    },
    input: {
        height: 50,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 2,
        paddingLeft: 10,
        fontSize: 20,
    },

    text: {
        fontSize: 20,
    }


});

module.exports = styles;