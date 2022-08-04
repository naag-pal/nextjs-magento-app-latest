import { useQuery } from '@apollo/client';
import React from 'react';
import {
  GetCmsBlocksDocument,
  GetCmsBlocksQuery,
  GetCmsBlocksQueryVariables,
} from '@magentopwa/__generated__/apolloComponents';
import ContentDisplay from '../PageBuilder/contentDisplay';

export const HomeQuickSearch = () => {
  const { data: quickSearchBlock } = useQuery<GetCmsBlocksQuery, GetCmsBlocksQueryVariables>(GetCmsBlocksDocument, {
    variables: { identifiers: 'home-quick-search' },
  });
  return (
    <div>
      <div className="grid mt-8 mb-8 bg-blue-grey-100 p-8">
        <div>
          <ContentDisplay content={quickSearchBlock?.cmsBlocks?.items[0].content} />
        </div>
      </div>
    </div>
  );
};
