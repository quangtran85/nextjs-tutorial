import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { state as authState } from '../services/auth'

export default function ViewCart() {
  const router = useRouter();

  useEffect(() => {
    if (!authState.value.profile) {
      router.push('/sign-in');
    }
  }, []);

  const [cartBooks, setCartBooks] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartBooks');
    if (storedCart) {
      setCartBooks(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice = cartBooks.reduce((acc, book) => acc + book.price, 0);
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [cartBooks]);

  const removeFromCart = (bookId) => {
    const updatedCartBooks = cartBooks.filter((cartBook) => cartBook.id !== bookId);
    setCartBooks(updatedCartBooks);
    localStorage.setItem('cartBooks', JSON.stringify(updatedCartBooks));
  };

  const handleCheckout = () => {

  };

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
  };

  const applyCoupon = () => {

  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h5" sx={{ color: '#0066ff', mb: 2 }}>
        Your Cart
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {cartBooks.length > 0 ? (
        <List sx={{ bgcolor: '#ffffff' }}>
          {cartBooks.map((book) => (
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
                    Author: {book.author}
                    <br />
                    Price: ${book.price}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => removeFromCart(book.id)}
                  sx={{ color: '#0066ff' }}
                >
                  Remove
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1" sx={{ color: '#0066ff' }}>
          Your cart is empty.
        </Typography>
      )}
      {cartBooks.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ color: '#0066ff', mb: 1 }}>
                Total Price: ${totalPrice}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="coupon-input"
                label="Add Coupon"
                variant="outlined"
                value={coupon}
                onChange={handleCouponChange}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={applyCoupon}
                sx={{ bgcolor: '#0066ff', color: '#ffffff', mt: 1 }}
              >
                Apply Coupon
              </Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={handleCheckout}
            sx={{ bgcolor: '#0066ff', color: '#ffffff', mt: 2 }}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
}
