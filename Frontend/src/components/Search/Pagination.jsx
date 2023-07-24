import React from 'react';
import '../App.css'; // Importe o arquivo CSS para o componente

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Exibe até 4 botões antes dos três pontos
    let startPage = Math.max(1, currentPage - 4);
    let endPage = Math.min(totalPages, startPage + 8) - 1;

    if (endPage - startPage >= 8) {
      startPage = endPage - 8;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? 'current-page' : 'page-button'} // Adicione classes diferentes aos botões
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => handlePageChange(currentPage - 1)} className="page-button">
          {'<'}  Anterior
        </button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <button onClick={() => handlePageChange(currentPage + 1)} className="page-button">
          Próxima {'>'}
        </button>
      )}
    </div>
  );
};

export default Pagination;
