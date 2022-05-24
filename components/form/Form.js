import { useCallback } from 'react';
import { Formik } from 'formik';
import { View, TextInput, Button, Text } from 'react-native';

const Form = (props) => { // Отправка на сервер , перенаправление на нужную страницу  == подумать про action
    const { placeholder, button, action } = props;
    const initialValues = {};

    const getArrayTextInput = useCallback((props = {}, placeholder = []) => {
        let items = [];
        for (let key in placeholder) {
            initialValues[key] = '';

            items.push(<TextInput
                value={props.values.key}
                placeholder={placeholder[key]}
                onChangeText={props.handleChange(key)}
            />)
        };
        return items;
    }, [props])

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    actions.resetForm(); //При обновлении страницы форма будет пустой. Не запускает рендере 
                    console.log(values, action); //Действие которое делаем
                }}
            >
                {(props) => {
                    const arrayTextInput = getArrayTextInput(props, placeholder);
                    return (
                        <View>
                            {arrayTextInput}
                            <Button title={button} onPress={props.handleSubmit} />
                        </View>
                    )
                }}
            </Formik>
        </>
    )
}


export default Form;  