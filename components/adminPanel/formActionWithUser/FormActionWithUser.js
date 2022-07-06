import { useCallback, useState, useEffect } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';

import { addUser, editUser } from '../../../actions/user.action';

import { User } from '../../../services/SocialNetworkServices';
import styles from './styleFormActionWithUser';

const FormActionWithUser = ({ navigation, route }) => {

    const user = useSelector(state => state.user.foundUsers)
    const service = User;
    const placeholder = {
        email: 'Введите email',
        user_name: 'Введите имя пользователя',
        password: 'Введите пароль'
    };


    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(route.params ? route.params.email : '');
    const [user_name, setUser_name] = useState(route.params ? route.params.user_name : '');
    const [isChecked, setIsChecked] = useState(route.params ? route.params.canAllSeeAccount : true);
    const [isAdmin, setIsAdmin] = useState(route.params ? (route.params.role.name == 'admin' ? true : false) : false);

    const dispatch = useDispatch();

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
                dispatch(addUser(data[0], true))
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
        const newDate = { email, user_name, password, canAllSeeAccount: isChecked, role: isAdmin ? 2 : 1 };
        password ? newDate['password'] = password : null;
        const result = await service.edit(route.params.id, newDate);


        if (result == 'done') {
            dispatch(editUser({
                ...route.params,
                email,
                user_name,
                password,
                canAllSeeAccount: isChecked,
                role: { name: isAdmin ? 'admin' : 'user' }
            }));
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
                        isChecked={isAdmin}
                        onPress={() => setIsAdmin(isAdmin => !isAdmin)}
                        iconStyle={{
                            borderColor: 'grey'
                        }}
                    />
                </View>
            </ScrollView>
            <Button
                color='#3CB371'
                title={route.params ? "Изменить" : "Добавить"}
                onPress={route.params ? editOneUser : addOneUser} />
        </>
    )
}

export default FormActionWithUser;