import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '@magentopwa/components/UI';
import { useRouter } from 'next/router';
import {
  GetCategoriesDocument,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetCategoryByUrlKeysDocument,
  GetCategoryByUrlKeysQuery,
  GetCategoryByUrlKeysQueryVariables,
  InputMaybe,
  BundleProduct,
} from '@magentopwa/__generated__/apolloComponents';
import ProductCard from '@magentopwa/components/ProductCard/productCard';
import { Breadcrumbs } from '@magentopwa/components/Breadcrumbs';
import { CategoryFilters } from '@magentopwa/components/Filters';
import SortingOptions from './sortingOptions';
import { FiltersAppContext, FilterTypes } from '@magentopwa/contexts/filters';

const ProductsByCategory = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(2);
  const { state, dispatch } = useContext(FiltersAppContext);
  const { url_key } = router.query;
  const urlKeys = url_key && (url_key[url_key.length - 1] as InputMaybe<string> | InputMaybe<string>[]);
  const { data: catdata } = useQuery<GetCategoryByUrlKeysQuery, GetCategoryByUrlKeysQueryVariables>(
    GetCategoryByUrlKeysDocument,
    {
      variables: { urlKeys: urlKeys },
    }
  );

  let CategoryPage = false;
  if (catdata && catdata.categories && catdata.categories.items && catdata.categories?.items.length > 0) {
    CategoryPage = true;
  }

  // Filters options
  const category_id = catdata ? catdata.categories.items[0].uid : '';
  const category_name = catdata ? catdata.categories.items[0].name : '';
  const categoryIdsList = state.filters.filter((f) => f.filterType === 'category_id');
  const categoryIds = categoryIdsList.length > 0 ? categoryIdsList[0].filterIds : [];

  const filterOptions = {};
  filterOptions['category_uid'] = { eq: category_id };
  state.filters.map((f) => {
    if (f.filterType === 'price') {
      const priceValues = f.filterIds.toString().split('_');
      filterOptions[f.filterType] = {
        from: priceValues[0],
        to: priceValues[1],
      };
    } else if (f.filterType !== '') {
      filterOptions[f.filterType] = {
        in: f.filterIds,
      };
      if (f.filterType === 'category_id') {
        delete filterOptions['category_uid'];
      }
    }
  });

  useEffect(() => {
    clearFilters();
  }, []);

  const clearFilters = () => {
    dispatch({
      type: FilterTypes.ADD_SORTING_OPTION,
      payload: {
        sorting: '',
      },
    });
    dispatch({
      type: FilterTypes.CLEAR_FILTERS,
      payload: {
        filterType: '',
        filterIds: [],
      },
    });
  };

  const sortingOptions = {};
  if (state.sorting !== '') {
    const selectedSortingOptionValues = state.sorting.toString().split('__');
    sortingOptions[selectedSortingOptionValues[0]] = selectedSortingOptionValues[1] === 'DESC' ? 'DESC' : 'ASC';
  }

  const { data, loading, fetchMore } = useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GetCategoriesDocument,
    {
      variables: {
        currentPage: 1,
        id: category_id,
        filters: filterOptions,
        pageSize: 3,
        sort: sortingOptions,
      },
    }
  );
  const currentLink = urlKeys.length > 0 ? urlKeys[0] : urlKeys[0];
  const links = [{ name: category_name, link: currentLink }];

  const showLoadMore = data && data.products.total_count >= currentPage * 3;
  const loadMore = () => {
    setCurrentPage(currentPage + 1);
    fetchMore({
      variables: {
        currentPage: currentPage,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        const previousProducts = prevResult.products.items;
        const fetchMoreProducts = fetchMoreResult.products.items;

        fetchMoreResult.products.items = [...previousProducts, ...fetchMoreProducts];
        return {
          ...fetchMoreResult,
        };
      },
    });
  };

  return (
    <div className="content-body">
      <Breadcrumbs category_id={category_id} />
      <div className="float-right inline-block mt-2 mb-2">
        <SortingOptions category_id={category_id} />
      </div>
      <h1 className="h1 mt-6 mb-6 mx-2">
        Shop your favorite <span className="font-semibold">{category_name}</span> products
      </h1>
      <div className="grid md:grid-cols-5 grid-cols-1">
        <div className="filters">
          <CategoryFilters category_id={category_id} />
          <Button onClick={clearFilters} variant="outlined">
            Clearn Filters
          </Button>
        </div>
        <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && <div className="text-center">Loading</div>}
          {data &&
            data.products.items.map((product) => {
              return (
                <div key={product.id}>
                  <ProductCard product={product as BundleProduct} />
                </div>
              );
            })}
          <div className="text-center mt-8 mb-8 md:col-span-2 lg:col-span-3">
            {showLoadMore &&
              (loading ? (
                <Button onClick={loadMore} disabled>
                  Loading
                </Button>
              ) : (
                <Button onClick={loadMore}>Load More</Button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
