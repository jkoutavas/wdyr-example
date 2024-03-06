import isObject from 'lodash/isObject';

export const flattenParams = (params: object | undefined): object => {
  if (!params) {
    return {};
  }

  return Object.entries(params).reduce((acc, [key, value]) => {
    if (isObject(value)) {
      return {...acc, ...flattenParams(value)};
    }

    return {...acc, [key]: value};
  }, {});
};
