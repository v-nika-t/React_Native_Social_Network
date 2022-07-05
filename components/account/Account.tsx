import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import { Text, TextInput, Button, View, TouchableWithoutFeedback } from 'react-native';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import styles from './styleAccountList';
import { IStateAuth, RootState} from '../../types/action.types/state.types';


import { User } from '../../services/SocialNetworkServices';
import { editDataAccount } from '../../actions/auth.action';

const Account: React.FC = () => {
    const server = User;
    const dispatch = useDispatch();
    const state = useSelector<RootState, IStateAuth>((state) => state.auth);
    const {  user_name, email, canAllSeeAccount, id }  = {...state.dataAccount}; 

    const userId: any= id;
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(true);
    const [result, setResult] = useState('');
    const [isChecked, setIsChecked] = useState(canAllSeeAccount);
    const initialValues = { user_name, email, canAllSeeAccount, password: '' }

    useFocusEffect(
        
        useCallback(() => back, [])
    )

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

    const changeDataAccount = async (values:object) => {
        const result = await server.edit(userId, { ...values, canAllSeeAccount: isChecked });
        result == 'done' ? dispatch(editDataAccount(values)) : null; 
        setEdit(false);
    }

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
                    <Text style={{ fontSize: 20 }}> ******** </Text>
                    <AntDesign style={{ marginLeft: 10 }} name={isChecked ? 'checkcircle' : 'closecircle'} size={26} color={isChecked ? 'green' : 'red'} />
                </View>
            </View>
        </>) : (<Formik
            initialValues={initialValues}
            onSubmit={changeDataAccount}
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
                                    secureTextEntry={true}
                                    style={styles.input}
                                    value={props.values.password}
                                    placeholder='Новый пароль'
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



