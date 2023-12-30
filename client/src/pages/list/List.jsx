import "./list.css";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = () => {
  const location = useLocation();
  const destination = location.state.destination;
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const options = location.state.options;
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [counting, setCounting] = useState(0);

  const { data, loading, error, reFetch } = useFetch(
    ` /hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    console.log(hotels);
  }, [hotels]);

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                <div>
                  <SortingHotels
                    hotels={hotels}
                    setHotels={setHotels}
                    data={data}
                    counting={counting}
                    setCounting={setCounting}
                  />
                </div>
                {hotels &&
                  hotels.map((item) => (
                    <SearchItem item={item} key={item._id} />
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

const SortingHotels = (props) => {
  const { hotels, setHotels, data, counting, setCounting } = props;

  const [sort, setSort] = useState("both");
  const [count, setCount] = useState(0);

  const sorting = () => {
    const mapping = {
      0: "down",
      1: "up",
      2: "both",
    };
    if (count === 2) {
      setCount(0);
      setSort(mapping[count]);
    } else {
      setCount((prev) => prev + 1);
      setSort(mapping[count]);
    }
  };

  useEffect(() => {
    let items = [];
    if (sort === "down") {
      items = hotels.sort((a, b) => {
        return a.cheapestPrice - b.cheapestPrice;
      });
    } else if (sort === "up") {
      items = hotels.sort((a, b) => {
        return b.cheapestPrice - a.cheapestPrice;
      });
    } else if (sort === "both") {
      items = data;
    }
    setHotels([...items]);
  }, [sort]);

  return (
    <div className="d-flex align-items-center mb-2">
      {/* {counting}
      <button onClick={() => setCounting((prev) => prev + 1)}></button> */}
      <span>Sort Result By: </span>
      <div
        onClick={sorting}
        className="ms-2 bg-light d-flex align-item-center rounded pt-1 pb-1 ps-2 pe-2"
      >
        <span className="fs-5">Price</span>
        <div className="d-flex justify-content-center flex-column ps-2">
          {(sort === "down" || sort === "both") && (
            <FontAwesomeIcon
              icon={faAngleUp}
              className="fa-angle-up font-down"
            />
          )}
          {(sort === "up" || sort === "both") && (
            <FontAwesomeIcon
              icon={faAngleDown}
              className="fa-angle-up font-up"
            />
          )}
        </div>
      </div>
    </div>
  );
};
