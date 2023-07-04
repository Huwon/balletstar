import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtEncode from 'jwt-encode';
import messaging from '@react-native-firebase/messaging';
const baseURL = 'https://www.jtballetstar.com/api';
const LOGON = false;

export const fbToken = async () => {
  const authStatus = await messaging().requestPermission();
  const token = await messaging().getToken();
  return token;
};

const formFormatter = (data, isIndex = false) => {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    if (Array.isArray(data[key])) {
      let index = isIndex ? 0 : 1;
      for (const item of data[key]) {
        if (isIndex) {
          formData.append(`${key}[${index}]`, item);
        } else {
          formData.append(`${key}${index}`, item);
        }
        index++;
      }
    } else {
      formData.append(key, data[key]);
      // console.log(key, data[key]);
    }
  }
  return formData;
};

export const TESTAPI = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  timeoutErrorMessage: '시간초과',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const API = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  timeoutErrorMessage: '시간초과',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  transformRequest: (data) => {

    //jwt_data: jwtEncode(data, SECRETKEY),

    if (LOGON) console.log('formData :::', data);
    const result = formFormatter(
      data
      // ? Object.assign(
      //     // 데이터가 있는경우
      //     {
      //       data

      //       // jwt_data: jwtEncode(data, SECRETKEY),
      //     },
      //     {
      //       secretKey: SECRETKEY,
      //     }
      //   )
      // : {
      //     // 데이터가 없는경우
      //     secretKey: SECRETKEY,
      //   },
      , true
    );
    console.log(result);

    if (LOGON) console.log('SendData ::: ', result);

    return result;
  },

  transformResponse: (data) => {
    const resData = JSON.parse(data);
    return resData;

    // if (LOGON) console.log('ArrivedData ::: ', data);
    // const resData = JSON.parse(data);
    // try {
    //   const DecodingData =
    //     resData.data && resData.result === 'true' ? jwtDecode(resData.data) : resData;
    //   if (LOGON) console.log('API Result :::\n', DecodingData);
    //   return {
    //     ...resData,
    //     data: DecodingData.data ?? '',
    //   };
    // } catch (error) {
    //   if (LOGON) {
    //     console.log('API Error :::', error);
    //     console.log('API ErrorData :::', data);
    //   }
    //   return data;
    // }
  },
});


