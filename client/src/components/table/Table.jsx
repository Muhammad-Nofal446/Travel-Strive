import * as React from "react";
import SortingTableComponent from "./ReactTable";

export default function TableComponent(props) {
  const { data } = props;
  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      const cols = generateCol();
      setColumns(cols);
    }
  }, [data]);

  const generateCol = () => {
    const arrOfKeys = Object.keys(data[0]);
    const cols = [];
    const notReqFields = ["id", "_id", "__v", "_v"];
    arrOfKeys?.forEach((item) => {
      if (!notReqFields.includes(item)) {
        let col = {};
        col["accessor"] = item;
        col["Header"] = item;
        cols.push(col);
      }
    });
    // arrOfKeys?.forEach((item) => {
    //   if (!notReqFields.includes(item)) {
    //     let col = {};
    //     col["field"] = item;
    //     col["headerName"] = item;
    //     col["width"] = 150;
    //     cols.push(col);
    //   }
    // });
    return cols;
  };

  if (data && data.length > 0)
    return (
      <div style={{ height: "80vh", width: "100%", padding: "1rem" ,marginBottom:"3rem"}}>
        {JSON.stringify(columns) !=="[]" && <SortingTableComponent data={data} columns={columns} />}
        {/* <DataGrid rows={data} columns={columns} /> */}
      </div>
    );
}
