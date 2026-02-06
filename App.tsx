import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserListScreen from './src/screens/UserList/index';
import AddUserScreen from './src/screens/AddUser';
import { Provider } from 'react-redux';
import { ApolloProvider } from "@apollo/client/react";
import { store } from './src/store';
import { apolloClient } from './src/api/apolloClient';
import { useEffect } from 'react';
import { createUserTable } from './src/db/usertable';

export type RootStackParamList = {
  UserList: undefined;
  AddUser: {
    user?: {
      id: string;
      name: string;
      email?: string;
      role: 'Admin' | 'Manager';
    };
    isEdit?: boolean;
  } | undefined
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserList" component={UserListScreen} />
      <Stack.Screen name="AddUser" component={AddUserScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
  createUserTable();
}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>

     <ApolloProvider client={apolloClient}>
      <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
    </ApolloProvider>
    </SafeAreaView>

  );
}
