import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';
import { View, TextInput, Button, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';


import { Post } from '../../../services/SocialNetworkServices';
import { add, edit } from '../../../actions/post.action';
import styles from './styleFormPostAction';

const FormPostAction = ({ navigation, route }) => {

    const server = Post;
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.dataAccount);
    const post = useSelector(state => state.post);
    const userId = user.id;

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,

        });

        !result.cancelled ? setImage(result.uri) : null;
    };

    const addPost = (values, actions) => {
        if (!(values.title && image && values.description)) {
            setResult('Обязательные поля не заполнены');
            setError(true);
            return
        }
        typeof image !== 'undefined' ? values['uri'] = image : null
        values['userId'] = userId;

        server.add(values)
            .then((data) => {
                dispatch(add({
                    ...data,
                    Owner_posts: { "user_name": user.user_name },
                    Users_added_like_to_post: []
                }, true))
                actions.resetForm();
                setImage(null);
                setResult('Запись добавлена')
                setError(false);
            }).catch(e => {
                setError(true);
                setResult('Что-то пошло не так. Попробуйте еще раз или позже')
            })
    }

    const editPost = async (values) => {
        image !== null ? values['uri'] = image : null;
        await server.edit(route.params.id, values)
            .then((data) => dispatch(edit(data)))
            .catch(e => setResult('Что-то пошло НЕ так: ' + e));
        await navigation.goBack();
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
                            <View style={styles.container}>
                                <Text style={[styles.text, { color: error ? 'red' : 'green' }]}>{result}</Text>
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