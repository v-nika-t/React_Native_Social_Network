import { useCallback, useState, useEffect } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';

import { addUser, editUser } from '../../../actions/user.action';

import { User } from '../../../services/SocialNetworkServices';
import styles from './styleFormActionWithUser';

const FormActionWithUser = ({ navigation, route }) => {

    const service = User;
    const placeholder = {
        email: 'Введите email',
        user_name: 'Введите имя пользователя',
        password: 'Введите пароль'
    };

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user_name, setUser_name] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();


    useEffect(() => {
        route.params !== undefined ? service.getOne(route.params.userId).then(data => {
            const { email, user_name, isChecked, role } = data[0];
            setEmail(email);
            setUser_name(user_name);
            setIsChecked(isChecked);
            console.log(role.name);
            setIsAdmin(role.name == 'admin' ? true : false)
        }) : null;
    }, [route.params])

    const [result, setResult] = useState('');
    const [error, setError] = useState(false);

    const addOneUser = () => {
        if (!(email && user_name && password)) {
            setResult('Обязательные поля не заполнены');
            setError(true);
            return
        }
        service.add({ email, user_name, password, role: isAdmin ? 2 : 1 })
            .then((data) => {
                dispatch(addUser({ id: data.id, user_name: data.user_name, }, true))
                setEmail('');
                setUser_name('');
                setPassword('')
                setResult('Запись добавлена')
                setError(false);
            }).catch(e => {
                setError(true);
                setResult('Что-то пошло НЕ так: ' + e)
            })
    }

    const editOneUser = async () => {
        if (!(email && user_name)) {
            setResult('Обязательные поля не заполнены');
            setError(true);
            return
        }
        const newDate = { email, user_name, password, canAllSeeAccount: isChecked };
        password ? newDate['password'] = password : null;
        isAdmin ? newDate['role'] = isAdmin : null;
        const result = await service.edit(route.params.userId, newDate);

        if (result == 'done') {
            dispatch(editUser({ id: route.params.userId, user_name }));
            navigation.goBack()
        } else {
            setResult('Что-то пошло не так');
            setError(true);
        }
    }

    useFocusEffect(
        useCallback(() => {
            return () => {
                setEmail('');
                setEmail('');
                setPassword('')
            };
        }, []))



    return (
        <>
            <ScrollView>
                <Text style={[styles.text, { color: error ? 'red' : 'green' }]}>{result}</Text>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        value={user_name}
                        placeholder={placeholder.user_name}
                        onChangeText={setUser_name}
                    />
                    <TextInput
                        style={styles.input}
                        value={email}
                        placeholder={placeholder.email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder={placeholder.password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.icon}>
                    <Text style={[styles.input, { fontWeight: "bold", width: '80%', }]}>Все могут просматривать профиль:</Text>
                    <BouncyCheckbox
                        size={25}
                        fillColor='green'
                        unfillColor="#FFFFFF"
                        isChecked={isChecked}
                        onPress={() => setIsChecked(isChecked => !isChecked)}
                        iconStyle={{
                            borderColor: 'grey'
                        }}
                    />
                    <Text style={[styles.input, { fontWeight: "bold", width: '80%', marginTop: 0, }]}>Aдминистратор:</Text>
                    <BouncyCheckbox
                        size={25}
                        fillColor='green'
                        unfillColor="#FFFFFF"
                        isAdmin={isAdmin}
                        onPress={() => setIsChecked(isAdmin => !isAdmin)}
                        iconStyle={{
                            borderColor: 'grey'
                        }}
                    />
                </View>
            </ScrollView>
            <Button
                title={route.params ? "Изменить" : "Добавить"}
                onPress={route.params ? editOneUser : addOneUser} />
        </>
    )
}

export default FormActionWithUser;