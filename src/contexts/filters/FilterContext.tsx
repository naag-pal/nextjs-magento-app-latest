import { useMutation } from '@apollo/client';
import React, { createContext, useReducer, Dispatch, ReactNode, useEffect, useState } from 'react';
import { filterReducer, sortingReducer, FilterOptionActions, SortingOptionActions } from './FilterReducers';
import { FilterOptionType, InitialStateType, FilterTypes } from './FilterTypes';

const initialState = {
  filters: [
    {
      filterType: '',
      filterIds: [],
    },
  ],
  sorting: '',
};

const FiltersAppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<FilterOptionActions | SortingOptionActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ filters, sorting }: InitialStateType, action: FilterOptionActions | SortingOptionActions) => ({
  filters: filterReducer(filters, action),
  sorting: sortingReducer(sorting, action),
});

type Props = {
  children: ReactNode;
};

const FiltersAppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [initialized, setInitialized] = useState(false);

  return <FiltersAppContext.Provider value={{ state, dispatch }}>{children}</FiltersAppContext.Provider>;
};
export { FiltersAppProvider, FiltersAppContext };
