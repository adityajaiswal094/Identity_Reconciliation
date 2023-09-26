export const addElements = (arr, phnOrEmail) => {
  if (arr.indexOf(phnOrEmail) === -1) {
    arr.push(phnOrEmail);
  }
};
