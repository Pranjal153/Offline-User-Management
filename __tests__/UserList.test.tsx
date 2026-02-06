import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UserListScreen from '../src/screens/UserList';
import {
  deleteUser,
  loadUsers,
} from '../src/store/users/userThunks';
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const mockDispatch = jest.fn();

jest.mock('../src/store/hooks', () => ({
  //   useAppDispatch: () => mockDispatch,
  useAppDispatch: () => jest.fn(action => action),
  useAppSelector: (selector: any) =>
    selector({
      users: {
        users: [
          {
            id: '1',
            name: 'Alice Johnson',
            role: 'Admin',
          },
          {
            id: '2',
            name: 'Bob Smith',
            role: 'Manager',
          },
          {
            id: '3',
            name: 'Charlie Brown',
          },
        ],
      },
    }),
}));

const deleteUserMock = jest.fn();
const loadUsersMock = jest.fn();
const syncUsersMock = jest.fn(() => ({
  unwrap: () => Promise.resolve(),
}));

jest.mock('../src/store/users/userThunks', () => ({
  deleteUser: jest.fn(() => ({ type: 'deleteUser' })),
  updateUser: jest.fn(() => ({ type: 'updateUser' })),
  loadUsers: jest.fn(() => ({ type: 'loadUsers' })),
  syncUsers: () => ({
    unwrap: () => Promise.resolve(),
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('UserListScreen', () => {
  it('renders users from redux store', () => {
    const { getByText } = render(<UserListScreen />);

    expect(getByText('Alice Johnson')).toBeTruthy();
    expect(getByText('Bob Smith')).toBeTruthy();
    expect(getByText('Charlie Brown')).toBeTruthy();
  });

  it('filters users by Admin tab', () => {
    const { getByTestId, queryByText } = render(<UserListScreen />);

    fireEvent.press(getByTestId('tab-Admin'));

    expect(queryByText('Alice Johnson')).toBeTruthy();
    expect(queryByText('Bob Smith')).toBeNull();
  });

  it('filters users by Manager tab', () => {
    const { getByTestId, queryByText } = render(<UserListScreen />);

    fireEvent.press(getByTestId('tab-Manager'));

    expect(queryByText('Bob Smith')).toBeTruthy();
    expect(queryByText('Alice Johnson')).toBeNull();
  });

  it('filters users by search text', () => {
    const { getByPlaceholderText, queryByText } = render(<UserListScreen />);

    fireEvent.changeText(getByPlaceholderText('Search users'), 'alice');

    expect(queryByText('Alice Johnson')).toBeTruthy();
    expect(queryByText('Bob Smith')).toBeNull();
  });

  it('navigates to AddUser screen on FAB press', () => {
    const { getByText } = render(<UserListScreen />);

    fireEvent.press(getByText('+'));

    expect(mockNavigate).toHaveBeenCalledWith('AddUser');
  });

  it('navigates to edit user screen', () => {
    const { getByTestId } = render(<UserListScreen />);

    fireEvent.press(getByTestId('edit-1'));

    expect(mockNavigate).toHaveBeenCalledWith('AddUser', {
      user: { id: '1', name: 'Alice Johnson', role: 'Admin' },
      isEdit: true,
    });
  });

  it('dispatches deleteUser and reloads users', async () => {
    const { getByTestId } = render(<UserListScreen />);

    fireEvent.press(getByTestId('delete-1'));

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith('1');
      expect(loadUsers).toHaveBeenCalled();
    });
  });

  it('clears search text when Close is pressed', () => {
    const { getByPlaceholderText, getByText } = render(<UserListScreen />);

    const input = getByPlaceholderText('Search users');

    fireEvent.changeText(input, 'bob');
    fireEvent.press(getByText('Close'));

    expect(input.props.value).toBe('');
  });
});
