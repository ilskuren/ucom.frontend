const debounce = (fn, time) => {
  let timeout;

  return function temp(...args) {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

export default debounce;
