const mockRequest = data => new Promise((resolve, reject) => {
  const random = () => Math.round(Math.random() * 10);
  setTimeout(() => {
    if (random() < 10) {
      resolve(data);
    } else {
      reject(new Error('Something wrong'));
    }
  }, 500);
});

export default mockRequest;
