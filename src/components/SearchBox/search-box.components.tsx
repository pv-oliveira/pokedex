import "./search-box.styles.scss";

type SearchBoxProps = {
  className: string;
  placeholder?: string;
  searchChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBox = ({ className, placeholder, searchChange }: SearchBoxProps) => {
  return (
    <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder}
      onChange={(e) => searchChange(e)}
    />
  );
};

export default SearchBox;
