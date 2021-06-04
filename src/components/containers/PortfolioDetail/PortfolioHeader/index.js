import {
  Check,
  CoinStack,
  EditAlt,
  Money,
  Trash,
  TrendingUp,
  X,
} from '@styled-icons/boxicons-regular';
import { Col, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { HeaderStatisticCard, WarningModal } from '@components';
import api from '../../../../api';
import { useAuth } from '../../../../AuthContext';
import { usePortfolio } from '../PortfolioContext';
import PortfolioHeaderStyles, {
  PortfolioTitle,
  PortfolioHeaderWrapper,
  StyledInput,
  HeaderStatisticsWrapper,
  StyledSelect,
} from './styles';
import { EyeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { showToOwner, getPortfolioStatus, errorHandler } from '@utils';
import { portfolioService } from '@services';

const PortfolioHeader = () => {
  const { portfolioHistory, portfolioNetHistory } = usePortfolio();

  return (
    <PortfolioHeaderStyles>
      <PortfolioHeaderSection />

      <HeaderStatisticsWrapper>
        <HeaderStatisticCard
          title="Maliyet"
          current={
            portfolioHistory[portfolioHistory.length - 1]?.value -
            portfolioNetHistory[portfolioNetHistory.length - 1]?.value
          }
          type="third"
          Icon={<Money className="static-icon" />}
        />

        <HeaderStatisticCard
          title="Net Kazanç"
          current={portfolioNetHistory[portfolioNetHistory.length - 1]?.value}
          trend={
            (portfolioNetHistory[portfolioNetHistory.length - 1]?.value /
              (portfolioHistory[portfolioHistory.length - 1]?.value -
                portfolioNetHistory[portfolioHistory.length - 1]?.value)) *
            100
          }
          type="secondary"
          Icon={
            <TrendingUp className="static-icon" style={{ marginTop: '3px' }} />
          }
        />
        <HeaderStatisticCard
          title="Toplam Para"
          current={portfolioHistory[portfolioHistory.length - 1]?.value}
          type="primary"
          Icon={<CoinStack className="static-icon" />}
        />
      </HeaderStatisticsWrapper>
    </PortfolioHeaderStyles>
  );
};

export default PortfolioHeader;

const PortfolioHeaderSection = () => {
  const { portfolio, setPortfolio } = usePortfolio();
  const { user } = useAuth();
  const [title, setTitle] = useState(portfolio.title);
  const [editOpen, setEditOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  const updatePortfolio = async () => {
    if (title === portfolio.title) {
      setEditOpen(false);
      return;
    }
    try {
      await portfolioService.update(portfolio._id, { title });
      const res = await portfolioService.show(portfolio._id);
      setPortfolio(res);
      setEditOpen(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <PortfolioHeaderWrapper>
      {warningOpen && (
        <DeletePortfolioModal
          warningOpen={warningOpen}
          setWarningOpen={setWarningOpen}
        />
      )}
      {editOpen ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledInput
            bordered={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Portöy başlığı..."
          />
          <X className="action-icon" onClick={() => setEditOpen(false)} />
          <Check
            className="action-icon"
            onClick={() => updatePortfolio(false)}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <PortfolioTitle>{portfolio.title}</PortfolioTitle>
          {showToOwner(portfolio, user) && (
            <>
              <EditAlt
                className="util-icon"
                onClick={() => setEditOpen(true)}
              />
              <Trash
                className="util-icon"
                onClick={() => setWarningOpen(true)}
              />
            </>
          )}
        </div>
      )}
      {showToOwner(portfolio, user) && <PortfolioPublicity />}
    </PortfolioHeaderWrapper>
  );
};

const PortfolioPublicity = () => {
  const { portfolio, setPortfolio } = usePortfolio();
  const [selectedStatus, setSelectedStatus] = useState(
    getPortfolioStatus(portfolio.status)
  );

  const updateStatus = async () => {
    if (selectedStatus === getPortfolioStatus(portfolio.status)) return;

    try {
      await portfolioService.status(portfolio._id, { status: selectedStatus });
      const res = await portfolioService.show(portfolio._id);
      setPortfolio(res);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    updateStatus();
  }, [selectedStatus]);

  return (
    <div>
      <EyeOutlined className="visibility-icon" />
      <StyledSelect
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e)}
        bordered={false}
        style={{ marginRight: '15px' }}
      >
        <Select.Option value="private">Gizli</Select.Option>
        <Select.Option value="unlisted">Liste Dışı</Select.Option>
        <Select.Option value="public">Herkese Açık</Select.Option>
      </StyledSelect>
    </div>
  );
};

const DeletePortfolioModal = ({ warningOpen, setWarningOpen }) => {
  const { portfolio } = usePortfolio();
  const history = useHistory();
  const { user } = useAuth();

  const deletePortfolio = async () => {
    try {
      await portfolioService.delete(portfolio._id);
      history.push(`/portfolios?owner=${user?.uid}`);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <WarningModal
      visible={warningOpen}
      onCancel={() => setWarningOpen(false)}
      onOk={() => deletePortfolio()}
    >
      <b>{portfolio.title}</b> portföyünü silmek istediğine emin misin?
      <br />
      <br />
      <b style={{ color: '#DC2626' }}>Bu işlemin geri dönüşü yoktur.</b>
    </WarningModal>
  );
};
