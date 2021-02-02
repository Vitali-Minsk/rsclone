export default class Data {
  constructor() {
    this.url = 'https://peaceful-harbor-25159.herokuapp.com/users/';
  }

  // const url = 'https://peaceful-harbor-25159.herokuapp.com/users/';
  // const response = await fetch(url);
  // const users = await response.json(); // читаем ответ в формате JSON
  // alert(users);
  async getData() {
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
      // const d = new StringDecoder('utf8');
        console.log('data', data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  // setData('POST', requestURL, body)
  // .then(data => console.log(data))
  // .catch(err => console.log(err))
  sendRequest(method, body = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, this.url);

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
}
