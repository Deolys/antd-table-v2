import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DATE_FORMAT } from '@/shared/consts';

import { useTableColumns } from './use-table-columns';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue([new URLSearchParams()]),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: jest.fn((fn) => fn()),
}));

describe('useTableColumns', () => {
  const t = jest.fn((key) => key);

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({ t });
  });

  it('should render columns with correct headers', () => {
    const columns = useTableColumns();

    expect(columns).toHaveLength(7);
    expect(columns[0].title).toBe('№');
    expect(columns[1].title).toBe('user.email');
    expect(columns[2].title).toBe('user.name');
    expect(columns[3].title).toBe('user.typeName');
    expect(columns[4].title).toBe('user.lastVisitDate');
    expect(columns[5].title).toBe('user.description');
    expect(columns[6].title).toBe('');
  });

  it('should render correct index in the first column', () => {
    const columns = useTableColumns(5);
    const renderIndex = columns[0].render as (
      text: string | number | undefined,
      record: { _id: string },
      index: number,
    ) => React.ReactNode;
    const indexElement = renderIndex(null, null, 0);

    render(<div>{indexElement}</div>);

    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('should format date correctly in the last visit date column', () => {
    const columns = useTableColumns();
    const renderDate = columns[4].render as (date: string) => React.ReactNode;
    const dateElement = renderDate('2023-10-10');

    render(<div>{dateElement}</div>);

    expect(screen.getByText(dayjs('2023-10-10').format(DATE_FORMAT))).toBeInTheDocument();
  });

  it('should render edit button with correct attributes', () => {
    const columns = useTableColumns();
    const renderAction = columns[6].render as (
      text: string | number | undefined,
      record: { _id: string },
    ) => React.ReactNode;
    const actionElement = renderAction(null, { _id: '123' });

    render(<div>{actionElement}</div>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('img')).toHaveAttribute('src', 'test-file-stub');
    expect(button.querySelector('img')).toHaveAttribute('title', 'common.edit');
    expect(button.querySelector('img')).toHaveAttribute('alt', 'common.edit');
  });
});
