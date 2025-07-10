// src/services/extension/loadingService.js
let setLoadingFn = null;

export const registerLoadingSetter = (fn) => {
  setLoadingFn = fn;
};

export const startLoading = () => {
  if (typeof setLoadingFn === 'function') {
    setLoadingFn(true);
  }
};

export const stopLoading = () => {
  if (typeof setLoadingFn === 'function') {
    setLoadingFn(false);
  }
};