import React from 'react';
import styles from './styles.module.css';

export interface ProductPreviewProps {
  shopUrl: string;
  imageSrc: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  price?: number;
  description?: string;
}

export default function ProductPreview(props: ProductPreviewProps) {
  const required: (keyof ProductPreviewProps)[] = ['shopUrl', 'imageSrc', 'width', 'height', 'alt', 'title'];
  for (const key of required) {
    if (props[key] === undefined || props[key] === null || props[key] === '') {
      throw new Error(`ProductPreview: missing required prop "${key}"`);
    }
  }

  const link = props.shopUrl;
  const title = props.title;
  const description = props.description;
  const price = props.price;
  const image = props.imageSrc;

  return (
    <a href={link} className={styles.ButtonContainer}>
      <div className={styles.ImageContainer}>
        <img
          loading="eager"
          className={styles.Image}
          src={image}
          alt={props.alt}
          width={props.width}
          height={props.height}
        />
      </div>
      <div className={styles.TextContainer}>
        <div className={styles.Title}>{title}</div>
        {price ? <div className={styles.Price}>Price: {price} EUR</div> : ''}
        {description ? (
          <div className={styles.Description}>{description}</div>
        ) : (
          ''
        )}
      </div>
    </a>
  );
}
