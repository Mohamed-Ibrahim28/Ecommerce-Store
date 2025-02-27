// shorten title to make title more readable
const shorten = (title) => {
  const splittedTitle = title.split(" ");
  const filteredTitle = splittedTitle.filter((word) => word.length > 2);
  const newTitle = `${filteredTitle[0]} ${filteredTitle[1]}`;
  return newTitle;
};
// check if user added this product to the selected items
const isSelected = (state, id) => {
  const result = !!state.selectedItems.find((item) => item.id === id);
  return result;
};
// checks then number of products that user added
const quantityCount = (state, id) => {
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  } else {
    return state.selectedItems[index].quantity;
  }
};
export { shorten, isSelected, quantityCount };
