import { useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

import Form from '../Form';

const StartForm = () => {
    const placeholder = { email: 'Введите email', password: "Введите пароль" };
    const buttons = ['Войти', 'Зарегистрироваться'];

    const [pressedButton, setPressedButton] = useState(buttons[0]);
    const button = pressedButton;

    const action = pressedButton == buttons[0] ? 'SignIn' : "SignUp";
    !(pressedButton == buttons[0]) ? (placeholder['username'] = 'Введите имя') : null

    return (
        <>
            <FlatList

                style={{ marginTop: 100 }}
                data={buttons}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setPressedButton(item)}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
            />
            <Form
                placeholder={placeholder}
                button={button}
                action={action}
            />
        </>
    )
}


export default StartForm; 