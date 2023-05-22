import BookList from '../components/BookList'
import BasicListMenu from '../components/BasicListMenu'
import React, { useContext } from 'react'
import { store } from '../contexts/AppContext'
import { Box } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'
export default function Home() {
  const { state } = useContext(store)
  return <>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid xs={3}>
        <BasicListMenu />
      </Grid>
      <Grid xs={9}>
        <BookList data={state.bookList} />
      </Grid>
    </Grid>
    </Box>
  </>
}
