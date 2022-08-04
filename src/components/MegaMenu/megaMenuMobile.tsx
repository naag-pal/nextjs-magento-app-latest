import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GetMegaMenuDocument } from '@magentopwa/__generated__/apolloComponents';
import classes from './megaMenu.module.css';

export const MegaMenuMobile = () => {
  const { data, error, loading } = useQuery(GetMegaMenuDocument);

  if (loading) return <></>;
  if (error) return <></>;

  return (
    <>
      <ul className="mt-10 px-2">
        <li className="toggleable">
          <Link href="/" className="relative block px-2 lg:p-6 text-sm lg:text-base font-bold">
            Home
          </Link>
        </li>
        {data.categoryList[0].children.map((child) => {
          return (
            <li className={`${classes.hoverable}`} key={child.url_path}>
              <Link
                href={`/${child.url_path}`}
                className="relative block py-2 px-4 lg:p-6 text-sm lg:text-base font-bold"
              >
                <label
                  htmlFor="toggle-one"
                  className="block cursor-pointer py-2 px-2 lg:p-6 text-sm lg:text-base font-bold"
                >
                  {child.name}
                </label>
              </Link>

              {child.children.length > 0 && (
                <div className={`px-2`}>
                  <div className="container w-full flex flex-wrap justify-between mx-2">
                    <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 border-gray-600 pb-2 pt-2 lg:pt-3">
                      {child.children.map((item) => {
                        return (
                          <li key={child.url_path}>
                            <Link
                              href={`/${item.url_path}`}
                              className="relative block py-2 px-2 lg:p-6 text-sm lg:text-base font-bold hover:bg-blue-800 hover:text-white"
                            >
                              <label
                                htmlFor="toggle-one"
                                className="block cursor-pointer py-2 px-2 lg:p-6 text-sm lg:text-base font-bold"
                              >
                                {item.name}
                              </label>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          );
        })}
        <li className="toggleable">
          <Link href="#responsive-header" className="relative block py-2 px-2 lg:p-6 text-sm lg:text-base font-bold">
            Blog
          </Link>
        </li>
      </ul>
    </>
  );
};
