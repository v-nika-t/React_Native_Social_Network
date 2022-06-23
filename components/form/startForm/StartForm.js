import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Text, TouchableOpacity, TextInput, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { add, auth } from '../../../actions/user.action';
import styles from './styleStartForm';
import { User } from '../../../services/SocialNetworkServices';

const StartForm = () => {
    const services = User;

    const [signIn, setSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_name, setUser_name] = useState('');
    const [answer, setAnswer] = useState('');

    const dispatch = useDispatch();

    const changeVerify = (data) => {
        dispatch(add(data))
        dispatch(auth(true));
    }

    const validation = async () => {
        if ((!email || !password) || (!signIn && !user_name)) {
            setAnswer('Заполните все поля');
            return;
        }
        const body = { email, password }
        user_name ? body['user_name'] = user_name : null

        const result = signIn ? await services.signIn(body) : await services.signUp(body)

        switch (await result) {
            case 'There is user':
                setAnswer('Пользователь уже существует');
                break
            case 'There is not user':
                setAnswer('Пользователь не существет');
                break;
            case 'Invalid password':
                setAnswer('Не верный пароль');
                break;
            default:
                await SecureStore.setItemAsync('authorization', result.authorization);
                await SecureStore.setItemAsync('userId', result.dataValues.id);
                changeVerify(result.dataValues)
                setPassword('');
                setUser_name('');
                setEmail('');
                setAnswer('');
        }
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={[styles.container, { color: "black" }]}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { setSignIn(true), setAnswer('') }} >
                            <Text style={[styles.text, { color: signIn ? 'black' : 'grey' }]}>Войти / </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSignIn(false), setAnswer('') }} >
                            <Text style={[styles.text, { color: !signIn ? 'black' : 'grey' }]}>Зарегистрироваться</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        {signIn ? null : (
                            <TextInput value={user_name} onChangeText={setUser_name} placeholder='Введите имя пользователя' style={styles.input} />
                        )}
                        <TextInput value={email} onChangeText={setEmail} placeholder='Введите email' style={styles.input} />
                        <TextInput value={password} onChangeText={setPassword} placeholder='Введите пароль' style={styles.input} />

                    </View>
                    <Text style={[{ color: 'red', fontSize: 20, alignSelf: 'center' }]}>{answer}</Text>
                </View>
                <Button styles={[styles.text]}
                    color={'rgba(7, 186, 133, 1)'}
                    title={signIn ? 'Войти' : 'Зарегистрироваться'}
                    onPress={validation}>
                </Button>
            </View>

        </>
    )
}

export default StartForm;
