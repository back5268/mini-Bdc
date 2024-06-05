import moment from 'moment';

export const removeUndefinedProps = (obj) => {
  for (let prop in obj) {
    if (!(obj[prop] || obj[prop] === '' || obj[prop] === 0)) {
      delete obj[prop];
    }
  }
  return obj;
};

export const refreshObject = (object) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (Array.isArray(object[key])) object[key] = [];
      else if (typeof object[key] === 'object') object[key] = {};
      else object[key] = '';
    }
  }
  return object;
};

export const checkEqualProp = (object1, object2) => {
  const newObject = {};
  for (const key in object1) {
    if (JSON.stringify(object1[key]) !== JSON.stringify(object2[key])) {
      newObject[key] = object1[key];
    }
  }
  return newObject;
};

export const convertFileToUrl = (file) => URL.createObjectURL(file);

export const formatNumber = (amount, round) => {
  if (amount) return new Intl.NumberFormat('en-US').format(round ? Math.round(amount) : amount);
  else return 0
};

export const removeSpecialCharacter = (string) => {
  if (string) {
    string = string.toLowerCase();
    string = string.replace(/["',]/g, '');
    string = string.replace(/[\/]/g, '-');
    const normalizedString = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const replacedString = normalizedString.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const resultString = replacedString.replace(/\s+/g, '-');
    return resultString;
  }
};

export const formatDateString = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  });

  return `${formattedDate} at ${time}`;
};

export const formatMinuteStringV1 = (minute) => {
  minute = minute % 60;
  return `${minute < 10 ? `0${minute}` : minute}:00`;
};

export const formatMinuteStringV2 = (minute) => {
  const hour = Math.floor(minute / 60);
  minute = minute % 60;
  return `${hour ? `${hour} giờ` : ''} ${minute} phút`;
};

export const multiFormatDateString = (timestamp = '') => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date = new Date(timestampNum * 1000);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} ngày trước`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} ngày trước`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} giờ trước`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} phút trước`;
    default:
      return 'vừa xong';
  }
};

export const databseDate = (date, type = 'datetime') => {
  let format = type === 'time' ? 'HH:mm:ss' : type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
  return moment(date).format(format);
};
