import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textUserName: {
        fontWeight: 'bold'
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        flexWrap: 'wrap',
        marginTop: 10

    },
    containerForEdit: {
        flex: 1,
        justifyContent: 'center',

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
    }
});

export default styles;