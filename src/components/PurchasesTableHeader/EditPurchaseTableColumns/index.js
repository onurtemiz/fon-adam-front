import React, { useEffect, useRef, useState } from 'react';
import EditPurchaseTableColumnsStyles, {
  StyledButton,
  StyledSelect,
} from './styles';
import { EditAlt } from '@styled-icons/boxicons-regular';
import { usePortfolio } from 'components/containers/PortfolioDetail/PortfolioContext';
const EditPurchaseTableColumns = () => {
  const { setTableColumns, tableColumns } = usePortfolio();

  const [open, setOpen] = useState(false);
  const input = useRef();

  useEffect(() => {
    if (open && input.current) {
      input.current.focus();
    }
  }, [open]);

  return (
    <EditPurchaseTableColumnsStyles>
      <StyledButton
        onClick={() => setOpen(!open)}
        open={open}
        id="column-button"
      >
        <EditAlt className="button-icon" /> Sütünları Düzenle •{' '}
        {tableColumns.filter((col) => col.active).length}
      </StyledButton>

      <StyledSelect
        mode="multiple"
        bordered={false}
        tagRender={() => {}}
        style={{ width: '100%', maxWidth: '240px' }}
        options={tableColumns.map(({ active, ...p }) => p)}
        open={open}
        value={tableColumns.filter((p) => p.active).map((p) => p.value)}
        onSelect={(value) =>
          setTableColumns(
            tableColumns.map((col) =>
              col.value === value ? { ...col, active: true } : col
            )
          )
        }
        onDeselect={(value) =>
          setTableColumns(
            tableColumns.map((col) =>
              col.value === value ? { ...col, active: false } : col
            )
          )
        }
        onBlur={(e) => {
          if (e?.relatedTarget?.id !== 'column-button') {
            setOpen(false);
          }
        }}
        onInputKeyDown={(e) => e.preventDefault()}
        ref={input}
      />
    </EditPurchaseTableColumnsStyles>
  );
};

export default EditPurchaseTableColumns;
