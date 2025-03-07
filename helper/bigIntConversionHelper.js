const convertBigIntToString = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (typeof obj[key] === 'bigint') {
        newObj[key] = obj[key].toString();
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };


module.exports = {convertBigIntToString}