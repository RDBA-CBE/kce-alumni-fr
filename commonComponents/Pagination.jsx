import Link from 'next/link';
import { useEffect, useState } from 'react';

const Pagination = (props) => {
  const { activeNumber, totalPage, currentPages } = props;
  const totalPages = Math.ceil(totalPage / 10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(currentPages);
  }, [currentPages]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      activeNumber(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      activeNumber(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    activeNumber(pageNumber);
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];
    const pageBuffer = 2;

    if (totalPages <= 6) {
      // If total pages are small, just show all the pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= 3) {
      // Show first 5 pages and '... last'
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pageNumbers.push(i);
      }
      if (totalPages > 5) pageNumbers.push('...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      // Show '1 ... last 5 pages'
      pageNumbers.push(1, '...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show '1 ... currentPage-2 currentPage currentPage+2 ... totalPages'
      pageNumbers.push(1, '...');
      for (
        let i = currentPage - pageBuffer;
        i <= currentPage + pageBuffer;
        i++
      ) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...', totalPages);
    }

    return pageNumbers;
  };

  return (
    <div id='pagination' className='rbt-elements-area mt--50'>
      <div className='wrapper'>
        <div className='row g-5'>
          <div className='col-lg-12'>
            <nav>
              <ul className='rbt-pagination justify-content-center'>
                <li onClick={handlePrevClick} disabled={currentPage === 1}>
                  <Link href='#' aria-label='Previous'>
                    <i className='feather-chevron-left'></i>
                  </Link>
                </li>
                {renderPageNumbers().map((pageNumber, index) => (
                  <li
                    key={index}
                    className={` ${pageNumber === currentPage ? 'active' : ''}`}
                    onClick={() =>
                      typeof pageNumber === 'number' &&
                      handlePageClick(pageNumber)
                    }
                    disabled={
                      pageNumber === '...' || pageNumber === currentPage
                    }
                  >
                    <Link href='#'>{pageNumber}</Link>
                  </li>
                ))}

                <li
                  onClick={handleNextClick}
                  disabled={currentPage === totalPages}
                >
                  <Link href='#' aria-label='Next'>
                    <i className='feather-chevron-right'></i>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
