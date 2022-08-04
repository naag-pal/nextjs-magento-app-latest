import { useQuery } from '@apollo/client';
import { Field, Formik } from 'formik';
import InputField from '@magentopwa/components/Fields/InputField';
import {
  GetAutocompleteResultsDocument,
  GetAutocompleteResultsQuery,
  GetAutocompleteResultsQueryVariables,
} from '../../__generated__/apolloComponents';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { CloseIcon, SearchIcon } from '@magentopwa/components/Icons';
import Image from '@magentopwa/components/UI/Image';
import { useProductCart } from '../ProductCard/useProductCart';
import { ShoppingAppContext } from '@magentopwa/contexts/shopping';
import Button from '../UI/Button';

export const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('null');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { state } = useContext(ShoppingAppContext);
  const useProductCartProps = useProductCart();
  const { showAddToCart, setShowAddToCart, addProductToCart, removeProductFromCart } = useProductCartProps;

  const onFormSubmit = (data) => {
    console.log('data', data);
  };

  const { data, refetch } = useQuery<GetAutocompleteResultsQuery, GetAutocompleteResultsQueryVariables>(
    GetAutocompleteResultsDocument,
    {
      variables: { inputText: searchQuery },
    }
  );

  useEffect(() => {
    if (searchQuery.length > 3) {
      refetch({ inputText: searchQuery });
    }
  }, [searchQuery, refetch]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    if (showSearchDropdown === false) {
      setShowSearchDropdown(true);
    }
  };

  return (
    <div className="search" data-testId="SearchForm">
      <div className="SearchField-Wrapper">
        <div className="SearchField-SearchInnerWrapper">
          <Formik
            onSubmit={async (data) => {
              await onFormSubmit({
                data,
              });
            }}
            initialValues={{
              search: '',
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="justify-center">
                  <div className="mx-3 mb-3 mt-3 search-form-icon">
                    <div className="input-group search-icon mb-4 w-10 float-right">
                      <SearchIcon />
                    </div>
                    <Field
                      name="search"
                      data-testId="searchField"
                      placeholder="Search Products"
                      autoComplete="off"
                      component={InputField}
                      className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 "
                      onKeyUp={(e) => {
                        handleChange(e);
                      }}
                    />
                    {showSearchDropdown && data && data.products && data.products.items.length > 0 && (
                      <div className="search-dropdown">
                        <ul className="dropdown-menu w-full absolute bg-white text-base z-50 float-left pt-2 py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border show">
                          {data &&
                            data.products &&
                            data.products.items.length > 0 &&
                            data.products.items.map((product) => (
                              <li className="p-2" key={product.url_key}>
                                <div
                                  className="grid grid-cols-5 
                                      text-gray-700
                                      hover:bg-blue-100 cursor-pointer p-2"
                                >
                                  <Link
                                    className="
                                        dropdown-item
                                        text-sm
                                        py-2
                                        px-4
                                        font-normal
                                        block
                                        w-full
                                        whitespace-nowrap
                                        bg-transparent
                                      "
                                    href={`/${product.url_key}`}
                                  >
                                    <span onClick={() => setShowSearchDropdown(!showSearchDropdown)}>
                                      <Image src={product.small_image.url} width="40" height="40" alt="" />
                                    </span>
                                  </Link>
                                  <span className="col-span-3">
                                    {product.name}
                                    <div className="font-semibold">
                                      Rs.
                                      {product.price.regularPrice.amount.value}
                                    </div>
                                  </span>
                                  <div className="text-center float-right inline">
                                    {state.products.filter((item) => item['uid'] === product.uid).length > 0 ? (
                                      <>
                                        <div className="flex flex-row w-20 rounded-sm px-2 relative outline">
                                          <button
                                            onClick={() => {
                                              removeProductFromCart(state, product);
                                            }}
                                            data-action="decrement"
                                            className=" text-gray-600 h-full wrounded-l cursor-pointer outline-none"
                                          >
                                            <span className="m-auto text-2xl font-semibold">−</span>
                                          </button>
                                          <button className="text-center px-2font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700  outline-none">
                                            {state.products.filter((item) => item['uid'] === product.uid)[0].quantity}
                                          </button>
                                          <button
                                            onClick={() => {
                                              addProductToCart(state, product);
                                            }}
                                            data-action="increment"
                                            className=" text-gray-600  h-full w-20 rounded-r cursor-pointer"
                                          >
                                            <span className="m-auto text-2xl font-semibold">+</span>
                                          </button>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          variant="primary"
                                          size="sm"
                                          onClick={() => addProductToCart(state, product)}
                                        >
                                          Add To Cart
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </li>
                            ))}
                          <div className="m-1 p-2 z-51" onClick={() => setShowSearchDropdown(!showSearchDropdown)}>
                            <span className="inline-block float-right">
                              <Button variant="secondary">Close</Button>
                            </span>
                          </div>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
