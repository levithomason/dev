export const rateLimit = <T extends Array<any>, U>(
  msPerCall: number,
  fn: (...args: T) => U
) => {
  let lastCallTime = 0;

  return (...args: T): Promise<U> => {
    if (lastCallTime === 0) {
      lastCallTime = Date.now();
      return Promise.resolve(fn(...args));
    }

    return new Promise((resolve) => {
      const tryCall = () => {
        const msWaited = Date.now() - lastCallTime;

        if (msWaited >= msPerCall) {
          resolve(fn(...args));
        } else {
          window.requestAnimationFrame(tryCall);
        }
      };

      tryCall();
    });
  };
};
