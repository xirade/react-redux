export const logger = (state) => {
  return function (next) {
    return function (action) {
      return next(action);
    };
  };
};
