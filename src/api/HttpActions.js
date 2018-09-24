import * as axios from 'axios';

class HttpActions {
  constructor(baseURL) {
    const config = {
      baseURL,
    };

    this.request = axios.create(config);
  }

  get(url, params, options) {
    const config = { params, ...options };
    return this.request.get(url, config);
  }

  post(url, data, options) {
    return this.request.post(url, data, options);
  }

  patch(url, data, options) {
    return this.request.patch(url, data, options);
  }

  del(url, data, params, options) {
    const config = {
      url, data, params, ...options,
    };
    return this.request.delete(url, config);
  }

  put(url, data, params, options) {
    return this.request.put(url, data, { params, ...options });
  }
}

export default HttpActions;
