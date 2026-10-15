"use client";

const Pagination = ({
  activeNumber,
  totalPage,
  currentPages,
  pageSize = 10,
}) => {
  const totalItems = Number(totalPage);
  const itemsPerPage = Number(pageSize);
  const resolvedPageSize =
    Number.isFinite(itemsPerPage) && itemsPerPage > 0 ? itemsPerPage : 10;
  const totalPages = Number.isFinite(totalItems)
    ? Math.max(0, Math.ceil(totalItems / resolvedPageSize))
    : 0;
  const requestedPage = Number(currentPages);
  const currentPage =
    totalPages > 0
      ? Math.min(
          totalPages,
          Math.max(
            1,
            Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1
          )
        )
      : 0;

  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      activeNumber(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        ...Array.from({ length: 5 }, (_, index) => totalPages - 4 + index),
      ];
    }

    return [
      1,
      "...",
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="rbt-elements-area mt--50">
      <div className="wrapper">
        <div className="row g-5">
          <div className="col-lg-12">
            <nav aria-label="Pagination">
              <ul className="rbt-pagination justify-content-center">
                <li className={currentPage === 1 ? "disabled" : ""}>
                  <button
                    type="button"
                    aria-label="Previous page"
                    disabled={currentPage === 1}
                    onClick={() => handlePageClick(currentPage - 1)}
                  >
                    <i className="feather-chevron-left" />
                  </button>
                </li>
                {renderPageNumbers().map((pageNumber, index) => (
                  <li
                    key={`${pageNumber}-${index}`}
                    className={pageNumber === currentPage ? "active" : ""}
                  >
                    {typeof pageNumber === "number" ? (
                      <button
                        type="button"
                        aria-label={`Go to page ${pageNumber}`}
                        aria-current={
                          pageNumber === currentPage ? "page" : undefined
                        }
                        onClick={() => handlePageClick(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    ) : (
                      <span aria-hidden="true">{pageNumber}</span>
                    )}
                  </li>
                ))}
                <li className={currentPage === totalPages ? "disabled" : ""}>
                  <button
                    type="button"
                    aria-label="Next page"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageClick(currentPage + 1)}
                  >
                    <i className="feather-chevron-right" />
                  </button>
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
