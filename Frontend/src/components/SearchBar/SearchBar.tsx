import ISearchBarProps from "../../interface/ISearchBarProps";
import "./SearchBar.css";

function SearchBar(props: ISearchBarProps) {
  const {
    query,
    getData,
    record,
    handleChange,
    handleFileChange,
    handleClick,
  } = props;
  return (
    <div>
      <div className="find-record-div">
        <input
          onChange={(event) => handleChange(event)}
          className="find-csv-input"
          placeholder="find your record"
          value={query}
        />
        <button onClick={getData} className="csv-button">
          FIND
        </button>
      </div>

      <div className="send-file-div">
        <label className={record ? "select-file" : "no-file"} htmlFor="my-file">
          REGISTER CSV FILE
        </label>
        <input
          onChange={(event) => handleFileChange(event)}
          type="file"
          id="my-file"
          name="my-file"
          data-testid="my-file"
        />
        <button onClick={handleClick} className="csv-button">
          SEND
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
