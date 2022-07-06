 import { NavigatorScreenParams } from '@react-navigation/native';

 export type TStackNavigation  = {
    startPage: undefined,
    comments: undefined,
    editPost: undefined,
    chatWithUser: undefined, 
    editUser: undefined,
    account: NavigatorScreenParams<TTabNavigation>,
    users: NavigatorScreenParams<TTabAdminNavigation>
  };


export type TTabNavigation = {
    news: NavigatorScreenParams<TDrawerNavigator>,
    friends: undefined,
    chatList: undefined,
    profile: undefined,
}  

export type TTabAdminNavigation ={
    allUsers: undefined,
    addUser: undefined,
    profile: undefined,
}  

export type TDrawerNavigator ={
    allPost: undefined,
    ownPost: undefined,
    addPost: undefined,
}
