const tryToParse = (item) => {
  if (typeof item === "string" && item !== "") {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.log(error);
    }
  } else {
    return item;
  }
};

export { tryToParse };
