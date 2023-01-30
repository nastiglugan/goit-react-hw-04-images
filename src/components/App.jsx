import { useState, useEffect } from 'react';
import { AppWrap } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImgByName } from './api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [imgName, setImgName] = useState('');
  const [page, setPage] = useState(1);
  const [fetchApi, setFetchApi] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(0);

  const formSubmitHandler = imgName => {
    setImgName(imgName);
    setPage(1);
    setFetchApi([]);
  };

  const onChangePageNumber = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (imgName === '') {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoading(true);
        const images = await fetchImgByName(imgName, page);

        if (images.hits.length === 0) {
          throw new Error();
        }
        setFetchApi(prevState => [...prevState, ...images.hits]);
        setLastPage(Math.ceil(images.totalHits / 12));
      } catch (error) {
        setError(toast.error('Щось пішло не так! Перезагрузи сторінку'));
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [imgName, page]);

  const makeImgParametrs = fetchApi.map(image => ({
    id: image.id,
    img: image.webformatURL,
    imgLarge: image.largeImageURL,
    tags: image.tags,
  }));

  return (
    <AppWrap>
      <Searchbar onSubmit={formSubmitHandler} />
      {error !== null && <Toaster position="top-right" reverseOrder={false} />}

      <ImageGallery images={makeImgParametrs} />
      {makeImgParametrs.length !== 0 && page < lastPage && (
        <LoadMoreBtn addPage={onChangePageNumber} />
      )}
      {isLoading && <Loader />}
    </AppWrap>
  );
};
