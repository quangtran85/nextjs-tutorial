import {alpha, Button, InputBase, styled} from '@mui/material'
import {Search as SearchIcon} from '@mui/icons-material'
import React, {useState} from 'react'
import {useRouter} from "next/router";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export default function SearchBook() {
  const [searchTitle, setSearchTitle] = useState('');
  const  booksPerPage = 10;
  const router = useRouter();
  const handleSearchTitle = () => {
    const queryParams = { limit: booksPerPage, skip: 0 };
    if (searchTitle) {
      queryParams.title = searchTitle;
    } else {
      delete queryParams.title;
    }
    router.push({ query: queryParams });
  };

  return (
      <>
        <Search>
          <StyledInputBase
              placeholder="Book's name"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTitle}
              onChange={(event) => setSearchTitle(event.target.value)}
          />
          <Button endIcon={<SearchIcon />} sx={{ color: 'white' }} onClick={handleSearchTitle}>
            Search
          </Button>
        </Search>
      </>
  )
}