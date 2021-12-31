import axios from 'axios'

axios.defaults.xsrfCookieName = 'CSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'X-CSRF-Token'
axios.defaults.withCredentials = true

export default axios
// const client = axios.create();

// client.interceptors.request.use(
//   (config) => {
//     const token = document.querySelector<HTMLMetaElement>(
//       'meta[name="csrf-token"]'
//     )?.content;

//     config.headers["X-CSRF-Token"] = token;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default client;