import React, { useContext, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { Button } from '@magentopwa/components/UI';
import Link from 'next/link';
import { CreateCartDocument } from '@magentopwa/__generated__/apolloComponents';
import { useAuth } from '@magentopwa/contexts/auth/AuthContext';
import { ShoppingAppContext, Types } from '@magentopwa/contexts/shopping';

import { MegaMenu, MegaMenuMobile } from '@magentopwa/components/MegaMenu';
import { SearchForm } from '@magentopwa/components/Search';

import styles from './header.module.css';
import { Logo, CartIcon, MyAccountIcon, CloseIcon, AccessibilityIcon } from '@magentopwa/components/Icons';
import CartItem from '../Cart/cartItem';

export const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { state, dispatch } = useContext(ShoppingAppContext);

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showMyAccountDropdown, setShowMyAccountDropdown] = useState(false);
  const [showCartOnDropdown, setShowCartOnDropdown] = useState(false);
  //const [pageRedirect, setPageRedirect] = useState(false);

  // const { data, error, loading } = useQuery(GetCategoriesShortDocument);

  const [createCartMutation] = useMutation(CreateCartDocument, {
    onCompleted: (data) => {
      dispatch({
        type: Types.UPDATE_CART_ID,
        payload: data.cartId,
      });
      router.push({
        pathname: '/',
      });
    },
  });

  const logoutAccount = () => {
    setShowMyAccountDropdown(false);
    logout();
    dispatch({
      type: Types.CLEAR_CART,
      payload: state.cartId,
    });
    createCartMutation();
  };

  const totalQuantity = (object: any) => {
    let total = 0;
    for (const obj of object) {
      total += obj.quantity as number;
    }
    return total;
  };

  //if (loading) return <></>;
  //if (error) return <></>;

  const AccountDropdown = () => {
    return (
      <div className={showMyAccountDropdown ? `` : `hidden`} data-testId="MyAccountDropdown">
        <ul
          className={`${styles.dropdownDisplay} dropdown-menu md:w-1/4 max-h-fit absolute right-2 px-2  bg-th-body-background-secondary text-th-accent-dark text-base z-50 float-left list-none text-left rounded-lg shadow-lg m-0 bg-clip-padding border show`}
        >
          {user && user.email !== '' ? (
            <>
              <li className="mt-2 mb-2">
                <Link href="/account-info" data-testId="MyAccountLink">
                  <span className="mx-2 cursor-pointer">My Account</span>
                </Link>
              </li>
              <li className="mt-2 mb-2 ">
                <Link href="/order-history">
                  <span className="mx-2 cursor-pointer th-accent-dark">Order History</span>
                </Link>
              </li>
              <li className="mt-2 mb-2">
                <Link href="/wishlist">
                  <span className="mx-2 cursor-pointer">My Wishlist</span>
                </Link>
              </li>
              <li className="mt-2 mb-2">
                <Link href="/address-info">
                  <span className="mx-2 cursor-pointer">My Addresses</span>
                </Link>
              </li>
              <li className="border-t-2 pt-4 pb-4">
                <Button variant="text" onClick={logoutAccount}>
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li className="mt-4 mb-4 text-center">
                <div className="mt-4 mb-4 text-center">Sign in or Create Account</div>
                <Link href="/sign-in" className="cursor-pointer">
                  <Button variant="outlined" className="mx-4" onClick={() => setShowMyAccountDropdown(false)}>
                    Sign in
                  </Button>
                </Link>
                <Link href="/create-account" className="cursor-pointer">
                  <Button variant="primary" className="mx-4" onClick={() => setShowMyAccountDropdown(false)}>
                    Create Account
                  </Button>
                </Link>
              </li>
            </>
          )}
          <li className="border-t-2 pt-4 pb-4" style={{ fontSize: 14 }}>
            <span className="cursor-pointer text-center bg-gray-200 text-th-primary-dark m-2 p-2 rounded-lg inline-block">
              <AccessibilityIcon />
            </span>
            <br />
            <span
              data-testId="defaultTheme"
              onClick={() => setThemeColors('default')}
              className="cursor-pointer bg-gray-200 text-th-primary-dark m-2 p-2 rounded-lg inline-block"
            >
              D
            </span>
            <span
              onClick={() => setThemeColors('light')}
              className="cursor-pointer bg-blue-200 text-th-primary-dark  rounded-lg m-2 p-2 inline-block"
            >
              T
            </span>
            <span
              onClick={() => setThemeColors('dark')}
              className="cursor-pointer bg-gray-900 text-white  rounded-lg m-2 p-2 inline-block"
            >
              T
            </span>
            <span onClick={() => setThemeFont('small')} className="cursor-pointer font-thin  m-2 p-2 inline-block">
              A-
            </span>
            <span onClick={() => setThemeFont('base')} className="cursor-pointer font-normal m-2 p-2 inline-block">
              A
            </span>
            <span onClick={() => setThemeFont('large')} className="cursor-pointer font-medium  m-2 p-2 inline-block">
              A+
            </span>
            <span onClick={() => setThemeFont('xlarge')} className="cursor-pointer font-extrabold m-2 p-2 inline-block">
              A++
            </span>
          </li>
        </ul>
      </div>
    );
  };

  const setThemeColors = (theme) => {
    document.querySelector('html').setAttribute('data-theme', theme);
  };

  const setThemeFont = (font) => {
    document.querySelector('html').setAttribute('data-font', font);
  };
  /*
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', 'light');
  }, []);
  */
  console.log('test');
  return (
    <>
      <nav className="relative border-b-2 text-th-accent-dark  boder-th-primary-dark">
        <div className={`${styles.nvaContainer} mx-auto justify-between`}>
          <div className="header-top-mobile md:hidden">
            <div className="bg-teal p-6 h-full grid grid-cols-3 header-top">
              <div className="float-left mx-4 mt-2">
                <div className="block lg:hidden">
                  <button
                    data-testid="MobileMenu"
                    onClick={() => setIsNavExpanded(!isNavExpanded)}
                    className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
                  >
                    <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <title>Menu</title>
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="search-form text-center">
                <div className="items-center sm:text-center px-4 mt-2">
                  <Link href="/" className="text-th-primary-dark" data-testid="LogoLink">
                    <span className="cursor-pointer">
                      <Logo />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="float-right">
                <div className="inline-block mx-2 md:mx-6 mr-2" data-testid="MyAccountMenuContainer">
                  <span className="mx-2">
                    <button
                      data-testid="MyAccountMenu"
                      onClick={() => {
                        setShowMyAccountDropdown(!showMyAccountDropdown);
                      }}
                    >
                      <div className={`${styles.cartIcon} ${styles.headerIcon}  pt-2 pb-2`}>
                        <MyAccountIcon />
                      </div>
                    </button>
                  </span>
                  <AccountDropdown />
                </div>
                <div className="inline-block text-right mx-2">
                  <Link href="/cart">
                    <div className={`${styles.cartIcon} ${styles.headerIcon} pt-2`}>
                      {state.products.length > 0 ? (
                        <span className={styles.cartNumberDisplay}>{totalQuantity(state.products)}</span>
                      ) : (
                        ''
                      )}
                      <CartIcon />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="header-top-desktop hidden md:block">
            <div className="bg-teal h-full flex header-top">
              <div className="float-left logo">
                <div className="flex items-center pt-3 sm:text-center flex-no-shrink text-white mr-6">
                  <Link href="/" className="text-blue-500">
                    <span className="cursor-pointer">
                      <Logo />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="search-form text-center" data-testid="searchForm">
                <SearchForm />
              </div>
              <div className="float-right pt-3">
                <div className="inline-block mx-6 mr-2">
                  <span
                    data-testid="MyAccountMenuDesktop"
                    onMouseEnter={() => setShowMyAccountDropdown(true)}
                    onMouseLeave={() => setShowMyAccountDropdown(false)}
                  >
                    <span className={`${styles.cartIcon} ${styles.headerIcon} inline-block pt-2`}>
                      <MyAccountIcon />
                    </span>
                    <AccountDropdown />
                  </span>
                </div>
                <div className="inline-block mx-6 mr-2">
                  <span
                    data-testid="CartDropdownMenu"
                    onMouseEnter={() => setShowCartOnDropdown(true)}
                    onMouseLeave={() => setShowCartOnDropdown(false)}
                  >
                    <span className={`${styles.cartIcon} ${styles.headerIcon} inline-block pt-2`}>
                      {state.products.length > 0 ? (
                        <span className={styles.cartNumberDisplay}>{totalQuantity(state.products)}</span>
                      ) : (
                        ''
                      )}
                      <CartIcon />
                    </span>
                    {showCartOnDropdown && (
                      <div>
                        <ul className="dropdown-menu w-1/4 max-h-fit absolute right-2 bg-th-body-background-secondary text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg m-0 bg-clip-padding border show">
                          {state.products.length > 0 ? (
                            <li>
                              <div className="overflow-auto h-50" style={{ height: 400 }}>
                                {state.products.map((product: any) => {
                                  return <CartItem product={product} key={product.id} />;
                                })}
                              </div>
                              <div className="text-center mt-6">
                                <Link href="/checkout">
                                  <Button variant="filled" onClick={() => setShowCartOnDropdown(false)}>
                                    Proceed to Checkout
                                  </Button>
                                </Link>
                              </div>
                            </li>
                          ) : (
                            <li>
                              <div className="text-center">
                                <div className="mb-3 mt-3">
                                  Your cart is empty. <br /> Select from your favorite products.
                                </div>

                                <Link href="/foods">
                                  <Button className="inline-block mx-2">Foods</Button>
                                </Link>
                                <Link href="/personal-care">
                                  <Button className="inline-block mx-2">Personal Care</Button>
                                </Link>
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="md:hidden"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <div
              className={`  bg-th-bg-color-2 text-primary-dark ${
                isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
              }`}
            >
              <div className="float-right mb-10">
                <button
                  onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                  }}
                  className="items-center px-3 py-2 close"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="megaMenuMobile mt-30">
                <MegaMenuMobile />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <MegaMenu />
          </div>
          <div className="search-form text-center md:hidden">
            <SearchForm />
          </div>
        </div>
      </nav>
    </>
  );
};
