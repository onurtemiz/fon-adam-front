import React from 'react';
import { ContentWrapper, Description } from './styles';
import { Modal } from 'antd';

const WarningModal = ({
  visible,
  title = 'Emin misin?',
  children,
  okText = 'Evet',
  cancelText = 'Hayır',
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      centered
      zIndex={1000}
      title={title}
      okText={okText}
      okType="primary"
      cancelText={cancelText}
      onOk={onOk}
      onCancel={onCancel}
    >
      <ContentWrapper>{children}</ContentWrapper>
    </Modal>
  );
};

export default WarningModal;
