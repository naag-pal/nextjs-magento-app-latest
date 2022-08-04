import React, { Fragment, useContext } from 'react';
import { useQuery } from '@apollo/client';
import {
  GetCategoryAvailableSortMethodsDocument,
  GetCategoryAvailableSortMethodsQuery,
  GetCategoryAvailableSortMethodsQueryVariables,
} from '@magentopwa/__generated__/apolloComponents';
import { FiltersAppContext, FilterTypes } from '@magentopwa/contexts/filters';

const SortingOptions = (props) => {
  const { category_id } = props;
  const { state, dispatch } = useContext(FiltersAppContext);
  const { data: sortData } = useQuery<
    GetCategoryAvailableSortMethodsQuery,
    GetCategoryAvailableSortMethodsQueryVariables
  >(GetCategoryAvailableSortMethodsDocument, {
    variables: { categoryIdFilter: { eq: category_id } },
  });

  const updateSortingOptions = (e) => {
    const selectedSortingOption = e.target.value;
    dispatch({
      type: FilterTypes.ADD_SORTING_OPTION,
      payload: {
        sorting: selectedSortingOption,
      },
    });
  };

  return (
    <div className="filters">
      <div className="font-semibold">
        <select
          data-testid="sortingOption"
          name="sortingOption"
          className="p-1 border-2 border-th-primary-dark rounded-lg bg-th-bg-color-2 text-th-primary-dark"
          onChange={updateSortingOptions}
          defaultValue={state.sorting}
        >
          <option value="">Sort by option</option>;
          {sortData &&
            sortData.products.sort_fields.options.map((sortOption) => {
              return (
                <Fragment key={sortOption.value}>
                  {sortOption && sortOption?.value === 'price' ? (
                    <>
                      <option value={`${sortOption.value}__ASC`}>Sort by {sortOption.label} ASC</option>{' '}
                      <option value={`${sortOption.value}__DESC`}>Sort by {sortOption.label} DESC</option>
                    </>
                  ) : (
                    <option value={`${sortOption.value}__ASC`}>Sort by {sortOption.label}</option>
                  )}
                </Fragment>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default SortingOptions;
