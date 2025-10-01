import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

export interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  mobileColumns?: 1 | 2;
}

export default function FlexTableItem(props: DivProps) {
  const { children, mobileColumns, className, ...propsRest } = props;
  let itemClassName;
  if (mobileColumns != 2) itemClassName = styles.flexTableItem1;
  else itemClassName = styles.flexTableItem2;
  return (
    <div className={clsx(className, itemClassName)} {...propsRest}>
      {children}
    </div>
  );
}
