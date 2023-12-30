import React, { useEffect, useState } from "react";
import TableComponent from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";

export default function TexiBooking() {
  const { data } = useFetch("http://localhost:8800/api/gettaxi-bookings");
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (JSON.stringify(data) !== "[]") {
      bookingWithUser(data);
    }
  }, [data]);

  const bookingWithUser = (items) => {
    const _items = [];
    items.forEach((item) => {
      item.id = item._id;
      item.username = item?.userId?.username;
      const carModal = item && item.taxiId && item.taxiId.carModel;
      const licenseNum = item && item.taxiId && item.taxiId.licenseNum;
      item["TaxiDetail"] = `${carModal ? carModal : ""}/${
        licenseNum ? licenseNum : ""
      }`;
      delete item["userId"];
      delete item["taxiId"];
      _items.push(item);
    });
    setItems(_items);
  };

  if (items && items.length > 0)
    return (
      <div>
        {" "}
        <TableComponent data={items} />
      </div>
    );
}
