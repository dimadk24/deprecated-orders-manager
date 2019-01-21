const template = require('./product.hbs');

const createProductTypeUrl = 'test cool link';

describe('product template', function () {
  it('should contain link to add new product type if types are empty', function () {
    const result = template({types: [], createProductTypeLink: createProductTypeUrl});
    expect(result).toContain(createProductTypeUrl);
  });

  it('should not contain link to add new product type if types aren\'t empty', function () {
    const result = template({
      types: [{id: 1, name: 'test'}],
      createProductTypeLink: createProductTypeUrl
    });
    expect(result).not.toContain(createProductTypeUrl);
  });

  const types = [
    {
      id: 1,
      name: 'first type'
    },
    {
      id: 2,
      name: 'second type'
    }
  ];

  it('should contain corresponding number of choose type buttons', function () {
    const context = {
      types
    };
    const result = template(context);
    const times = result.split('class="button product__choose-type-button"');
    expect(times).toHaveLength(3);
  });

  it('should insert types in #each block', function () {
    const context = {types};
    const result = template(context);
    expect(result).toContain('class="button product__choose-type-button" value="1"');
    expect(result).toContain('first type');
    expect(result).toContain('class="button product__choose-type-button" value="2"');
    expect(result).toContain('second type');
  });
});
