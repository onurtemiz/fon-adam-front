import React from 'react';
import { useAuth } from '../../AuthContext';
import { showToOwner } from '@utils';
import { usePortfolio } from '../containers/PortfolioDetail/PortfolioContext';
import PurchasesTableHeaderStyles from './styles';
import FundPurchases from './FundPurchases';
import EditPurchaseTableColumns from './EditPurchaseTableColumns';

const PurchasesTableHeader = () => {
  const { portfolio } = usePortfolio();
  const { user } = useAuth();

  if (!showToOwner(portfolio, user)) {
    return null;
  }

  return (
    <PurchasesTableHeaderStyles>
      <EditPurchaseTableColumns />
      <FundPurchases />
    </PurchasesTableHeaderStyles>
  );
};

export default PurchasesTableHeader;
