import React, { useCallback, useEffect } from 'react';
import { Dropdownz } from '.';
import { ListItem } from '@material-tailwind/react';

const ButtonPagination = ({ content, onClick = () => {}, active, className = '' }) => {
  return (
    <ListItem className="p-0">
      <button
        onClick={onClick}
        className={`relative rounded text-sm cursor-pointer transition-all duration-300 w-9 h-9 flex justify-center items-center ${className}
        ${active ? 'bg-primary shadow-md shadow-cyan-200 text-white font-medium' : 'bg-gray-100 text-color hover:bg-gray-200'}`}
      >
        {content}
      </button>
    </ListItem>
  );
};

const Paginationz = (props) => {
  const { total = 0, params = {}, setParams = () => {}, rows = [] } = props;

  const renderPageLinks = useCallback(() => {
    if (!params.limit) return;
    const currentPage = params.page;
    const pageCount = Math.ceil(total / params.limit);
    const pages = [];
    if (pageCount === 0 || currentPage <= 0 || currentPage > pageCount) pages.push(1);
    else {
      pages.push(currentPage);
      const visible = 5;
      const numberPage = pageCount < visible ? pageCount : visible;
      for (let index = 1; index < numberPage; index++) {
        const pageBefore = pages[0] - 1;
        const pageAfter = pages[pages.length - 1] + 1;
        if (pageBefore > 0 && (index < numberPage / 2 || pageAfter - 1 >= numberPage)) pages.unshift(pageBefore);
        else pages.push(pageAfter);
      }
    }
    return pages.map((page, index) => (
      <ButtonPagination key={index} content={page} active={params.page === page} onClick={(e) => setParams({ ...params, page })} />
    ));
  }, [params.limit, params.page, total]);

  useEffect(() => {
    if (total) {
      const currentPage = params.page;
      const pageCount = Math.ceil(total / params.limit);
      if (currentPage > pageCount) setParams((pre) => ({ ...pre, page: pageCount > 0 ? pageCount : 1 }));
    }
  }, [params.limit, params.page, total]);

  return (
    <nav aria-label="Page navigation example" className="flex items-center gap-4">
      <ul className="list-style-none flex gap-2">
        <ButtonPagination
          content={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M4.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L6.31 10l3.72-3.72a.75.75 0 1 0-1.06-1.06L4.72 9.47Zm9.25-4.25L9.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L11.31 10l3.72-3.72a.75.75 0 0 0-1.06-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          }
          className="!px-2"
          onClick={() => setParams({ ...params, page: 1 })}
        />
        {renderPageLinks()}
        <ButtonPagination
          content={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          }
          className="!px-2"
          onClick={() => setParams({ ...params, page: Math.ceil(total / params.limit) || 1 })}
        />
      </ul>
      {rows.length > 0 && (
        <div className="min-w-20">
          <Dropdownz
            size="md"
            options={rows}
            value={params.limit}
            onChange={(e) => setParams({ ...params, limit: Number(e) })}
            label="rows"
            className="!w-24"
          />
        </div>
      )}
      <span className="text-sm bg-transparent">Tổng số: {total} bản ghi</span>
    </nav>
  );
};

export default Paginationz;
