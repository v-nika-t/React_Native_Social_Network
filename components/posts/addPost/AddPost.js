import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const axios = require('axios').default;

import Form from '../../form/Form';

const AddPost = () => {

    const placeholder = { title: 'Введите заголовок', description: 'Введите описание' };
    const button = 'Добавить запись';
    const action = 'add';
    const name = 'post';

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        !result.cancelled ? setImage(result.uri) : null;
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Form
                placeholder={placeholder}
                button={button}
                action={action}
                name={name}
                file={image}
                reset={() => setImage(null)}
            />
            <Button title="Добавить фографию" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}

export default AddPost;