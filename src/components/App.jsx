import { Component } from 'react';
import '../styles/styles.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import * as API from '../services/api';
import 'react-toastify/dist/ReactToastify.css';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    images: [],
    page: 2,
    query: '',
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isLoading } = this.state;
    if (isLoading !== prevState.isLoading) {
      if (isLoading) {
        Notiflix.Loading.custom('Loading...', {
          customSvgUrl:
            'https://notiflix.github.io/content/media/loading/notiflix-loading-nx-light.svg',
        });
      } else {
        Notiflix.Loading.remove();
      }
    }
  }

  onSearchbarSubmit = async (values, { resetForm }) => {
    try {
      this.setState({ query: values.query, isLoading: true });

      const resp = await API.fetchImages(values.query);
      this.setState({ isLoading: false });

      if (resp.hits.length === 0) {
        Notiflix.Notify.failure(
          'No results found, please try a different query'
        );
        throw new Error();
      } else {
        this.setState({ images: resp.hits });
        resetForm();
        Notiflix.Notify.success(`Found about ${resp.totalHits} results`);
      }
    } catch (error) {
      this.setState({ isLoading: false });
      Notiflix.Notify.failure(
        'There was some errors, please reload the page and try again'
      );
    }
  };

  onLoadMoreButtonClick = async () => {
    this.setState(({ page }) => ({ page: page + 1 }));
    const resp = await API.fetchImages(this.state.query, this.state.page);
    this.setState(({ images }) => ({
      images: [...images, ...resp.hits],
    }));
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchbarSubmit} />
        <ImageGallery images={images} />
        {images.length === 0 ? (
          ''
        ) : (
          <Button onClick={this.onLoadMoreButtonClick} />
        )}
      </div>
    );
  }
}

export default App;
