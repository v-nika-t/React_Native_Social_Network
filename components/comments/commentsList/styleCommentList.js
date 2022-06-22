import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textUserName: {
        fontWeight: 'bold'
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },

    input: {
        /*  borderColor: 'grey',
         borderStyle: "solid",
         borderWidth: 2, */
        padding: 5,
        fontSize: 20,
    }
});

module.exports = styles;