import {
  CaretDown,
  CaretUp,
  DotsHorizontalRounded,
} from '@styled-icons/boxicons-regular';
import { Dropdown, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { PurchaseCardDropdownMenu } from '..';
import { useAuth } from '../../AuthContext';
import { showToOwner } from '@utils';
import { usePortfolio } from '../containers/PortfolioDetail/PortfolioContext';
import { UpDownStatistic } from '@components';
import PurchasesTableStyles, {
  StyledAvatar,
  StyledTable,
  Strip,
  Name,
} from './styles';
import { useMediaQuery } from 'react-responsive';

const PurchasesTable = () => {
  const isTabletAndDown = useMediaQuery({ maxWidth: 992 });
  const { stacks, portfolio, tableColumns } = usePortfolio();
  const { user } = useAuth();
  const [expandedRows, setExpandedRows] = useState([]);

  const columns = [
    ...(tableColumns.find((col) => col.value === 'code' && col.active)
      ? [
          {
            title: 'KOD',
            dataIndex: 'color',
            key: 'code',
            align: 'center',
            width: '62px',
            render: (color, fund) => (
              <div style={{ height: '36px', width: '31px' }}>
                <Strip color={color ?? fund.fund.color} />
                <StyledAvatar color={color ?? fund.fund.color} size="large">
                  {fund?.code ?? fund.fund.code}
                </StyledAvatar>
              </div>
            ),
          },
        ]
      : []),
    ...(!isTabletAndDown &&
    tableColumns.find((col) => col.value === 'title' && col.active)
      ? [
          {
            title: 'FON',
            dataIndex: 'title',
            key: 'title',
            render: (title, fund) => (
              <Tooltip
                title={title ?? fund.fund.title}
                overlayClassName="default-tooltip"
              >
                <Name>{title ?? fund.fund.title}</Name>
              </Tooltip>
            ),
          },
        ]
      : []),
    ...(tableColumns.find((col) => col.value === 'date' && col.active)
      ? [
          {
            title: 'ALIŞ / TARİH',
            dataIndex: 'date',
            key: 'date',
            width: '80px',
            render: (date, purchase) =>
              purchase.purchases
                ? purchase.purchases.length > 1
                  ? purchase.purchases.length
                  : moment(purchase.purchases[0].date).format('DD.MM.YYYY')
                : moment(date).format('DD.MM.YYYY'),
          },
        ]
      : []),

    ...(!isTabletAndDown &&
    tableColumns.find((col) => col.value === 'daily' && col.active)
      ? [
          {
            title: '1 GÜN',
            dataIndex: 'statistics',
            key: 'daily',
            render: (statistics) => (
              <UpDownStatistic value={statistics.lastDay} />
            ),
          },
        ]
      : []),

    ...(!isTabletAndDown &&
    tableColumns.find((col) => col.value === 'weekly' && col.active)
      ? [
          {
            title: '1 HAFTA',
            dataIndex: 'statistics',
            key: 'weekly',
            render: (statistics) => (
              <UpDownStatistic value={statistics.lastWeek} />
            ),
          },
        ]
      : []),

    ...(!isTabletAndDown &&
    tableColumns.find((col) => col.value === 'monthly' && col.active)
      ? [
          {
            title: '1 AY',
            dataIndex: 'statistics',
            key: 'monthly',
            render: (statistics) => (
              <UpDownStatistic value={statistics.lastMonth} />
            ),
          },
        ]
      : []),

    ...(tableColumns.find((col) => col.value === 'yearly' && col.active)
      ? [
          {
            title: '1 YIL',
            dataIndex: 'statistics',
            key: 'yearly',
            render: (statistics) => (
              <UpDownStatistic value={statistics.lastYear} />
            ),
          },
        ]
      : []),

    ...(tableColumns.find((col) => col.value === 'allTime' && col.active)
      ? [
          {
            title: 'TÜMÜ',
            dataIndex: 'statistics',
            key: 'allTime',
            render: (statistics) => (
              <UpDownStatistic value={statistics.allTime} />
            ),
          },
        ]
      : []),
    ...(tableColumns.find((col) => col.value === 'pieces' && col.active)
      ? [
          {
            title: 'ADET',
            dataIndex: 'pieces',
            key: 'pieces',
          },
        ]
      : []),
    ...(tableColumns.find((col) => col.value === 'boughtValue' && col.active)
      ? [
          {
            title: 'MALİYET',
            dataIndex: 'statistics',
            key: 'boughtValue',
            render: (statistics) => `${statistics.boughtValue.toFixed(2)}₺`,
          },
        ]
      : []),

    ...(tableColumns.find((col) => col.value === 'gain' && col.active)
      ? [
          {
            title: 'KAZANÇ',
            dataIndex: 'statistics',
            key: 'gain',
            render: (statistics) =>
              `${(statistics.currentValue - statistics.boughtValue).toFixed(
                2
              )}₺`,
          },
        ]
      : []),

    ...(tableColumns.find((col) => col.value === 'currentPrice' && col.active)
      ? [
          {
            title: 'ANLIK',
            dataIndex: 'statistics',
            key: 'currentPrice',
            render: (statistics) => `${statistics.currentValue.toFixed(2)}₺`,
          },
        ]
      : []),

    {
      title: '',
      dataIndex: '',
      key: 'menu',
      width: '60px',
      render: (stuff, purchase) =>
        ((purchase.purchases &&
          purchase.purchases.length === 1 &&
          !expandedRows.includes(purchase._id)) ||
          !purchase.purchases) &&
        showToOwner(portfolio, user) && (
          <PurchaseCardDropdownMenu
            purchase={purchase.purchases ? purchase.purchases[0] : purchase}
          />
        ),
    },
  ];

  return (
    <PurchasesTableStyles>
      <StyledTable
        columns={columns}
        dataSource={stacks}
        rowKey="_id"
        tableLayout="auto"
        pagination={false}
        childrenColumnName="purchases"
        expandIconColumnIndex={
          isTabletAndDown
            ? tableColumns.filter((c) => c.active).length - 5
            : tableColumns.filter((c) => c.active).length
        }
        indentSize={0}
        expandedRowKeys={expandedRows}
        expandable={{
          onExpandedRowsChange: (expandedRows) => {
            setExpandedRows(expandedRows);
          },
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <CaretUp
                onClick={(e) => onExpand(record, e)}
                className="dropdown-icon"
              />
            ) : (
              record.purchases &&
              record.purchases.length !== 1 && (
                <CaretDown
                  onClick={(e) => onExpand(record, e)}
                  className="dropdown-icon"
                />
              )
            ),
        }}
      />
    </PurchasesTableStyles>
  );
};

export default PurchasesTable;
