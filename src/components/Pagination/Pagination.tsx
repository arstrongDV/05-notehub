import { type ComponentType } from 'react'
import css from './Pagination.module.css'
import type { fetchNotesResponse } from '../../services/noteService'
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;


interface PaginationProps{
    data: fetchNotesResponse;
    page: number;
    setPage: (selected: number) => void;
}

const Pagination = ({ data, page, setPage }: PaginationProps) => {
  return (
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
  )
}

export default Pagination
