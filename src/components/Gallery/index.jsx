import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import Image from './Image';

const Gallery = ({ images }) => {
  const mainImage = images.length ? images[0] : null;
  const otherImages = images.length > 0 ? images.slice(1, 5) : null;
  const showMoreLabel = images.length > 5 ? `+ ${images.length - 5}` : null;

  if (!mainImage && !otherImages) {
    return null;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image src={mainImage.url} alt={mainImage.alt} />
      </div>

      {otherImages &&
        <div className={styles.otherImages}>
          {otherImages.map((image, index) => (
            <Image
              key={image.url}
              src={image.url}
              alt={image.alt}
              label={index === 3 ? showMoreLabel : null}
            />
          ))}
        </div>
      }
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  })),
};

Gallery.defaultProps = {
  images: [],
};

export default Gallery;
