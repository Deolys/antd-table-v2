import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { mockUsers } from '@/shared/test/__mocks__/mock-data';
import { renderWithProviders } from '@/shared/test/utils';

import { useTableColumns, useTableParams } from '../lib/hooks';
import { UsersTable } from './users-table';

jest.mock('../lib/hooks', () => ({
  useTableColumns: jest.fn(),
  useTableParams: jest.fn(),
}));

const mockUseTableParams = {
  tableParams: { pagination: {} },
  handleTableChange: jest.fn(),
  users: [],
  skip: 0,
  isFetching: false,
  rowSelection: {},
};
describe('UsersTable', () => {
  const mockUseTableColumns = jest.fn(() => [{ title: 'Name', dataIndex: 'name', key: 'name' }]);

  beforeEach(() => {
    (useTableParams as jest.Mock).mockReturnValue(mockUseTableParams);
    (useTableColumns as jest.Mock).mockReturnValue(mockUseTableColumns());
  });

  it('renders empty state when there are no users', async () => {
    renderWithProviders(
      <MemoryRouter>
        <UsersTable />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Нет данных')).toBeInTheDocument();
    });
  });

  it('renders table when there are users', async () => {
    mockUseTableParams.users = mockUsers;
    renderWithProviders(
      <MemoryRouter>
        <UsersTable />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });
  });

  it('shows loading state when fetching data', async () => {
    mockUseTableParams.isFetching = true;
    const { container } = renderWithProviders(
      <MemoryRouter>
        <UsersTable />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(container.querySelector('.ant-spin-dot-item')).toBeInTheDocument();
    });
  });

  it('calls handleTableChange on table change', async () => {
    renderWithProviders(
      <MemoryRouter>
        <UsersTable />
      </MemoryRouter>,
    );

    const pagination = screen.getByTitle(/next page/i);
    fireEvent.click(pagination);

    await waitFor(() => {
      expect(mockUseTableParams.handleTableChange).toHaveBeenCalled();
      expect(mockUseTableParams.handleTableChange).toHaveBeenCalledWith(
        expect.objectContaining({ current: 2 }),
        expect.anything(),
        expect.anything(),
        expect.objectContaining({ action: 'paginate' }),
      );
    });
  });
});
