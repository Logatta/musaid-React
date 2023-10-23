import React, { useEffect } from "react";

import { useAuth } from "utils/useAuth";
import useMainPageAPI from "utils/useMainPageAPI";

function DailyProfits() {
  const { fetchMainPage } = useMainPageAPI();
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    window.location.href = "/login";
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMainPage();
      // setProducts(response?.data?.categories);
    };
    fetchData();
  }, []);
  return (
    <>
      <main className="d-flex flex-column flex-grow-1 mt-4 p-3">
        <div className="d-flex flex-grow-1 justify-content-between">
          <h5> DailyProfits</h5>
          <h5> DailyProfits</h5>
        </div>
      </main>
    </>
  );
}

export default DailyProfits;
