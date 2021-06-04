import { notification } from 'antd';

const errorHandler = (err) => {
  if (err?.code === 'auth/email-already-in-use') {
    notification.error({
      message: 'Hata!',
      description: 'Eposta zaten kayıtlı.',
    });
  } else if (err?.code) {
    notification.error({ message: 'Hata!', description: err.message });
  } else if (err?.response?.data) {
    const description = messageConverter(err.response.data?.msg);
    notification.error({ message: 'Hata!', description });
  } else {
    notification.error({ message: 'Hata!', description: JSON.stringify(err) });
  }
};

export default errorHandler;

const messageConverter = (msg) => {
  if (msg === 'UNAUTHORIZED') {
    return 'İzniniz bulunmuyor. Belki sayfayı yenilemeniz çözebilir.';
  } else if (!msg) {
    return '';
  }
};
