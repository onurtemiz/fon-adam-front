import React, { useEffect, useState } from 'react';
import { Modal, notification, Spin } from 'antd';
import CapitalPicker from 'components/AddFundPurchase/CapitalPicker';
import FundDatePicker from 'components/FundDatePicker';
import { fundService, portfolioService, purchaseService } from '@services';
import moment from 'moment';
import PurchaseEditModalStyles, { Wrapper } from './styles';
import { errorHandler } from '@utils';
import { usePortfolio } from 'components/containers/PortfolioDetail/PortfolioContext';

const PurchaseEditModal = ({ visible, setVisible, purchase }) => {
  const [loading, setLoading] = useState(false);
  const [fund, setFund] = useState();
  const [newPurchase, setNewPurchase] = useState({
    date: purchase.date,
    pieces: purchase.pieces,
  });
  const [fundPrice, setFundPrice] = useState();
  const { setPortfolio } = usePortfolio();
  useEffect(() => {
    const fetchFund = async () => {
      const data = await fundService.show(purchase.fund.code);
      setFund({
        ...data,
        history: data.history.map((h) => {
          return {
            ...h,
            date: new Date(moment(h.date).startOf('day')).toISOString(),
          };
        }),
      });
      setLoading(false);
    };

    fetchFund();
  }, []);

  const updatePurchase = async () => {
    try {
      const valid = validatePurchase();
      if (!valid) return;
      setLoading(true);
      await purchaseService.update(purchase._id, {
        ...newPurchase,
        portfolio: purchase.portfolio,
        fund: purchase.fund._id,
      });
      const portfolio = await portfolioService.show(purchase.portfolio);
      setPortfolio(portfolio);
      setLoading(false);
      setVisible(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };

  const validatePurchase = () => {
    if (
      !newPurchase.date ||
      !newPurchase.pieces ||
      newPurchase.pieces === '0'
    ) {
      notification.error({
        message: 'Hata!',
        description: 'Lütfen bütün boşlukları doldurun!',
      });
      return false;
    }

    return true;
  };

  return (
    <Modal
      visible={visible}
      centered
      title={purchase?.fund?.title}
      width={600}
      cancelText="Vazgeç"
      okText="Güncelle"
      onCancel={() => setVisible(false)}
      onOk={updatePurchase}
    >
      <PurchaseEditModalStyles>
        <Spin spinning={loading} wrapperClassName="spinner">
          {fund ? (
            <Wrapper>
              <FundDatePicker
                defaultDate={purchase?.date}
                setDate={(date) => setNewPurchase({ ...newPurchase, date })}
                fund={fund}
                setFundPrice={setFundPrice}
              />

              <CapitalPicker
                defaultValue={purchase?.pieces}
                setCapital={(pieces) =>
                  setNewPurchase({ ...newPurchase, pieces })
                }
                capital={newPurchase.pieces}
                fund={fund}
                fundPrice={fundPrice}
                isDisabled={!newPurchase?.date || !fund}
              />
            </Wrapper>
          ) : (
            <Spin />
          )}
        </Spin>
      </PurchaseEditModalStyles>
    </Modal>
  );
};

export default PurchaseEditModal;
