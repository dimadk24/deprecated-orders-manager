function nameCreatorFactory() {
  const stack = [];
  return ({id, value}) => {
    const foundItem = stack.find(obj => obj.id === id);
    if (foundItem) foundItem.value = value;
    else stack.push({id, value});
    return stringifyStack(stack);
  };
}

const stringifyStack = (arr) => {
  let string = '';
  arr.forEach(obj => string += `${obj.value} `);
  return string.slice(0, -1);
};

window.nameCreatorFactory = nameCreatorFactory;
