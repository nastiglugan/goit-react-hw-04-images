import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItems, ImageGalleryImg } from './ImageGalleryItem.styled';
import { LargeImgModal } from '../Modal/Modal';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);
  const [imgforModal, setImgforModal] = useState('');

  const { tags, img, imgLarge } = image;

  const onShowLargeImage = img => {
    setShowModal(prevState => !prevState);
    setImgforModal(img);
  };
  return (
    <div>
      <ImageGalleryItems onClick={() => onShowLargeImage(imgLarge)}>
        <ImageGalleryImg src={img} alt={tags} width="310" height="230" />
      </ImageGalleryItems>
      {showModal && (
        <LargeImgModal
          largeImg={imgforModal}
          onClose={onShowLargeImage}
          tags={tags}
        />
      )}
    </div>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
