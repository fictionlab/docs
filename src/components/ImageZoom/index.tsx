import { useRef, ComponentProps, RefCallback, JSX, CSSProperties } from 'react';
import mediumZoom, { Zoom } from 'medium-zoom';
import styles from './styles.module.css';

/** An image with an optional caption and zoom. Standard image props are also available. */
export interface ImageZoomProps extends ComponentProps<'img'> {
  /**
   * Set to `eager` only if the image is visible as soon as the page opens.
   * Otherwise, leave blank.
   * @default 'lazy'
   */
  loading?: ComponentProps<'img'>['loading'];
  /** Enter the original image width in pixels (e.g. `1920`). */
  width: NonNullable<ComponentProps<'img'>['width']>;
  /** Enter the original image height in pixels (e.g. `1080`). */
  height: NonNullable<ComponentProps<'img'>['height']>;
  /** Text shown below the image. Leave blank if no caption is needed. */
  caption?: string;
  /** Leave blank to allow zoom. Set to `false` to turn it off. */
  allowZoom?: boolean;
  /** Usually leave blank. Advanced: custom CSS styles for the image frame. */
  figStyle?: CSSProperties;
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
