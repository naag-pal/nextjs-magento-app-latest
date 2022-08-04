import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import {
  GetProductFiltersByCategoryDocument,
  GetProductFiltersByCategoryQuery,
  GetProductFiltersByCategoryQueryVariables,
} from '@magentopwa/__generated__/apolloComponents';
import { FiltersAppContext, FilterTypes } from '@magentopwa/contexts/filters';

export const CategoryFilters = (props) => {
  const { category_id } = props;
  const { state, dispatch } = useContext(FiltersAppContext);
  const {
    data: filterData,
    error,
    loading,
  } = useQuery<GetProductFiltersByCategoryQuery, GetProductFiltersByCategoryQueryVariables>(
    GetProductFiltersByCategoryDocument,
    {
      variables: { categoryIdFilter: { eq: category_id } },
    }
  );

  const updateFilterOptions = (e) => {
    const checkedValue = e.target.value;
    const values = checkedValue.toString().split('__');
    dispatch({
      type: FilterTypes.ADD_FILTER_ID,
      payload: {
        filterType: values[0],
        filterIds: [values[1]],
      },
    });
  };

  const selectOption = (optionVal) => {
    let selectedOption = false;
    const optionVals = optionVal.toString().split('__');
    state.filters.map((filter) => {
      if (filter.filterType === optionVals[0]) {
        selectedOption = filter.filterIds.includes(optionVals[1]);
        return;
      }
    });
    return selectedOption;
  };

  if (loading) return <></>;
  if (error) return <></>;

  return (
    <div className="filters">
      {filterData &&
        filterData.products.aggregations.map((aggregation) => {
          return (
            <div className="mb-8" key={aggregation.label}>
              <div className="font-semibold mt-2 mb-4"> {aggregation.label} </div>
              {aggregation &&
                aggregation.options.map((option) => {
                  return (
                    <div className="mb-4" key={option.label}>
                      <input
                        type="checkbox"
                        className="cursor-pointer h-[1rem] rounded w-[1rem] disabled_cursor-not-allowed align-middle mx-2"
                        name={`${option.label}-${option.value}`}
                        onChange={updateFilterOptions}
                        checked={selectOption(`${aggregation.attribute_code}__${option.value}`)}
                        value={`${aggregation.attribute_code}__${option.value}`}
                        title={`${option.label}-${option.value}`}
                        data-testid={`${option.label}-${option.value}`}
                      ></input>
                      {option.label}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};
