// src/services/extension/loadingService.js
let _onStart = () => {};
let _onStop = () => {};

export const startLoading = () => {
  _onStart();
};

export const stopLoading = () => {
  _onStop();
};

/**
 * AuthContext (veya App kökünde) burayı register ederek
 * gerçek setLoading callback’lerini verecek:
 */
export const registerLoadingCallbacks = (onStart, onStop) => {
  _onStart = onStart;
  _onStop = onStop;
};
