type CategoryName =
  | 'Flowers'
  | 'Letterbox flowers'
  | 'Occasions'
  | 'Roses'
  | 'Gifts'
  | 'Birthday'
  | 'Trending'
  | 'Sales';

type CategoryPart = {
  prefix: string;
  slug: string;
};

type SubCategory = {
  title: string;
  is_best: boolean;
  icon: Nullable<string>;
} & CategoryPart;

type SubCategoryWithKey = Record<string, SubCategory[]>;

type MainCategory = {
  title: CategoryName;
  list?: [SubCategory[]] | SubCategoryWithKey;
  in_menu: boolean;
} & Omit<SubCategory, 'is_best' | 'title'> &
  Partial<CategoryPart>;

export type CategoriesResponse = MainCategory[];
