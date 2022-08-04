export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        }
  };

  export enum FilterTypes {
    ADD_FILTER_ID = 'ADD_FILTER_ID',
    ADD_SORTING_OPTION = 'ADD_SORTING_OPTION',
    CLEAR_FILTERS = 'CLEAR_FILTERS',
  }
  
  // Product
  export type FilterOptionType = {
        filterType: string;
        filterIds: string[];
  }
   
export type InitialStateType = {
    filters: FilterOptionType[];
    sorting: string;
}