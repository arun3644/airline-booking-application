// Basic validation helpers (expand as needed)
const isEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

module.exports = { isEmail };
