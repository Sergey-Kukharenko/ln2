type CategoryName = 'flowers' | 'trending' | 'recipient' | 'occasions' | 'roses' | 'gifts' | 'sales';

interface SubCategory {
  title?: string;
  prefix?: string;
  slug: string;
  is_best?: boolean;
  icon?: Nullable<string>;
}

interface MainCategory {
  title: string;
  list: SubCategory[];
}

type Category = MainCategory[] | SubCategory[] | SubCategory;

export type CategoriesResponse = Record<CategoryName, Category>;
