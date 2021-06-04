import { DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const FundDatePicker = ({ setDate, date, fund, setFundPrice }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const dates = fund.history.map((d) => d.date);
        setOptions(dates);
      } catch (error) {}
    };

    const updateFundPrice = () => {
      if (date) {
        handleDate(moment(date));
      }
    };

    fetchOptions();
    updateFundPrice();
  }, [fund]);

  function disabledDate(current) {
    return (
      current &&
      !options.includes(new Date(moment(current).startOf('day')).toISOString())
    );
  }

  const handleDate = (date) => {
    if (!date) return setDate();

    const formatedDate = new Date(date.startOf('day')).toISOString();
    setDate(formatedDate);
    const hist = fund.history.find((d) =>
      moment(d.date).isSame(moment(formatedDate), 'day')
    );
    setFundPrice(hist.price);
  };

  return (
    <DatePicker
      disabledDate={disabledDate}
      showNow={false}
      onChange={(date) => handleDate(date)}
      placeholder="Tarih seçin..."
      size="large"
      format="DD/MM/YYYY"
    />
  );
};

export default FundDatePicker;
