import { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { View, TextInput, Button, Text } from 'react-native';
import SocialNetworkServices from '../../services/SocialNetworkServices';

const Form = (props) => { // Отправка на сервер , перенаправление на нужную страницу  == подумать про action
    const { placeholder, button, name, file, reset } = props;
    const initialValues = {};
    const server = new SocialNetworkServices(name);
    const [result, setResult] = useState();

    const getArrayTextInput = useCallback((props = {}, placeholder = []) => {
        let items = [];
        for (let key in placeholder) {
            initialValues[key] = '';

            items.push(<TextInput
                value={props.values[key]}
                placeholder={placeholder[key]}
                onChangeText={props.handleChange(key)}
            />)
        };
        return items;
    }, [props]);

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    typeof file !== 'undefined' ? values['uri'] = file : null
                    server[props.action](values)
                        .then(result => {
                            actions.resetForm();
                            reset();
                            setResult('Запись добавлена')
                        }).catch(e => setResult('Что-то пошло НЕ так: ' + e))
                }}
            >
                {(props) => {
                    const arrayTextInput = getArrayTextInput(props, placeholder);
                    return (
                        <View>
                            <Text>{result}</Text>
                            <Button title={button} onPress={props.handleSubmit} />
                            {arrayTextInput}
                        </View>
                    )
                }}
            </Formik>
        </>
    )
}


export default Form;  