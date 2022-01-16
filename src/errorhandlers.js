/** @format */

const notFoundHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ message: err.message });
  } else {
    next(err);
  }
};
const badRequesthHandler = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(404).send({ message: err.message });
  } else {
    next(err);
  }
};
export { notFoundHandler, badRequesthHandler };
