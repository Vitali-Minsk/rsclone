const requestURL = 'https://peaceful-harbor-25159.herokuapp.com/users'; // переменная с адресом
export default function sendRequest(method, body = null) { // сама функция описывающая запрос
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, requestURL);

    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject(xhr.response);
    };

    xhr.send(JSON.stringify(body));
  });
}

// запрос на чтение
// sendRequest('GET')
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// const body = {
//   name: 'Vladilen',
//   age: 26,
// };

// запрос на запись

// sendRequest('POST', body)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
