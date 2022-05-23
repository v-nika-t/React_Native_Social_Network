import { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';

const Form = () => { // Осталась: Отправка данных на сервер == SignIn, SignUP
    const initialValues = { username: '', email: '', password: "" };
    const placeholder = { username: 'Введите имя', email: 'Введите email', password: "Введите пароль" };
    const buttons = ['Войти', 'Зарегистрироваться'];
    const [pressedButton, setPressedButton] = useState(buttons[0]);

    const getArrayTextInput = useCallback((props = {}, placeholder = []) => {
        let items = [];
        for (let key in placeholder) {
            items.push(<TextInput
                value={props.values.key}
                placeholder={placeholder[key]}
                onChangeText={props.handleChange(key)}
            />)
        };
        pressedButton == buttons[0] ? items = items.slice(1) : null
        return items;
    }, [pressedButton])

    return (
        <>
            <FlatList // Меню 
                data={buttons}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setPressedButton(item)}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
            />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    actions.resetForm(); //При обновлении страницы форма будет пустой. Не запускает рендере 
                    console.log(values, pressedButton); // отдаст: https://prnt.sc/U-gWwtv6z2Vn
                    setPressedButton('');//Для рендера страницы 
                }}
            >
                {(props) => {
                    const arrayTextInput = getArrayTextInput(props, placeholder);
                    return (
                        <View>
                            {arrayTextInput}
                            <Button title={pressedButton} onPress={props.handleSubmit} />
                        </View>
                    )
                }}
            </Formik>
        </>
    )
}


export default Form; 