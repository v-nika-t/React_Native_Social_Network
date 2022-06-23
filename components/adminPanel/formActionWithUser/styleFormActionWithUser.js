import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
    },
    input: {
        borderColor: 'grey',
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 2,
        width: '90%',
        padding: 10,
        marginBottom: 10,
        fontSize: 20,
    },

    icon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        flexWrap: 'wrap',
    },

});

module.exports = styles;
