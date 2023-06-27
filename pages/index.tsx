import BookList from '@components/BookList'
import { store } from '@contexts/AppContext'
import { useContext } from 'react'

export default function Home() {
  const { state } = useContext(store)
  return <BookList data={state.bookList} />
}
