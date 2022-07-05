import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 20,
    },
    input: {
        borderColor: 'grey',
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 2,
        padding: 10,
        marginTop: 10,
        fontSize: 20,
    },



});

export default styles;