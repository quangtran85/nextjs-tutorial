import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Pagination,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import { getListBooks } from '../../services/inventory';


export default function ManagerBookList() {
  const [page, setPage] = useState(1);
  const booksPerPage = 10;

  const router = useRouter();

  const { limit = booksPerPage, skip = 0, title = '' } = router.query;
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    getListBooks({ limit, skip, title })
      .then((response) => {
        setBooks(response.data);
        setTotalBooks(response.pagination.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [router.isReady, limit, skip, title]);

  const handleChangePage = (event, value) => {
    const newSkip = (value - 1) * booksPerPage;
    router.push(`/?limit=${booksPerPage}&skip=${newSkip}`);
    setPage(value);
  };

  const isNextDisabled = books.length < booksPerPage;

  const handleEditBook = (bookId) => {
    router.push(`/add-book/?bookId=${bookId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box sx={{ bgcolor: '#f9f9f9', p: 2 }}>
            <Typography variant="h5" sx={{ color: '#0066ff' }}>
              List of Books
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {books.length > 0 ? (
              <List sx={{ bgcolor: '#ffffff' }}>
                {books?.map((book) => (
                  <ListItem key={book.id} sx={{ py: 2 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#0066ff' }}>
                        {book.title.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ color: '#0066ff' }}>
                          {book.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="subtitle1">
                          Author: {book.author}
                          <br />
                          Price: ${book.price}
                        </Typography>
                      }
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditBook(book.id)}
                      startIcon={<EditIcon />}
                      sx={{ ml: 2 }}
                    >
                      Edit Book
                    </Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="subtitle1" sx={{ color: '#0066ff' }}>
                There are no books available.
              </Typography>
            )}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 4 }}
            >
              {books.length > 0 && (
                <Pagination
                  count={Math.ceil(totalBooks / booksPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  disabled={isNextDisabled}
                  sx={{ justifyContent: 'center' }}
                />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
