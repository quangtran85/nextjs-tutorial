import BookList from '../components/BookList'
import { useContext } from 'react'
import { store } from '../contexts/AppContext'

export default function Home() {
  const { state } = useContext(store)
  return <BookList data={state.bookList} />
}
