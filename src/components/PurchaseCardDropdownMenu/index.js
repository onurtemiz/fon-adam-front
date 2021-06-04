import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { errorHandler } from '@utils';
import { usePortfolio } from '../containers/PortfolioDetail/PortfolioContext';
import { portfolioService, purchaseService } from '@services';
import PurchaseEditModal from '@components/PurchaseEditModal';
import { DotsHorizontalRounded } from '@styled-icons/boxicons-regular';
const PurchaseCardDropdownMenu = ({ purchase }) => {
  const { setPortfolio } = usePortfolio();
  const [editOpen, setEditOpen] = useState(false);

  const handleMenu = async ({ key }) => {
    if (key === 'delete') {
      try {
        await purchaseService.delete(purchase._id);
        const portfolio = await portfolioService.show(purchase.portfolio);
        setPortfolio(portfolio);
      } catch (error) {
        errorHandler(error);
      }
    } else if (key === 'edit') {
      setEditOpen(true);
      return;
    }
  };

  const menu = () => (
    <Menu onClick={handleMenu}>
      <Menu.Item key="edit">Düzenle</Menu.Item>
      <Menu.Item key="delete">Sil</Menu.Item>
    </Menu>
  );

  return (
    <>
      {editOpen && (
        <PurchaseEditModal
          visible={editOpen}
          setVisible={setEditOpen}
          purchase={purchase}
        />
      )}

      <Dropdown
        overlayClassName="fixed-dropdown"
        trigger={['click']}
        placement="bottomRight"
        overlay={menu}
      >
        <DotsHorizontalRounded className="dropdown-icon" />
      </Dropdown>
    </>
  );
};

export default PurchaseCardDropdownMenu;
