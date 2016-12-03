/**
 * Created by alex on 20.10.16.
 */

export const getProductFilesPath = (product) => {
  return `/uploads/products/art_${product.code}`
};

export const getCategoryLink = (group = '', category = '') => {
  if (group === '' && category === '') {
    return `/products`;
  } else if (group !== '' && category !== '') {
    return `/products/group/${group}/category/${category}`;
  } else {
    if (group) {
      return `/products/group/${group}`;
    } else {
      return `/products/category/${category}`;
    }
  }
};


export const getColorUuid = (product, colorCode) => {
  let colorCUID;
  if (colorCode) {
    for (let color in product.colors) {
      if (product.colors[color].code === colorCode) {
        colorCUID = color;
        break;
      }
    }
  }
  return colorCUID;
};
