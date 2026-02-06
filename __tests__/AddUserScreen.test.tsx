import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import AddUserScreen from '../src/screens/AddUser';

// ===== MOCK NAVIGATION =====
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
  useRoute: jest.fn(() => ({
    params: {},
  })),
}));

// ===== MOCK REDUX =====
jest.mock('../src/store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

// ===== MOCK THUNKS =====
jest.mock('../src/store/users/userThunks', () => ({
  addUser: jest.fn(() => ({ type: 'addUser' })),
  updateUser: jest.fn(() => ({ type: 'updateUser' })),
  loadUsers: jest.fn(() => ({ type: 'loadUsers' })),
}));

// ===== MOCK VALIDATION =====
jest.mock('../src/utils/validation', () => ({
  isValidName: jest.fn(),
  isValidEmail: jest.fn(),
}));

import { isValidName, isValidEmail } from '../src/utils/validation';
import { addUser, updateUser, loadUsers } from '../src/store/users/userThunks';

jest.spyOn(Alert, 'alert');

describe('AddUserScreen', () => {
  it('shows error when name is empty', () => {
    const { getByTestId } = render(<AddUserScreen />);

    fireEvent.press(getByTestId('submitButton'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Name should not be empty.',
    );
  });

  it('shows error for invalid name characters', () => {
    (isValidName as jest.Mock).mockReturnValue(false);

    const { getByTestId } = render(<AddUserScreen />);

    fireEvent.changeText(getByTestId('firstNameInput'), 'J@hn');
    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');

    fireEvent.press(getByTestId('submitButton'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Name can contain only alphabets and spaces.',
    );
  });

  it('shows error when name exceeds 50 characters', () => {
    (isValidName as jest.Mock).mockReturnValue(true);

    const longName = 'a'.repeat(51);
    const { getByTestId } = render(<AddUserScreen />);

    fireEvent.changeText(getByTestId('firstNameInput'), longName);
    fireEvent.changeText(getByTestId('lastNameInput'), 'Test');

    fireEvent.press(getByTestId('submitButton'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Name must not exceed 50 characters.',
    );
  });

  it('shows error when email is empty', () => {
    (isValidName as jest.Mock).mockReturnValue(true);

    const { getByTestId } = render(<AddUserScreen />);

    fireEvent.changeText(getByTestId('firstNameInput'), 'John');
    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');

    fireEvent.press(getByTestId('submitButton'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Please enter a email address.',
    );
  });

  it('shows error for invalid email', () => {
    (isValidName as jest.Mock).mockReturnValue(true);
    (isValidEmail as jest.Mock).mockReturnValue(false);

    const { getByTestId } = render(<AddUserScreen />);

    fireEvent.changeText(getByTestId('firstNameInput'), 'John');
    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
    fireEvent.changeText(getByTestId('emailInput'), 'john@');

    fireEvent.press(getByTestId('submitButton'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Please enter a valid email address.',
    );
  });
  it('dispatches addUser and loadUsers on valid input', () => {
    (isValidName as jest.Mock).mockReturnValue(true);
    (isValidEmail as jest.Mock).mockReturnValue(true);

    const { getByTestId } = render(<AddUserScreen />);

    fireEvent.changeText(getByTestId('firstNameInput'), 'John');
    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
    fireEvent.changeText(getByTestId('emailInput'), 'john@test.com');

    fireEvent.press(getByTestId('submitButton'));

    expect(addUser).toHaveBeenCalled();
  });
  it('dispatches updateUser in edit mode', () => {
    const useRoute = require('@react-navigation/native').useRoute;

    useRoute.mockReturnValue({
      params: {
        isEdit: true,
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@test.com',
          role: 'ADMIN',
        },
      },
    });

    (isValidName as jest.Mock).mockReturnValue(true);
    (isValidEmail as jest.Mock).mockReturnValue(true);
    const { getByTestId } = render(<AddUserScreen />);
    fireEvent.press(getByTestId('submitButton'));
    expect(updateUser).toHaveBeenCalled();
    expect(loadUsers).toHaveBeenCalled();
  });
});
