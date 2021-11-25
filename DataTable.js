import { useState } from "react";

const Table = ({ columns, data, onSort, sortField, sortDirection }) => {
  const renderColumns = () => {
    return columns.map((col, i) => (
      <th className="table-header-cell" key={i}>
        {col.title} {renderSortButton(col, onSort)}
      </th>
    ));
  };

  const renderSortButton = (col, onSort) => {
    if (col.sortable) {
      return (
        <SortButton
          onSort={onSort}
          col={col}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      );
    }
  };

  const renderRows = () => {
    return data.map((row, i) => (
      <tr className="table-row" key={i}>
        {renderRow(row)}
      </tr>
    ));
  };

  const renderRow = (row) => {
    const rowKeys = columns.map((col) => col.field);
    return rowKeys.map((cell, i) => {
      return (
        <td className="table-cell" key={i}>
          {row[cell]}
        </td>
      );
    });
  };

  return (
    <table>
      <thead className="table-header">
        <tr>{renderColumns()}</tr>
      </thead>
      <tbody className="table-body">{renderRows()}</tbody>
    </table>
  );
};

const SortButton = ({ col, onSort, sortField, sortDirection }) => {
  if (col.field !== sortField) {
    return (
      <span
        onClick={() => {
          onSort(col.field, "asc");
        }}
        style={{ opacity: "0.3" }}
      >
        {"⬆️"}
      </span>
    );
  } else {
    return (
      <span
        onClick={() => {
          const newDirection = sortDirection === "asc" ? "desc" : "asc";
          onSort(col.field, newDirection);
        }}
      >
        {sortDirection === "asc" ? "⬆️" : "⬇️"}
      </span>
    );
  }
};

const DataTable = ({
  columns,
  data,
  searchable = true,
  isCaseSensitive = false
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // do we need that?
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setsortDirection] = useState(null);

  const sortFn = (field, direction) => {
    setSortField(field);
    setsortDirection(direction);
    data.sort((a, b) => {
      // if a > b ==> b will be sorted before a.
      return direction === "asc" && a[field] > b[field] ? 1 : -1;
    });
  };

  const filterFn = (row) => {
    for (const cell in row) {
      let cellValue = row[cell].toString();
      let currentSearchTerm = searchTerm;
      if (!isCaseSensitive) {
        cellValue = cellValue.toLowerCase();
        currentSearchTerm = currentSearchTerm.toLowerCase();
      }
      if (cellValue.includes(currentSearchTerm)) {
        return row;
      }
    }
  };

  const search = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const injectSearchBar = () => {
    if (searchable) {
      return <SearchBar onSearch={search} />;
    }
  };

  return (
    <section>
      {injectSearchBar()}
      <Table
        columns={columns}
        data={data.filter(filterFn)}
        onSort={sortFn}
        sortField={sortField}
        sortDirection={sortDirection}
      />
    </section>
  );
};

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Type in to search..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default DataTable;
