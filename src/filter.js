const filters = {
  searchText: '',
};

const getFilters = () => filters;

const setFilters = ({ searchText }) => {
  if (typeof searchText === 'string') {
    filters.searchText = searchText.toLowerCase();
  }
};

export { getFilters, setFilters };
