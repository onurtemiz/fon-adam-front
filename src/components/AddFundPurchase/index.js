import React, { useEffect } from 'react';
import { useState } from 'react';
import CapitalPicker from './CapitalPicker';
import AddNewFundStyles from './styles';
import { FundDatePicker, FundAutoComplete } from '@components';
import { X } from '@styled-icons/boxicons-regular';

const AddFundPurchase = ({ setPurchases, purchases, purchase, funds }) => {
  const [fund, setFund] = useState();
  const [fundPrice, setFundPrice] = useState();

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

      <FundDatePicker
        date={purchase?.date}
        setDate={(date) =>
          setPurchases(
            purchases.map((p) =>
              p._id === purchase._id ? { ...purchase, date } : p
            )
          )
        }
        fund={fund}
        setFundPrice={setFundPrice}
      />

      <CapitalPicker
        capital={purchase?.pieces}
        setCapital={(pieces) =>
          setPurchases(
            purchases.map((p) =>
              p._id === purchase._id ? { ...purchase, pieces } : p
            )
          )
        }
        fund={fund}
        fundPrice={fundPrice}
        isDisabled={!purchase?.date || !fund}
      />

      <X
        className="action-icon"
        onClick={() =>
          setPurchases(purchases.filter((p) => p._id !== purchase._id))
        }
      />
    </AddNewFundStyles>
  );
};

export default AddFundPurchase;
