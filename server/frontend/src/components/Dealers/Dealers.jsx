import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dealers.css";

const states = [
  "All", "Texas", "Washington", "Florida", "Colorado",
  "Kansas", "Illinois", "Arizona",
];

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const navigate = useNavigate();

  const username = sessionStorage.getItem("username");

  const fetchDealers = async (state) => {
    const url =
      state === "All"
        ? "/djangoapp/get_dealers"
        : `/djangoapp/get_dealers/${state}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.status === 200) {
      setDealersList(json.dealers);
    }
  };

  useEffect(() => {
    fetchDealers("All");
  }, []);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    fetchDealers(state);
    // Cập nhật URL để hiện endpoint (phục vụ Task 19)
    navigate(`/dealers/${state}`, { replace: true });
  };

  const goToDealer = (id) => {
    navigate(`/dealer/${id}`);
  };

  return (
    <div className="dealers_container">
      <div className="dealers_header">
        <h1>Our Dealerships</h1>

        <div className="header_right">
          {username ? (
            <span className="welcome_user">
              Welcome, <strong>{username}</strong>
            </span>
          ) : (
            <div className="auth_links">
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>
          )}
        </div>
      </div>

      <div className="filter_bar">
        <label htmlFor="state">Filter by State: </label>
        <select id="state" value={selectedState} onChange={handleStateChange}>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <table className="dealers_table">
        <thead>
          <tr>
            <th>Dealer Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Zip</th>
            <th>State</th>
            {username && <th>Review Dealer</th>}
          </tr>
        </thead>
        <tbody>
          {dealersList.map((dealer) => (
            <tr key={dealer.id}>
              <td>
                <span
                  className="dealer_link"
                  onClick={() => goToDealer(dealer.id)}
                >
                  {dealer.full_name}
                </span>
              </td>
              <td>{dealer.city}</td>
              <td>{dealer.address}</td>
              <td>{dealer.zip}</td>
              <td>{dealer.state}</td>
              {username && (
                <td>
                  <a href={`/postreview/${dealer.id}`}>Review Dealer</a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;
