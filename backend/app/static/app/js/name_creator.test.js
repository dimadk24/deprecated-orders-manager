require('./name_creator');
const nameCreatorFactory = window.nameCreatorFactory;

describe('name creator', function () {
  it('should create name from product type', function () {
    const nameCreator = nameCreatorFactory();
    const name = nameCreator({id: 'parameter', value: 'Pillow'});
    expect(name).toBe('Pillow');
  });

  it('should create name from product type and an option', function () {
    const nameCreator = nameCreatorFactory();
    nameCreator({id: 'parameter', value: 'Pillow'});
    const name = nameCreator({id: 'size', value: '2'});
    expect(name).toBe('Pillow 2');
  });

  it('should create name from product type and 2 options', function () {
    const nameCreator = nameCreatorFactory();
    nameCreator({id: 'parameter', value: 'Pillow'});
    nameCreator({id: 'size', value: '2'});
    const name = nameCreator({id: 'inside', value: 'cotton'});
    expect(name).toBe('Pillow 2 cotton');
  });

  it('should replace option name, if changed', function () {
    const nameCreator = nameCreatorFactory();
    nameCreator({id: 'parameter', value: 'Pillow'});
    const name = nameCreator({id: 'size', value: '2'});
    expect(name).toBe('Pillow 2');
    const nameAfterChange = nameCreator({id: 'size', value: '1'});
    expect(nameAfterChange).toBe('Pillow 1');
  });

  it('should replace option name, if changed, and preserve order', function () {
    const nameCreator = nameCreatorFactory();
    nameCreator({id: 'parameter', value: 'Pillow'});
    nameCreator({id: 'size', value: '2'});
    const name = nameCreator({id: 'inside', value: 'cotton'});
    expect(name).toBe('Pillow 2 cotton');
    const nameAfterChange = nameCreator({id: 'size', value: '1'});
    expect(nameAfterChange).toBe('Pillow 1 cotton');
  });
});
