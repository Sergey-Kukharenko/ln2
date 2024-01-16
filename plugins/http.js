import { TOKEN_REFRESH_ENDPOINT } from '~/constants';

export default ({ store, app: { $axios }, $cookies }, inject) => {
  let isRetryUpdateTokenProcess = false;

  function httpHandler(method, ...args) {
    const token = $cookies.get(process.env.sessionTokenField);
    const [url] = args.flat();

    if (process.client && !token && url !== TOKEN_REFRESH_ENDPOINT) {
      if (!isRetryUpdateTokenProcess) {
        return new Promise((resolve) => {
          isRetryUpdateTokenProcess = true;
          store
            .dispatch('auth/fetchToken')
            .then(() => {
              resolve($axios[method](...args.flat()));
            })
            .catch((err) => {
              console.error(err); // нужно обработать этот кейс, можно например показать попап с просьбой перезагрузить страницу ну или самим перезагрузить ее. В общем надо подумать.
            })
            .finally(() => {
              isRetryUpdateTokenProcess = false;
            });
        });
      } else {
        return new Promise((resolve) => {
          let timeout;
          const checkUpdateFinish = () => {
            if (timeout) {
              clearTimeout(timeout);
            }

            if (!isRetryUpdateTokenProcess) {
              resolve($axios[method](...args.flat()));
            } else {
              timeout = setTimeout(checkUpdateFinish);
            }
          };

          checkUpdateFinish();
        });
      }
    } else {
      return $axios[method](...args.flat());
    }
  }

  inject('http', {
    $get: (...args) => httpHandler('$get', args),
    $delete: (...args) => httpHandler('$delete', args),
    $head: (...args) => httpHandler('$head', args),
    $options: (...args) => httpHandler('$options', args),
    $post: (...args) => httpHandler('$post', args),
    $put: (...args) => httpHandler('$put', args),
    $patch: (...args) => httpHandler('$patch', args)
  });
};
