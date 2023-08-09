import { MDBDataTable } from "mdbreact";
import "./App.css";

const data = {
  columns: [
    {
      label: "Name",
      field: "name",
      sort: "asc",
    },
    {
      label: "Age",
      field: "age",
      sort: "asc",
    },
    // Add more columns as needed...
  ],
  rows: [
    {
      name: "John Doe",
      age: 25,
    },
    {
      name: "Jane Smith",
      age: 30,
    },
    // Add more rows as needed...
  ],
};

const CollapsableTable = () => {
  return <MDBDataTable data={data} />;
};
export default CollapsableTable;
