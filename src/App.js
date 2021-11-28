import React from "react";
import "App.css";
import DataTable from "./DataTable";

const columns = [
  { field: "name", title: "Name", sortable: true },
  { field: "age", title: "Age", sortable: true },
  { field: "city", title: "City", sortable: true }
];

const data = [
  { name: "Niv", age: 23, city: "Ramat Gan" },
  { name: "Elad", age: 37, city: "Nes-Ziona" },
  { name: "Lotan", age: 26, city: "Tel Aviv" }
];

export default function App() {
  return (
    <div className="App">
      <DataTable
        columns={columns}
        data={data}
        isCaseSensitive={false}
        searchable={true}
      />
    </div>
  );
}
