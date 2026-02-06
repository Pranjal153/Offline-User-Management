import { createAsyncThunk } from '@reduxjs/toolkit';
import { apolloClient } from '../../api/apolloClient';
import { LIST_ZELLER_CUSTOMERS } from '../../api/queries';
import { UserRepository } from '../../repositories/UserRepository';
import { ZellerCustomerConnection, ZellerCustomer } from '../../types/graphql';

export const loadUsers = createAsyncThunk<ZellerCustomer[]>(
  'users/load',
  async () => {
    return await UserRepository.getAll();
  }
);

export const syncUsers = createAsyncThunk(
  'users/sync',
  async (_, { rejectWithValue }) => {
    try {
      let nextToken: string | null = null;

      do {
        const { data } = await apolloClient.query<{
          listZellerCustomers: ZellerCustomerConnection;
        }>({
          query: LIST_ZELLER_CUSTOMERS,
          variables: {
            limit: 100,
            nextToken,
          },
          fetchPolicy: 'network-only',
        });
        const connection = data.listZellerCustomers;

        if (connection?.items?.length) {
          await UserRepository.bulkUpsert(connection.items);
        }

        nextToken = connection?.nextToken ?? null;
      } while (nextToken);

      return true;
    } catch {
      return rejectWithValue('Offline or sync failed');
    }
  }
);

export const addUser = createAsyncThunk(
  'users/add',
  async (user: ZellerCustomer) => {
    await UserRepository.insert(user);
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async (user: ZellerCustomer) => {
    await UserRepository.update(user);
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id: string) => {
    await UserRepository.delete(id);
  }
);
