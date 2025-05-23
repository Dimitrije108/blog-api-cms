// Interceptors are functions you register on Axios that run before a request is sent or after a response is received.
// Useful for:
// Adding auth tokens automatically to headers
// Logging requests/responses
// Transforming data globally
// Handling global errors (e.g., redirect on 401 Unauthorized)

// axios.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 401) {
//       // handle unauthorized error globally
//     }
//     return Promise.reject(error);
//   }
// );

export default function Home() {
  return (
    <>
      <div>
        This is Home!
      </div>
    </>
  )
};
