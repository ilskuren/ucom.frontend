import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import styles from './styles.css';
import Image from './Image';
import Popup from './Popup';

const Gallery = ({ images, userId, date }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const mainImage = images.length ? images[0] : null;
  const otherImages = images.length > 0 ? images.slice(1, 5) : null;
  const showMoreLabel = images.length > 5 ? `+ ${images.length - 5}` : null;

  if (!mainImage && !otherImages) {
    return null;
  }

  return (
    <Fragment>
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <Image
            onClick={() => setPopupVisible(true)}
            src={mainImage.url}
            alt={mainImage.alt}
          />
        </div>

        {otherImages &&
          <div className={styles.otherImages}>
            {otherImages.map((image, index) => (
              <Image
                key={image.url}
                src={image.url}
                alt={image.alt}
                label={index === 3 ? showMoreLabel : null}
                onClick={() => setPopupVisible(true)}
              />
            ))}
          </div>
        }
      </div>

      {popupVisible &&
        <Popup
          date={date}
          userId={userId}
          images={images}
          onClickClose={() => setPopupVisible(false)}
        />
      }
    </Fragment>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  })),
  userId: PropTypes.number,
  date: PropTypes.string,
};

Gallery.defaultProps = {
  images: [],
  userId: null,
  date: null,
};

export default Gallery;
