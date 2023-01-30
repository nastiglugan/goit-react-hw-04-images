import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SearchbarWrap,
  SearchForm,
  SearchBtn,
  SearchInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {
  const [imgName, setImgName] = useState('');

  const handleIputChange = e => {
    setImgName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imgName.trim() === '') {
      toast.error('Ти нічого не ввів в пошук!');
      return;
    }
    onSubmit(imgName);

    setImgName('');
  };

  return (
    <SearchbarWrap>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <FaSearch color="black" />
        </SearchBtn>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imgName}
          onChange={handleIputChange}
        />
      </SearchForm>
    </SearchbarWrap>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
