import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import SortingTableComponent from "./ReactTable";

export default function HotelBooking() {
  const { data } = useFetch("http://localhost:8800/api/rooms");
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    if (JSON.stringify(data) !== "[]") {
      makeCols(data);
    }
  }, [data]);
  const makeCols = () => {
    const _cols = [];
    const notReq = ["_id","__v","roomNumbers"]
    let cols = Object.keys(data[0]);
    cols = cols.filter((col) => !notReq.includes(col));
    cols.forEach((col) => {
      const _col = {};
      _col["Header"] = col;
      _col["accessor"] = col;
      _cols.push(_col);
    });
    setColumns(_cols);
  };

  if (JSON.stringify(columns) !== "[]")
    return (
      <div>
        <SortingTableComponent columns={columns} data={data} />
      </div>
    );
}
