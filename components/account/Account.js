import { Text, FlatList, Button } from 'react-native';

const Account = () => {
    const props = { userName: 'userName', email: "email@email.ru" };
    const buttons = ['Редактировать'];

    return (
        <>
            <Text>Данные пользователя:</Text>
            <FlatList
                data={Object.values(props)}
                renderItem={({ item }) => (<Text>{item}</Text>)}
            />
            <FlatList
                data={buttons}
                renderItem={({ item }) => (<Button title={item} />)}
            />

        </>
    )
}

export default Account


