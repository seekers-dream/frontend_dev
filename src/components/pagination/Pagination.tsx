import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <div className="flex items-center justify-between mt-6 px-2">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1 ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary  text-white dark:text-gray-300'
          }`}
        >
          <IoIosArrowBack size={16} />
          <span className="hidden md:inline">Previous</span>
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 rounded-md flex items-center gap-1 ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200  text-gray-700'
          }`}
        >
          <span className="hidden md:inline">Next</span>
          <IoIosArrowForward size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
