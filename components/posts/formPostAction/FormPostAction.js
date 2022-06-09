import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TextInput, Button, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

import SocialNetworkServices from '../../../services/SocialNetworkServices';
import styles from './styleFormPostAction';

const FormPostAction = ({ navigation, route }) => {

    const server = new SocialNetworkServices('post');
    const userId = 1;
    const placeholder = {
        title: 'Введите заголовок',
        description: 'Введите описание'
    };

    const initialValues = {
        title: route.params ? route.params.title : '',
        description: route.params ? route.params.description : ''
    };

    const [image, setImage] = useState(null);
    const [result, setResult] = useState('');
    const [error, setError] = useState(false);

    const pickImage = async () => { // Закгрузка картинок
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        !result.cancelled ? setImage(result.uri) : null;
    };

    const addPost = (values, actions) => { //Добавить пост
        if (!(values.title && image && values.description)) {
            setResult('Обязательные поля не заполнены');
            setError(true);
            return
        }

        typeof image !== 'undefined' ? values['uri'] = image : null
        values['userId'] = userId;

        server.add(values)
            .then((data) => {
                actions.resetForm();
                setImage(null);
                setResult('Запись добавлена')
                setError(false);
            }).catch(e => {
                setError(true);
                setResult('Что-то пошло НЕ так: ' + e)
            })
    }

    const editPost = (values) => {
        typeof image !== 'undefined' ? values['uri'] = image : null
        server.edit(route.params.id, values)
            .then((data) => {
                navigation.goBack();
            }).catch(e => setResult('Что-то пошло НЕ так: ' + e))
    }

    const unFocus = (props) => useFocusEffect(
        useCallback(() => {
            return () => {
                setResult('');
                setImage(null);
                props.handleReset();
            };
        }, [])
    );

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={route.params ? editPost : addPost}
            >
                {(props) => {
                    unFocus(props);
                    return (
                        <>
                            <Text style={[styles.text, { color: error ? 'red' : 'green' }]}>{result}</Text>
                            <View style={styles.container}>
                                <TextInput
                                    style={styles.input}
                                    value={props.values.title}
                                    placeholder={placeholder.title}
                                    onChangeText={props.handleChange('title')}
                                />
                                <TextInput
                                    multiline={true}
                                    style={styles.input}
                                    value={props.values.description}
                                    placeholder={placeholder.description}
                                    onChangeText={props.handleChange('description')}
                                />
                                <View style={{ alignSelf: 'flex-end', marginRight: 10 }}>
                                    <TouchableWithoutFeedback
                                        onPress={pickImage}>
                                        <MaterialIcons name="add-photo-alternate" size={50} color="black" />
                                    </TouchableWithoutFeedback>
                                </View>
                                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                            </View>
                            <Button
                                title={route.params ? "Изменить" : "Добавить"}
                                onPress={props.handleSubmit} />
                        </>
                    )
                }}
            </Formik>
        </>
    );
}

export default FormPostAction;