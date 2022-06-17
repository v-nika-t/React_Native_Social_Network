import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Text, TextInput, Button, View, TouchableWithoutFeedback } from 'react-native';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from './styleAccountList';

import SocialNetworkServices from '../../services/SocialNetworkServices';


const Account = () => {

    const server = new SocialNetworkServices('user');
    const dispatch = useDispatch();
    const state = useSelector(state => state.user);
    console.log(state)

    //const props = { user_name: 'userName', email: "email@email.ru", password: '***', canAllSeeAccount: true };
    const { user_name, email, canAllSeeAccount } = state;
    const userId = state.id;
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(true);
    const [result, setResult] = useState('');
    const [isChecked, setIsChecked] = useState(canAllSeeAccount);
    const initialValues = { user_name, email, password: '*********', canAllSeeAccount }

    const Titles = () => {
        return (
            <View style={{ flex: 2, marginRight: 5 }}>
                <Text style={styles.titleText}>Имя пользователя:</Text>
                <Text style={styles.titleText}>Почта:</Text>
                <Text style={styles.titleText}>Пароль:</Text>
                <Text style={styles.titleText}>Все могут просматривать профиль:</Text>
            </View>
        )
    }

    const back = () => {
        setIsChecked(canAllSeeAccount);
        setEdit(false)
    }

    useFocusEffect(
        useCallback(() => back, [])
    )

    return (<>
        {!edit ? (<>

            <TouchableWithoutFeedback onPress={() => setEdit(true)}>
                <Feather style={{ marginLeft: '90%', marginTop: 10 }} name="edit" size={30} color="black" />
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Titles />
                <View>
                    <Text style={{ fontSize: 20 }}>{user_name}</Text>
                    <Text style={{ fontSize: 20 }}>{email} </Text>
                    <Text style={{ fontSize: 20 }}> ********* </Text>
                    <AntDesign style={{ marginLeft: 10 }} name={isChecked ? 'checkcircle' : 'closecircle'} size={26} color={isChecked ? 'green' : 'red'} />
                </View>
            </View>
        </>) : (<Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                const result = server.edit(userId, { ...values, canAllSeeAccount: isChecked });
                console.log(await result); // Записать результат в State
                setEdit(false);
            }}
        >
            {(props) => {
                return (
                    <>
                        <TouchableWithoutFeedback onPress={back}>
                            <Ionicons name="arrow-back" size={30} color="black" />
                        </TouchableWithoutFeedback>
                        <Text style={[{ color: error ? 'red' : 'green' }]}>{result}</Text>
                        <View style={styles.containerForEdit}>
                            <View style={{ flex: 2 }}>
                                <TextInput
                                    style={styles.input}
                                    value={props.values.user_name}
                                    placeholder='Имя пользователя'
                                    onChangeText={props.handleChange('user_name')}
                                />
                                <TextInput
                                    style={styles.input}
                                    value={props.values.email}
                                    placeholder='Почта'
                                    onChangeText={props.handleChange('email')}
                                />
                                <TextInput
                                    textContentType='password'
                                    style={styles.input}
                                    value={props.values.password}
                                    placeholder='Пароль'
                                    onChangeText={props.handleChange('password')}
                                />
                                <View style={styles.container} >
                                    <Text style={[styles.titleText, styles.input]}>Все могут просматривать профиль:</Text>
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
                                </View>
                            </View>


                        </View>
                        <Button
                            title="Изменить"
                            onPress={props.handleSubmit} />
                    </>
                )
            }}
        </Formik>
        )}

    </>)
}

export default Account



