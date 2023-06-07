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
  ListItemSecondaryAction,
  Checkbox,
  Avatar,
  Pagination,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { getListBooks } from '../services/inventory';

export default function BookList() {
  const [page, setPage] = useState(1);
  const booksPerPage = 10;

  const router = useRouter();

  const { limit = booksPerPage, skip = 0 } = router.query;
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [cartBooks, setCartBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isReload, setIsReload ] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    getListBooks({ limit, skip })
      .then((response) => {
        setBooks(response.data);
        setTotalBooks(response.pagination.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [router.isReady, limit, skip]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartBooks');
    if (storedCart) {
      setCartBooks(JSON.parse(storedCart));
    }
    setIsReload(false);
  }, []);

  useEffect(() => {
    if(!isReload) {
      localStorage.setItem('cartBooks', JSON.stringify(cartBooks));
    }
  }, [isReload, cartBooks]);

  const addToCart = (book) => {
    if (!cartBooks.find((cartBook) => cartBook.id === book.id)) {
      setCartBooks(prevBook => [...prevBook, book]);
    }
    setSelectedBooks(selectedBooks.filter((id) => cartBooks.includes(id)));
  };

  const handleCheckboxChange = (event) => {
    const bookId = event.target.value;
    if (event.target.checked) {
      setSelectedBooks([...selectedBooks, bookId]);
    } else {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    }
  };

  const handleChangePage = (event, value) => {
    const newSkip = (value - 1) * booksPerPage;
    router.push(`/?limit=${booksPerPage}&skip=${newSkip}`);
    setPage(value);
  };

  const handleViewCart = () => {
    router.push('/cart');
  };

  const removeFromCart = (bookId) => {
    setCartBooks(cartBooks.filter((cartBook) => cartBook.id !== bookId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isNextDisabled = books.length < booksPerPage;

  const totalPrice = cartBooks.reduce((acc, book) => acc + book.price, 0);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ bgcolor: '#f9f9f9', p: 2 }}>
            <Typography variant="h5" sx={{ color: '#0066ff' }}>
              List of Books
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {books.length > 0 ? (
              <List sx={{ bgcolor: '#ffffff' }}>
                {books?.map((book) => (
                  <ListItem key={book.id} sx={{ py: 1 }}>
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
                          Author: {book.author}<br/>
                          Price: ${book.price}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction sx={{ pr: 2 }}>
                      <Checkbox
                        value={book.id}
                        checked={selectedBooks.includes(book.id)}
                        onChange={handleCheckboxChange}
                        sx={{ color: '#0066ff' }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="subtitle1" sx={{ color: '#0066ff' }}>
                There are no books available.
              </Typography>
            )}
            <Grid item xs={12} md={8}>
              <Box sx={{ bgcolor: '#f9f9f9', p: 2 }}>
                {books.length > 0 && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ marginTop: '5px' }}
                  >
                    <Box>
                      <Button
                        variant="contained"
                        disabled={selectedBooks.length === 0}
                        onClick={() => {
                          selectedBooks.forEach((bookId) => {
                            const book = books.find((book) => book.id === bookId);
                            if (book && !cartBooks.includes(book)) {
                              addToCart(book);
                            }
                          });
                        }}
                        sx={{ mr: '10px', bgcolor: '#0066ff', color: '#ffffff' }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                    <Pagination
                      count={Math.ceil(totalBooks / booksPerPage)}
                      page={page}
                      onChange={handleChangePage}
                      disabled={isNextDisabled}
                      sx={{ justifyContent:'center', alignItems: 'center' }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: '#f9f9f9', p: 2 }}>
            <Typography variant="h5" sx={{ color: '#0066ff' }}>
              Cart
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {cartBooks.length > 0 ? (
              <List sx={{ bgcolor: '#ffffff' }}>
                {cartBooks?.map((book) => (
                  <ListItem key={book.id} sx={{ py: 1 }}>
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
                          Author: {book.author}<br/>
                          Price: ${book.price}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeFromCart(book.id)}
                        sx={{ color: '#0066ff' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="subtitle1" sx={{ color: '#0066ff' }}>
                Your cart is empty.
              </Typography>
            )}
            <Typography variant="h6" sx={{ color: '#0066ff', mt: 2 }}>
              Total Price: ${totalPrice}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                disabled={cartBooks.length === 0}
                onClick={handleViewCart}
                sx={{ bgcolor: '#0066ff', color: '#ffffff' }}
              >
                View Cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
