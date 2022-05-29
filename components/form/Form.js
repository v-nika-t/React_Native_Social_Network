import { useCallback } from 'react';
import { Formik } from 'formik';
import { View, TextInput, Button, Text } from 'react-native';
import SocialNetworkServices from '../../services/SocialNetworkServices';

const Form = (props) => { // Отправка на сервер , перенаправление на нужную страницу  == подумать про action
    const { placeholder, button, name, file } = props;
    const initialValues = {};
    const server = new SocialNetworkServices(name);

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
                    typeof file !== 'undefined' ? values['uri'] = file : null
                    server[props.action](values)
                    /*   .then(d => {
                          actions.resetForm(); //При обновлении страницы форма будет пустой. Не запускает рендере (ответ)
                          console.log(d)
                      }).catch(e => console.log(e))  */
                }}
            >
                {(props) => {
                    const arrayTextInput = getArrayTextInput(props, placeholder);
                    return (
                        <View>
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