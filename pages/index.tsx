import BookList from '../components/BookList'
import React from 'react'
import { isManager } from '../services/auth'
import ManagerBookList from '../components/manager/BookList'

export default function Home() {
  return (
    <>
      {isManager() ? (
        <ManagerBookList />
      ) : (
        <BookList/>
      )}
    </>
  );
}
