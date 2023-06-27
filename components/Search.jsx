import { ActionType, store } from '@contexts/AppContext'
import { Search as SearchIcon } from '@mui/icons-material'
import { Button, InputBase, alpha, styled } from '@mui/material'
import { useContext } from 'react'

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
  const globalState = useContext(store)
  const { dispatch } = globalState

  return (
    <>
      <Search>
        <StyledInputBase
          placeholder="Book's name"
          inputProps={{ 'aria-label': 'search' }}
        />
        <Button
          endIcon={<SearchIcon />}
          sx={{ color: 'white' }}
          onClick={() => {
            dispatch({
              type: ActionType.SET_BOOK_LIST,
              bookList: [{ title: 'Test' }],
            })
          }}
        >
          Search
        </Button>
      </Search>
    </>
  )
}
