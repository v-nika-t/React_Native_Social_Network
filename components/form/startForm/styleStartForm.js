import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'center',
        height: 200,
        borderColor: 'grey',
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 1,
        backgroundColor: '#E6E6FA',

    },

    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },

    input: {
        borderColor: 'grey',
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 2,
        padding: 5,
        width: '80%',
        marginBottom: 10,
        fontSize: 20,
        alignSelf: 'center',
        backgroundColor: 'white',

    }
});

module.exports = styles;