import { useState } from 'react'
import css from './App.module.css'
import NoteList from '../NoteList/NoteList'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchNotes } from '../../services/noteService'
import Modal from '../Modal/Modal'
import SearchBox from '../SearchBox/SearchBox'
import Pagination from '../Pagination/Pagination'
import NoteForm from '../NoteForm/NoteForm'
import { useDebouncedCallback } from 'use-debounce'

function App() {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState(''); 
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1); // 🔥 reset сторінки
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, searchQuery],
    queryFn: () => fetchNotes({
          page: page,
          search: searchQuery
    }),
    placeholderData: keepPreviousData
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
  <div className={css.app}>
    <header className={css.toolbar}>
    <SearchBox
      searchQuery={inputValue}
      onChange={(value: string) => {
        setInputValue(value);
        debouncedSearch(value);
      }}
    />

      {data && data?.totalPages > 1 && (
        <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={setPage} />
      )}
      <button className={css.button} onClick={() => setShowModal(true)}>Create note +</button>
    </header>

    {data?.notes.length !== 0 && (
      <NoteList notes={data?.notes || []} />
    )}

    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <NoteForm onClose={() => setShowModal(false)} />
      </Modal>
    )}
  </div>

  )
}

export default App;