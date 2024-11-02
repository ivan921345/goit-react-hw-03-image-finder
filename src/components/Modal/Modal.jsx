import { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onModalKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onModalKeyDown);
  }
  render() {
    const { onModalClick, largeImage } = this.props;
    return (
      <div className="Overlay" onClick={onModalClick}>
        <div className="Modal">
          <img src={largeImage} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
