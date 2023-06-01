import { Container, Grid } from '@mui/material'
import React from 'react'
import AppBar from './partials/AppBar'
import Footer from './partials/Footer'

export interface LayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <Container maxWidth="lg">
      <AppBar />
      <main>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: '20px',
          }}
        >
          {children}
        </Grid>
      </main>
      <Footer description="" title="Book E-Commerce System (BECS)" />
    </Container>
  )
}
