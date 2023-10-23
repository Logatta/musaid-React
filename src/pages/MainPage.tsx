import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PlusRoundIcon from "@rsuite/icons/PlusRound";
import Card from "components/Card";
import { useAuth } from "utils/useAuth";
import useMainPageAPI from "utils/useMainPageAPI";
import { ProductCategory } from "utils/types";
import { useQuery } from "@tanstack/react-query";

function MainPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    window.location.href = "/login";
  }
  const fetchMainPageData = async () => {
    const response = await fetchMainPage(); // Assuming that fetchMainPage returns a promise
    return response?.data?.categories;
  };

  const { fetchMainPage } = useMainPageAPI();
  const {
    data: MainPageData,
    isLoading,
    isError,
  } = useQuery<ProductCategory[], Error>({
    queryKey: ["categories-data"],
    queryFn: fetchMainPageData,
  });

  return (
    <>
      <main className="d-flex flex-column flex-grow-1 mt-4 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4> المنتجات</h4>
          <button
            onClick={() => navigate("/add-product")}
            color="blue"
            className="btn btn-primary icon-button"
          >
            <PlusRoundIcon />
            إضافة منتج
          </button>
        </div>
        <div className="products-view">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error fetching products</div>
          ) : MainPageData && MainPageData.length > 0 ? (
            MainPageData?.map((productCat: ProductCategory) =>
              productCat.items?.map((product) => (
                <Link
                  key={product.id}
                  className="d-contents"
                  to={`/product/${product.id}`}
                >
                  <Card item={product} category={productCat} />
                </Link>
              ))
            )
          ) : (
            <div>No items found</div>
          )}
        </div>
      </main>
    </>
  );
}

export default MainPage;
