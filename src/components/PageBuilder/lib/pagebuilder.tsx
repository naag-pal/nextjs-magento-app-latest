import React, { useMemo } from 'react';
import ContentTypeFactory from './factory';
import parseStorageHtml from './parseStorageHtml';

/**
 * Page Builder component for rendering Page Builder master storage format in React
 *
 * @param data
 * @returns {*}
 * @constructor
 */

export default function PageBuilder(props) {
  const { html, classes } = props;
  const htmlData = useMemo(() => parseStorageHtml(html), [html]);

  return htmlData?.children.map((child, i) => {
    return (
      <div key={i}>
        <ContentTypeFactory data={child} />
      </div>
    );
  });
}
