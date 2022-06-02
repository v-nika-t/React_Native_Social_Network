import { useCallback, useState } from 'react';
import { View, TextInput, Button, Text, Image } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';

import SocialNetworkServices from '../../../services/SocialNetworkServices';

const AddPost = () => {

    const server = new SocialNetworkServices('post');
    const placeholder = { title: 'Введите заголовок', description: 'Введите описание' };
    let initialValues = { title: '', description: '' };
    const [image, setImage] = useState(null);
    const [result, setResult] = useState();


    const pickImage = async () => { // Закгрузка картинок
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        !result.cancelled ? setImage(result.uri) : null;
    };

    const getArrayTextInput = useCallback((props = {}, placeholder = []) => { // массив INPUT  в Formik
        let items = [];
        let i = 0;
        for (let key in placeholder) {
            items.push(<TextInput
                key={i++}
                value={props.values[key]}
                placeholder={placeholder[key]}
                onChangeText={props.handleChange(key)}
            />)
        };
        return items;
    }, []);

    const addPost = (values, actions) => { //Добавить пост
        typeof image !== 'undefined' ? values['uri'] = image : null
        values['date'] = (new Date()).toString();
        values['likes'] = 0;
        server.add(values)
            .then(result => {
                console.log(result);
                actions.resetForm();
                setImage(null);
                setResult('Запись добавлена')
            }).catch(e => setResult('Что-то пошло НЕ так: ' + e))
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <>
                <Formik
                    initialValues={initialValues}
                    onSubmit={addPost}
                >
                    {(props) => {
                        const arrayTextInput = getArrayTextInput(props, placeholder);
                        return (
                            <View>
                                <Text>{result}</Text>
                                <Button title='Добавить' onPress={props.handleSubmit} />
                                {arrayTextInput}
                            </View>
                        )
                    }}
                </Formik>
            </>
            <Button title="Добавить фографию" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}

export default AddPost;