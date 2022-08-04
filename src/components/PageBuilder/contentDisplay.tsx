import styles from './pagebuilder.module.css';
import PageBuilder from './lib';
import React from 'react';

interface ContentProps {
  content: string;
}
const ContentDisplay: React.FC<ContentProps> = (props: ContentProps) => {
  const content = props.content;

  return (
    <div>
      <div className={styles.pageBuilder}>
        {/*
         <span dangerouslySetInnerHTML={{ __html: htmlContent.body.innerHTML }} />
         */}
        {content && <PageBuilder html={content} classes={styles} />}
      </div>
    </div>
  );
};

export default ContentDisplay;
