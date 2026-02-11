import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { deleteUser, loadUsers, syncUsers } from '../../store/users/userThunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS = ['All', 'Admin', 'Manager'] as const;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'UserList'>;

const UserListScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavProp>();

  const users = useAppSelector(state => state.users.users);

  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('All');
  const [search, setSearch] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    dispatch(loadUsers());

    dispatch(syncUsers())
      .unwrap()
      .then(() => dispatch(loadUsers()))
      .catch(() => {});
  }, [dispatch]);

  const filteredUsers = React.useMemo(() => {
    return users.filter(user => {
      const roleMatch =
        activeTab === 'All' ||
        user.role?.toLowerCase() === activeTab.toLowerCase();

      const searchMatch =
        !search || user.name?.toLowerCase().includes(search.toLowerCase());

      return roleMatch && searchMatch;
    });
  }, [users, activeTab, search]);

  const groupedUsers = React.useMemo(() => {
    return filteredUsers.reduce((acc, user) => {
      const letter = user.name?.[0]?.toUpperCase() ?? '#';
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(user);
      return acc;
    }, {} as Record<string, typeof filteredUsers>);
  }, [filteredUsers]);

  const sections = React.useMemo(
    () => Object.keys(groupedUsers).sort(),
    [groupedUsers],
  );

  const handleNavigateToAddUser = React.useCallback(() => {
    navigation.navigate('AddUser');
  }, [navigation]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteUser(id));
    dispatch(loadUsers());
  };
  const handleEdit = (user: any) => {
    navigation.navigate('AddUser', {
      user,
      isEdit: true,
    });
  };
const isLoading = true
  return (
    <SafeAreaView style={[styles.container, isLoading&&styles.isLoadingStyle]}>
      {search === '' && (
        <View style={styles.tabContainer}>
          {TABS.map(tab => (
            <Pressable
              testID={`tab-${tab}`}
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabWrapper, activeTab === tab && styles.tabActive]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.searchBox}>
        <TextInput
          ref={inputRef}
          placeholder="Search users"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <Pressable onPress={() => setSearch('')}>
          <Text>Close</Text>
        </Pressable>
      </View>

      <FlatList
        data={sections}
        keyExtractor={i => i}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews
        renderItem={({ item }) => (
          <View>
            <Text style={styles.sectionText}>{item}</Text>
            {groupedUsers[item].map(user => (
              <View key={user.id} style={styles.row}>
                <View style={styles.avatarWrapper}>
                  <Text style={styles.avatarText}>{user.name?.[0]}</Text>
                </View>
                <View>
                  <Text style={styles.nameText}>{user.name}</Text>

                  {user.role && (
                    <Text style={styles.roleText}>{user.role}</Text>
                  )}
                </View>
                <View style={styles.row1}>
                  <Pressable
                    onPress={() => handleEdit(user)}
                    testID={`edit-${user.id}`}
                  >
                    <Text style={styles.editText}>Edit</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleDelete(user.id)}
                    testID={`delete-${user.id}`}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
      />

      <Pressable style={styles.fabBtn} onPress={handleNavigateToAddUser}>
        <Text style={styles.plusIcon}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default UserListScreen;
