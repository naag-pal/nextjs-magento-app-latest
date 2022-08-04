import React from 'react';

import '@magentopwa/utils/matchMedia';
import { render, screen, cleanup, fireEvent, waitFor } from '@magentopwa/utils/testUtils';
import ContactUsPage from '../../pages/contact-us';
import { GetCmsPageDocument } from '@magentopwa/__generated__/apolloComponents';
const mocks = [
  {
    request: {
      query: GetCmsPageDocument,
      variables: { identifier: 'contact-us' },
    },
    result: {
      data: {
        content:
          '<style>#html-body [data-pb-style=ARXFSVD],#html-body [data-pb-style=KTHM9QS]{justify-content:flex-start;display:flex;flex-direction:column;background-position:left top;background-size:cover;background-repeat:no-repeat;background-attachment:scroll}#html-body [data-pb-style=KTHM9QS]{width:16.66666667%;align-self:stretch}#html-body [data-pb-style=TJD5MF4]{margin-top:15px}#html-body [data-pb-style=A0N3JC1]{justify-content:flex-start;display:flex;flex-direction:column;background-position:left top;background-size:cover;background-repeat:no-repeat;background-attachment:scroll;width:83.33333333%;align-self:stretch}#html-body [data-pb-style=SEFY3Q1]{display:inline-block}#html-body [data-pb-style=X21432G]{text-align:center}#html-body [data-pb-style=K0URDCF]{display:inline-block}#html-body [data-pb-style=P8WEHT1]{text-align:center}#html-body [data-pb-style=VQJGPGT]{display:inline-block}#html-body [data-pb-style=R7W4NTN]{text-align:center}#html-body [data-pb-style=EJWBO1T]{display:inline-block}#html-body [data-pb-style=UW4BJLB]{text-align:center}</style><div data-content-type="row" data-appearance="contained" data-element="main"><div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-background-type="image" data-video-loop="true" data-video-play-only-visible="true" data-video-lazy-load="true" data-video-fallback-src="" data-element="inner" data-pb-style="ARXFSVD"><div class="pagebuilder-column-group" style="display: flex;" data-content-type="column-group" data-grid-size="12" data-element="main"><div class="pagebuilder-column" data-content-type="column" data-appearance="full-height" data-background-images="{}" data-element="main" data-pb-style="KTHM9QS"><div data-content-type="text" data-appearance="default" data-element="main" data-pb-style="TJD5MF4"><p><strong>QUICK SEARCH</strong></p></div></div><div class="pagebuilder-column" data-content-type="column" data-appearance="full-height" data-background-images="{}" data-element="main" data-pb-style="A0N3JC1"><div data-content-type="buttons" data-appearance="inline" data-same-width="false" data-element="main"><div data-content-type="button-item" data-appearance="default" data-element="main" data-pb-style="SEFY3Q1"><a class="pagebuilder-button-primary" href="http://demomagento.com/foods" target="" data-link-type="category" data-element="link" data-pb-style="X21432G"><span data-element="link_text">Food</span></a></div><div data-content-type="button-item" data-appearance="default" data-element="main" data-pb-style="K0URDCF"><a class="pagebuilder-button-primary" href="http://demomagento.com/foods/snacks" target="" data-link-type="category" data-element="link" data-pb-style="P8WEHT1"><span data-element="link_text">Snacks</span></a></div><div data-content-type="button-item" data-appearance="default" data-element="main" data-pb-style="VQJGPGT"><a class="pagebuilder-button-primary" href="http://demomagento.com/foods/beverages" target="" data-link-type="category" data-element="link" data-pb-style="R7W4NTN"><span data-element="link_text">Beverages</span></a></div><div data-content-type="button-item" data-appearance="default" data-element="main" data-pb-style="EJWBO1T"><a class="pagebuilder-button-primary" href="http://demomagento.com/foods/staples" target="" data-link-type="category" data-element="link" data-pb-style="UW4BJLB"><span data-element="link_text">Staples</span></a></div></div></div></div></div></div>',
        content_heading: '',
        meta_description: '',
        meta_keywords: '',
        meta_title: '',
        page_layout: 'cms-full-width',
        title: 'Contact Us',
        url_key: 'contact-us',
        __typename: 'CmsPage',
      },
    },
  },
];

describe('Contact Us page', () => {
  it('should render without errors', async () => {
    render(<ContactUsPage />, { mocks });
    expect(screen.getByTestId('ContactUsPage')).toBeInTheDocument();

    // tools header
    //expect(screen.getByRole('heading', { name: 'Tools' })).toBeInTheDocument();
  });
});
