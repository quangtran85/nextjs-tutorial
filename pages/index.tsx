import BookList from '../components/BookList'
import React, { useContext } from 'react'
import { store } from '../contexts/AppContext'
import { isManager } from '../services/auth'
import ManagerBookList from '../components/manager/BookList'

export default function Home() {
  const { state } = useContext(store)
  return (
    <>
      {isManager() ? (
        <ManagerBookList />
      ) : (
        <BookList data={state.bookList} />
      )}
    </>
  );
}
