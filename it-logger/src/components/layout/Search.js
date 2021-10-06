import React from "react";

export const Search = () => {
  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div class="nav-wrapper">
        <form>
          <div class="input-field">
            <input id="search" type="search" />
            <label class="label-icon" htmlFor="search">
              <i class="material-icons">search</i>
            </label>
            <i class="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Search;
