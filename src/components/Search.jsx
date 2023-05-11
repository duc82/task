import React, { useState } from "react";
import PropTypes from "prop-types";
import toLowerCaseNonAccentVietnamese from "../utils/toLowerCaseNonAccentVietnamese";

const Search = ({ openActive, searchTask, clearSearchTask }) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newKeyword = toLowerCaseNonAccentVietnamese(keyword);
    searchTask(newKeyword);
  };

  const clearKeyword = () => {
    clearSearchTask();
    setKeyword("");
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <label htmlFor="keyword" className="hidden">
          Từ khóa
        </label>
        <input
          type="text"
          id="keyword"
          name="keyword"
          placeholder="Tìm kiếm theo tên nhiệm vụ"
          value={keyword}
          className="input-search"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="button success"
          style={{ marginRight: "10px" }}
        >
          Tìm kiếm
        </button>
        <button type="button" className="button warning" onClick={clearKeyword}>
          Xóa
        </button>
      </form>
      <button type="button" className="button success" onClick={openActive}>
        Thêm mới
      </button>
    </div>
  );
};

Search.propTypes = {
  openActive: PropTypes.func,
  searchTask: PropTypes.func,
  clearSearchTask: PropTypes.func,
};

export default Search;
