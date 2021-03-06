const random = () => Math.round(Math.random() * 10);

// For testing
export const utils = {
  random
};

const mockRequest = data => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (utils.random() < 10) {
      resolve(data);
    } else {
      reject(new Error('Something wrong'));
    }
  }, 500);
});

export default mockRequest;
