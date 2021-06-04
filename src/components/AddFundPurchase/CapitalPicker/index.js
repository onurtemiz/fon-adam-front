import React, { useEffect, useState } from 'react';
import CapitalPickerStyles, { StyledInput, StyledToggle } from './styles';
import { Tooltip } from 'antd';

const CapitalPicker = ({
  capital,
  setCapital,
  fundPrice,
  isDisabled,
  defaultValue,
}) => {
  const [mode, setMode] = useState('price');
  const [value, setValue] = useState();

  useEffect(() => {
    if (defaultValue) {
      setMode('pieces');
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (mode === 'pieces' && value >= 0) {
      setCapital(value);
    } else if (mode === 'price' && value >= 0) {
      setCapital(Math.round(parseInt(value) / fundPrice));
    }
  }, [value, mode]);

  return (
    <CapitalPickerStyles>
      <Tooltip
        title={
          isDisabled
            ? 'Lütfen önce fon ve tarih seçin.'
            : mode === 'pieces'
            ? `${(fundPrice * capital).toFixed(2)} ₺ - ${capital} adet`
            : `${(fundPrice * capital).toFixed(2)} ₺ - ${Math.round(
                parseInt(value) / fundPrice
              )} adet`
        }
        trigger={isDisabled ? ['hover'] : ['focus']}
      >
        <div>
          <StyledInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`${mode === 'pieces' ? 'Adet' : 'Fiyat'} giriniz...`}
            size="large"
            disabled={isDisabled}
          />
        </div>
      </Tooltip>
      <Tooltip title="Adet / Fiyat">
        <StyledToggle
          onChange={(val) => setMode(val ? 'price' : 'pieces')}
          checked={mode === 'price'}
        />
      </Tooltip>
    </CapitalPickerStyles>
  );
};

export default CapitalPicker;
