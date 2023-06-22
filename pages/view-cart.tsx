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
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { state as authState } from '../services/auth';
import { checkCoupon } from '../services/inventory';
import { Book } from '../services/api';

export default function ViewCart() {
  const router = useRouter();

  useEffect(() => {
    if (!authState.value.profile) {
      router.push('/sign-in');
    }
  }, [router]);

  const [cartBooks, setCartBooks] = useState<Book[]>([]);
  const [coupon, setCoupon] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponValid, setCouponValid] = useState(true);
  const [couponError, setCouponError] = useState<string>('');

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

  const removeFromCart = (bookId: string) => {
    const updatedCartBooks = cartBooks.filter((cartBook) => cartBook.id !== bookId);
    setCartBooks(updatedCartBooks);
    localStorage.setItem('cartBooks', JSON.stringify(updatedCartBooks));
    setDiscountAmount(0);
    setCoupon('');
  };

  const handleCheckout = () => {
    const queryParams: { couponCode?: string } = {};
    if (couponValid) {
      queryParams.couponCode = coupon as string;
    }
    router.push({
      pathname: '/payment',
      query: queryParams,
    });
  };

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

  const applyCoupon = () => {
    checkCoupon(coupon).then((response) => {
      const isValid = response.isValid;
      const percentDiscount = response.percentDiscount;

      if (isValid) {
        const calculatedDiscountAmount = (totalPrice * percentDiscount) / 100;
        setDiscountAmount(calculatedDiscountAmount);
        setCouponValid(true);
        setCouponError('');
      } else {
        setDiscountAmount(0);
        setCouponValid(false);
        setCouponError('Invalid coupon code');
      }
    });
  };

  const discountedPrice = totalPrice - discountAmount;

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
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ color: '#0066ff', mb: 1 }}>
                  Total Price: ${totalPrice}
                </Typography>
                {discountAmount > 0 && (
                  <>
                    <Typography variant="subtitle1" sx={{ color: '#0066ff', mb: 1 }}>
                      Discount Amount: ${discountAmount}
                    </Typography>
                    <Divider />
                    <Typography variant="subtitle1" sx={{ color: '#0066ff', mb: 1 }}>
                      Total Payment: ${discountedPrice}
                    </Typography>
                  </>
                )}
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
                {!couponValid && (
                  <Typography variant="subtitle2" sx={{ color: 'red', mt: 1 }}>
                    {couponError}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={handleCheckout}
              sx={{ bgcolor: '#0066ff', color: '#ffffff', mt: 2 }}
            >
              Checkout
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
