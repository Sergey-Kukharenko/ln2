import { NO_SCROLL_CLASS_NAME } from '~/constants';

const useClassName = (obj, clsNm) => {
  const clsNmObj = Object.entries(obj).reduce(
    (prev, [key, value]) => (key[value] !== 'undefined' ? { ...prev, [`${clsNm}--${value}`]: value } : {}),
    {}
  );

  return [clsNm, clsNmObj];
};

const useClassNameProp = (value, clsNm) => {
  return value ? [`${clsNm} ${clsNm}--${value}`] : clsNm;
};

const useToggleClassName = (value, clsNm, tgClsNm) => {
  return [value ? `${clsNm} ${clsNm}--${tgClsNm}` : clsNm];
};

const useSetClassName = (value, clsNm) => {
  return [value && `${clsNm}`];
};

const useSortArrayBy = (array, value, prop) => {
  return array.sort((a, b) => (value ? a[prop] - b[prop] : b[prop] - a[prop]));
};

const useBreadCrumbs = (route) => {
  const unusedRoutes = ['index', 'category-slug', 'filter-slug', 'about', 'delivery', 'gifts'];
  const ArrayOfReplacementPaths = ['product'];
  const replacePath = (array, path, newPath) => (array.includes(path) ? newPath : path);

  if (unusedRoutes.includes(route.name)) {
    return;
  }

  return route.path.split('/').reduce((array, path, idx) => {
    idx === 0
      ? array.push({
          path: '/',
          text: 'main'
        })
      : array.push({
          path: array[idx - 1].path + (idx > 1 ? '/' : '') + replacePath(ArrayOfReplacementPaths, path, ''),
          text: path
        });

    return array;
  }, []);
};

const useStringSwappedValues = (str, mapKeys) => {
  let strResult = str;
  for (const key in mapKeys) {
    strResult = strResult.replace(key, mapKeys[key]);
  }

  return strResult;
};

const useObjectNotEmpty = (obj) => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj) && Object.keys(obj).length > 0;
};

const useArrayNotEmpty = (arr) => {
  return arr && arr.length;
};

const useStringBasedOnDevice = (device, str) => (device ? str : '');

const useWithExcludedKeys = (originalObject, array) => {
  const excludeKeys = new Set(array);
  const filteredPairs = Object.entries(originalObject).filter(([key]) => !excludeKeys.has(key));
  return Object.fromEntries(filteredPairs);
};

const useConcatArrayValues = (obj, array) => array.map((k) => obj[k]).join('|');

const useCollectionUniqueByKey = (arr, props = []) =>
  arr.reduce((acc, item) => {
    acc[useConcatArrayValues(item, props)] = acc[useConcatArrayValues(item, props)]
      ? acc[useConcatArrayValues(item, props)] + 1
      : (acc[useConcatArrayValues(item, props)] = 1);

    return acc;
  }, {});

const useObjectUniqueByKey = (arr, key) =>
  arr.reduce((acc, item, index) => {
    acc[item[key]] = acc[item[key]] ? acc[item[key]] + 1 : 1;
    return acc;
  }, {});

const useArrayUniqueByKey = (arr, props = []) => [
  ...new Map(arr.map((entry) => [useConcatArrayValues(entry, props), entry])).values()
];

const useValueFromObject = (o, path) => path.split('.').reduce((o = {}, key) => o[key], o);

const useFixedSumByKey = (arr, pathToValue, fixedNumber = 0) =>
  arr.length && arr.reduce((acc, val) => acc + Number(useValueFromObject(val, pathToValue)), 0).toFixed(fixedNumber);

const useSizedImage = ({ name, width = 60, height = 60 }) => {
  const size = width && height ? `${height}x${width}` : 'original';
  return `${process.env.fileUrl}/${size}/${name}`;
};

const usePaginationTotalPages = ({ total, limit }) => Math.ceil(total / limit);

const useGeneratedNumsArray = (length) => Array.from({ length }, (_, i) => i + 1);

const useDebounce = (fn, wait) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
};

const setState = (state, payload) => {
  Object.keys(payload).forEach((key) => {
    if (key in state) {
      state[key] = payload[key];
    }
  });
};

const joinArgs = (...args) => args.join('|');

const useScrollLockToggle = (value) =>
  value
    ? document.body.classList.add(NO_SCROLL_CLASS_NAME)
    : document.body.classList.contains(NO_SCROLL_CLASS_NAME)
    ? document.body.classList.remove(NO_SCROLL_CLASS_NAME)
    : document.body.classList.remove(NO_SCROLL_CLASS_NAME);

const useGetPositionSizeText = (title = '', isBouquet = false) => {
  const sizePreffix = isBouquet ? 'Bouquet size: ' : '';
  return `${sizePreffix}${title}`;
};

export {
  useClassName,
  useClassNameProp,
  useToggleClassName,
  useSetClassName,
  useSortArrayBy,
  useBreadCrumbs,
  useStringSwappedValues,
  useObjectNotEmpty,
  useArrayNotEmpty,
  useStringBasedOnDevice,
  useWithExcludedKeys,
  useCollectionUniqueByKey,
  useObjectUniqueByKey,
  useArrayUniqueByKey,
  useValueFromObject,
  useFixedSumByKey,
  useSizedImage,
  usePaginationTotalPages,
  useGeneratedNumsArray,
  useDebounce,
  setState,
  useScrollLockToggle,
  joinArgs,
  useGetPositionSizeText
};
