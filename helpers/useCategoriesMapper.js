const ICON_SIZE = 16;
const CATEGORY_ICON_UNIQ_SIZES_MAP = new Map([
  ['flowers', 20],
  ['sales', 14],
  ['roses', [10, 16]]
]);

const useCategoriesMapper = (categories) => {
  return categories.map((category) => {
    const iconSize = CATEGORY_ICON_UNIQ_SIZES_MAP.get(category.title.toLowerCase()) ?? ICON_SIZE;

    return {
      title: category.title,
      icon: category.icon,
      style: {
        width: typeof iconSize === 'number' ? iconSize : iconSize[0],
        height: typeof iconSize === 'number' ? iconSize : iconSize[1]
      },
      hasSubLevel: Boolean(category.list),
      type: category.title.toLowerCase(),
      in_menu: category.in_menu,
      ...(category.list && {
        list: category.list
      }),
      ...(category.prefix && {
        prefix: category.prefix
      }),
      ...(category.slug && {
        slug: category.slug
      })
    };
  });
};

export { useCategoriesMapper };
