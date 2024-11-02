import ImageGalleryItem from '../ImageGalleryItem';
import { createPortal } from 'react-dom';
import Modal from '../Modal';
import { Component } from 'react';
class ImageGallery extends Component {
  state = {
    isOpenModal: false,
    largeImageUrl: '',
  };
  onImageClick = largeImageUrl => {
    this.setState({ largeImageUrl, isOpenModal: true });
  };
  onModalClick = e => {
    this.setState(({ isOpenModal }) => ({
      isOpenModal: !isOpenModal,
    }));
  };
  onModalKeyDown = e => {
    if (e.code === 'Escape') {
      this.setState({ isOpenModal: false });
    }
  };

  render() {
    const { images } = this.props;
    const { largeImageUrl, isOpenModal } = this.state;
    return (
      <ul className="ImageGallery">
        {images.map(image => (
          <ImageGalleryItem
            image={image}
            key={image.id}
            onImageClick={this.onImageClick}
          />
        ))}
        {isOpenModal &&
          createPortal(
            <Modal
              largeImage={largeImageUrl}
              onModalClick={this.onModalClick}
              onModalKeyDown={this.onModalKeyDown}
            />,
            document.querySelector('.imageModal')
          )}
      </ul>
    );
  }
}

export default ImageGallery;
