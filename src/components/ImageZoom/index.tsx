import { useRef, ComponentProps, RefCallback, JSX } from 'react';
import mediumZoom, { Zoom } from 'medium-zoom';
import styles from './styles.module.css';

export interface ImageZoomProps extends ComponentProps<'img'> {
  caption?: string;
  allowZoom?: boolean;
  figStyle?: object;
}

export default function ImageZoom(props: ImageZoomProps): JSX.Element {
  const { allowZoom, caption, figStyle, ...propsRest } = props;
  const zoomRef = useRef<Zoom | null>(null);

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom({
        background: 'var(--plugin-image-zoom-background-color)',
      });
    }
    return zoomRef.current;
  }

  const imageRef: RefCallback<HTMLImageElement> = (node) => {
    const zoom = getZoom();
    if (node && allowZoom != false) {
      zoom.attach(node);
    } else {
      zoom.detach();
    }

    if (node && !node.getAttribute('loading'))
      node.setAttribute('loading', 'lazy');
  };

  if (propsRest.width == undefined || propsRest.height == undefined)
    throw new Error('No explicit image size set.\n' + propsRest.src);

  return (
    <figure className={styles.figure} style={figStyle}>
      <img className={styles.image} {...propsRest} ref={imageRef} />
      {caption && (
        <figcaption className={styles.figCaption}>{caption}</figcaption>
      )}
    </figure>
  );
}
