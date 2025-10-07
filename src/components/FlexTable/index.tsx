import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

export default function FlexTable(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, className, ...propsRest } = props;
  return (
    <div className={clsx(styles.flexTable, className)} {...propsRest}>
      {children}
    </div>
  );
}
