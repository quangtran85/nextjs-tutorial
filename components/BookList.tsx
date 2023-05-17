import styled from '@emotion/styled'
import { CheckBox } from '@mui/icons-material'
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  alpha,
} from '@mui/material'
import React from 'react'
import { IBook } from '../services/inventory'

interface BookListProps {
  data: IBook[]
}

export default function BookList(props: BookListProps) {
  const { data } = props

  return (
    <>
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Books
        </Typography>
        <Divider />
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {/* list item here */}
        </List>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={0}></Paper>
      </Grid>
    </>
  )
}
