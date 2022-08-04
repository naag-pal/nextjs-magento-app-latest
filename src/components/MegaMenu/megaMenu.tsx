import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GetMegaMenuDocument } from '@magentopwa/__generated__/apolloComponents';
import classes from './megaMenu.module.css';

export const MegaMenu = () => {
  const { data, error, loading } = useQuery(GetMegaMenuDocument);

  if (loading) return <></>;
  if (error) return <></>;

  return (
    <>
      <ul className="flex">
        <li className="hover:bg-th-bg-color-1 hover:text-th-primary-dark toggleable">
          <Link href="/" className="relative block py-3 px-2 lg:p-3 text-sm lg:text-base font-bold">
            <label className="block cursor-pointer py-3 px-4 lg:p-3 text-sm lg:text-base font-bold">Home</label>
          </Link>
        </li>
        {data &&
          data.categoryList[0].children.map((child) => {
            return (
              <li
                className={`${classes.hoverable} hover:bg-th-bg-color-1 hover:text-th-primary-dark `}
                key={child.url_path}
              >
                <Link
                  href={`/${child.url_path}`}
                  className="relative block py-3 px-4 lg:p-3 text-sm lg:text-base font-bold hover:bg-th-bg-color-1 hover:text-th-primary-dark "
                >
                  <label
                    htmlFor="toggle-one"
                    className="relative block py-3 px-2 lg:p-3 text-sm lg:text-base font-bold"
                  >
                    {child.name}
                  </label>
                </Link>

                {child.children.length > 0 && (
                  <div className={`${classes.megaMenu} p-6 mb-16 sm:mb-0 shadow-xl bg-th-bg-color-1`}>
                    <div className="container w-full flex flex-wrap justify-between mx-2">
                      <ul className="px-4 w-full sm:w-1/2 lg:w-1/4 bg-th-bg-color-1 border-b sm:border-r lg:border-b-0 pb-6 pt-6 lg:pt-3">
                        {child.children.map((item) => {
                          return (
                            <li key={item.url_path}>
                              <Link
                                href={`/${item.url_path}`}
                                className="relative block py-3 px-4 lg:p-3 text-sm lg:text-base font-bold hover:bg-th-bg-color-1 hover:text-th-primary-dark"
                              >
                                <label
                                  htmlFor="toggle-one"
                                  className="block cursor-pointer py-3 px-4 lg:p-3 text-sm lg:text-base font-bold"
                                >
                                  {item.name}
                                </label>
                              </Link>
                              <ul className="px-4 w-full">
                                {item.children.map((item) => {
                                  return (
                                    <li key={item.url_path}>
                                      <Link
                                        href={`/${item.url_path}`}
                                        className="relative block py-3 px-4 lg:p-3 text-sm lg:text-base font-bold hover:bg-th-bg-color-1 hover:text-th-primary-dark"
                                      >
                                        <label
                                          htmlFor="toggle-one"
                                          className="block cursor-pointer py-3 px-4 lg:p-3 text-sm lg:text-base font-bold"
                                        >
                                          {item.name}
                                        </label>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
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
        {process.env.NEXT_PUBLIC_BLOG_URL && (
          <li className="toggleable hover:bg-th-bg-color-1 hover:text-th-primary-dark">
            <Link
              href={process.env.NEXT_PUBLIC_BLOG_URL}
              className="relative block py-3 px-2 lg:p-3 text-sm lg:text-base font-bold"
            >
              <label className="block cursor-pointer py-3 px-4 lg:p-3 text-sm lg:text-base font-bold">Blog</label>
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};
