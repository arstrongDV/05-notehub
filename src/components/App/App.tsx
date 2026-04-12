import { useState, type ComponentType } from 'react'
import css from './App.module.css'
import NoteList from '../NoteList/NoteList'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote, deleteNote, fetchNotes } from '../../services/noteService'
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import Modal from '../Modal/Modal'
import type { ToDoFormValues } from '../NoteForm/NoteForm'
import SearchBox from '../SearchBox/SearchBox'

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

function App() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, searchQuery],
    queryFn: () => fetchNotes({
          page: page,
          search: searchQuery
    }),
    // enabled: searchQuery !== "",
    placeholderData: keepPreviousData
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['notes']})
    }
  })

  const postToDoMutation = useMutation({
    mutationFn: (values: ToDoFormValues) => createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['notes']})
    }
  })

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
  <div className={css.app}>
    <header className={css.toolbar}>
      <SearchBox searchQuery={searchQuery} onChange={(newQuery: string) => setSearchQuery(newQuery)} />

      {data && data?.totalPages > 1 && (
        <ReactPaginate 
          pageCount={data?.totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      <button className={css.button} onClick={() => setShowModal(true)}>Create note +</button>
    </header>

    {data?.notes.length !== 0 && (
      <NoteList notes={data?.notes || []}  onDelete={(id: string) => deleteMutation.mutate(id)} />
    )}

    {showModal && (
      <Modal onClose={() => setShowModal(false)} onPost={(values: ToDoFormValues) => postToDoMutation.mutate(values)} />
    )}
  </div>

  )
}

export default App;