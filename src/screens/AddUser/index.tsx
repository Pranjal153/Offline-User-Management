import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import { useAppDispatch } from '../../store/hooks';
import { addUser, loadUsers, updateUser } from '../../store/users/userThunks';
import { useNavigation, useRoute } from '@react-navigation/native';

type Role = 'admin' | 'manager';

const AddUserScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute<any>();

  const isEdit = route.params?.isEdit;
  const existingUser = route.params?.user;
  const [role, setRole] = useState<Role>('manager');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateUser = async () => {
    const payload = {
      id: isEdit ? existingUser.id : Date.now().toString(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim() || undefined,
      role,
    };

    if (isEdit) {
      await dispatch(updateUser(payload));
    } else {
      await dispatch(addUser(payload));
    }

    dispatch(loadUsers());
    navigation.goBack();
  };

  useEffect(() => {
    if (isEdit && existingUser) {
      const [first, ...rest] = existingUser?.name?.split(' ');
      setFirstName(first);
      setLastName(rest?.join(' '));
      setEmail(existingUser?.email ?? '');
      setRole(existingUser?.role.toLowerCase());
    }
  }, [isEdit, existingUser]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable style={styles.close} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>X</Text>
      </Pressable>

      <Text style={styles.title}>New User</Text>

      <View style={styles.field}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>User Role</Text>
        <View style={styles.roleContainer}>
          {(['admin', 'manager'] as Role[]).map(r => (
            <Pressable
              key={r}
              onPress={() => setRole(r)}
              style={[styles.roleButton, role === r && styles.roleActive]}
            >
              <Text
                style={[styles.roleText, role === r && styles.roleTextActive]}
              >
                {r}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>
          {isEdit ? 'Update' : 'Create'} User
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default AddUserScreen;
