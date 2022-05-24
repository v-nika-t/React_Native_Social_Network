import { Text, Button } from "react-native";

import comments from "../../../DB_COMMENTS";

const CommentsList = ({ navigation: { goBack } }) => {

    //const { id, date, description, user_name } = comments
    // {item.date} - переделать в стркоу
    const renderComments = comments.map((item) => {

        return (
            <>
                <Text>{item.user_name}</Text>
                <Text>{item.description}</Text>
            </>
        )
    })
    return (
        <>
            <Button onPress={() => goBack()} title="Назад" />
            <Text></Text>
            <Text style={{ marginTop: 50 }}>CommentsList</Text>
            {renderComments}
        </>
    )
}

export default CommentsList;