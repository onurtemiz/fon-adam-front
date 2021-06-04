import React, { useEffect } from 'react';
import { useState } from 'react';
import AddNewFundStyles, { CostPicker, PiecesPicker } from './styles';
import { FundAutoComplete } from '@components';
import { X } from '@styled-icons/boxicons-regular';
import { Tooltip } from 'antd';

const AddGuessFundPurchase = ({ setPurchases, purchases, purchase, funds }) => {
  const [fund, setFund] = useState();

  useEffect(() => {
    setPurchases([
      ...purchases.map((p) => (p._id === purchase._id ? purchase : p)),
    ]);
  }, [purchase]);

  useEffect(() => {
    if (fund) {
      setPurchases([
        ...purchases.map((p) =>
          p._id === purchase._id ? { ...purchase, fund: fund._id } : p
        ),
      ]);
    }
  }, [fund]);

  if (funds.length === 0) {
    return null;
  }

  return (
    <AddNewFundStyles>
      <FundAutoComplete funds={funds} setFund={setFund} />

      <PiecesPicker
        placeholder="Adet giriniz"
        bordered={false}
        onChange={(e) =>
          setPurchases(
            purchases.map((p) =>
              p._id === purchase._id
                ? { ...purchase, pieces: e.target.value }
                : p
            )
          )
        }
      />
      <Tooltip title="Fon maliyeti * fon adedi yani kaç para harcadığınızı girmelisiniz.">
        <CostPicker
          placeholder="Maliyet giriniz"
          bordered={false}
          onChange={(e) =>
            setPurchases(
              purchases.map((p) =>
                p._id === purchase._id
                  ? { ...purchase, cost: e.target.value }
                  : p
              )
            )
          }
        />
      </Tooltip>

      <X
        className="action-icon"
        onClick={() =>
          setPurchases(purchases.filter((p) => p._id !== purchase._id))
        }
      />
    </AddNewFundStyles>
  );
};

export default AddGuessFundPurchase;
