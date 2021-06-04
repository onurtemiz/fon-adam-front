import React, { useEffect, useState } from 'react';
import moment from 'moment';
import api from '../../api';
import { StyledAutoComplete } from './styles';
import { fundService } from '@services';
import { errorHandler } from '@utils';
const FundAutoComplete = ({ setFund, funds }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(
      funds.map((fund) => {
        return { value: fund.code, label: `${fund.code} - ${fund.title}` };
      })
    );
  }, [funds]);

  const handleSelect = async (code) => {
    try {
      const data = await fundService.show(code);
      setFund({
        ...data,
        history: data.history.map((h) => {
          return {
            ...h,
            date: new Date(moment(h.date).startOf('day')).toISOString(),
          };
        }),
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleSearch = (code) => {
    setOptions(
      funds
        .filter((fund) => fund.code.toUpperCase().includes(code.toUpperCase()))
        .map((fund) => {
          return { value: fund.code, label: `${fund.code} - ${fund.title}` };
        })
    );
  };

  return (
    <StyledAutoComplete
      options={options}
      style={{ width: '100%' }}
      onSelect={handleSelect}
      onSearch={handleSearch}
      placeholder="Fon ara..."
      size="large"
      bordered={false}
    />
  );
};

export default FundAutoComplete;
