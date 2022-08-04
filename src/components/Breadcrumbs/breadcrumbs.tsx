import React, { Fragment } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import {
  GetBreadcrumbsDocument,
  GetBreadcrumbsQuery,
  GetBreadcrumbsQueryVariables,
  useGetBreadcrumbsQuery,
} from '@magentopwa/__generated__/apolloComponents';

interface Link {
  name: string;
  link: string;
}

type LinkProps = {
  links?: Link[];
  category_id?: string;
};
const DELIMITER = '/';

export const Breadcrumbs = (props: LinkProps) => {
  const { links, category_id } = props;

  const { data, error, loading } = useQuery<GetBreadcrumbsQuery, GetBreadcrumbsQueryVariables>(GetBreadcrumbsDocument, {
    variables: { category_id },
  });

  if (loading) {
    return <></>;
  }
  if (error) {
    return (
      <>
        <Link className="mx-2 px-2" href="/">
          <span>Home</span>
        </Link>
      </>
    );
  }

  return (
    <div className="bread-crumbs">
      <Link className="mx-2 px-2" href="/">
        <span>Home</span>
      </Link>
      <span className="divider mx-2 my-2">{DELIMITER}</span>
      {data &&
        data.categories.items.map((item) => {
          return (
            <Fragment key={item.uid}>
              {item.breadcrumbs &&
                item.breadcrumbs.map((breadcrumb) => {
                  return (
                    <Fragment key={breadcrumb.category_uid}>
                      <Link className="mx-2 px-2" href={breadcrumb.category_url_path}>
                        <span>{breadcrumb.category_name}</span>
                      </Link>
                      <span className="divider mx-2 my-2">{DELIMITER}</span>
                    </Fragment>
                  );
                })}
              <Link className="mx-2 px-2" href={item.url_path}>
                <span>{item.name}</span>
              </Link>
              <span className="divider mx-2 my-2">{DELIMITER}</span>
            </Fragment>
          );
        })}
      {links &&
        links.map((item) => {
          return (
            <Fragment key={item.name}>
              <Link className="mx-2 px-2" href={item.link}>
                <span>{item.name}</span>
              </Link>
              &nbsp; &rsaquo; &nbsp;
            </Fragment>
          );
        })}
    </div>
  );
};
