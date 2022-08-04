
import {
    ActionMap,
    FilterOptionType,
    InitialStateType,
    FilterTypes,
} from './FilterTypes';

// ProductPaylaod
type FilterOptionPayLoad = {
    [FilterTypes.ADD_FILTER_ID] : {
      filterType: string;
      filterIds: string[];
    };
    [FilterTypes.CLEAR_FILTERS] : {
      filterType: string;
      filterIds: string[];
    };
  }


  export type FilterOptionActions = ActionMap<FilterOptionPayLoad>[keyof ActionMap<FilterOptionPayLoad>]; 

  export const filterReducer = (state, action:  FilterOptionActions | SortingOptionActions) => { 
    switch (action.type) {
      case FilterTypes.ADD_FILTER_ID:
        return state.find((filter) => filter.filterType === action.payload.filterType)
        ? state.map((filter) =>
        filter.filterType === action.payload.filterType
                ? ( filter.filterIds.includes(action.payload.filterIds[0]) ? (
                  { ...filter,
                    filterIds: filter.filterIds.filter(f => f !== action.payload.filterIds[0])
                }
                ) 
                 :  {
                    ...filter,
                    filterIds: [...filter.filterIds, action.payload.filterIds[0]]
                })
                : filter
            )
        : [...state, { ...action.payload }];
    case FilterTypes.CLEAR_FILTERS:
        return [];
    default:
        return state;
    }
  }


// ProductPaylaod
type SortingOptionPayLoad = {
    [FilterTypes.ADD_SORTING_OPTION]: {
       sorting: string;
    };
  }
  export type SortingOptionActions = ActionMap<SortingOptionPayLoad>[keyof ActionMap<SortingOptionPayLoad>]; 

  export const sortingReducer = (state: string, action:  FilterOptionActions | SortingOptionActions) => { 
    switch (action.type) {
        case FilterTypes.ADD_SORTING_OPTION:
          return action.payload.sorting
        default:
        return state;
    }
  }
