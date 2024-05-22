import { removeVietnameseTones } from '@utils';

export const generateVietQrLink = (amount, description, accountName = 'Decor Day') => {
  return `https://img.vietqr.io/image/MB-606606868-compact2.png?amount=${amount}&addInfo=${encodeURI(description)}&accountName=${encodeURI(removeVietnameseTones(accountName))}`;
};
