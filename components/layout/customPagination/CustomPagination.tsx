import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";
import styles from "./customPagination.module.css";
interface CustomPaginationProps {
  filteredRoomsCount: number;
  resultsPerPage: number;
}

export const CustomPagination = ({
  filteredRoomsCount,
  resultsPerPage,
}: CustomPaginationProps) => {
  const router = useRouter();

  // We'll get active page from params;
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  let queryParams: any;
  //   We'll have acces to clicked page here
  const handleChange = (currentPage: string) => {
    if (typeof window !== undefined) {
      queryParams = new URLSearchParams(window.location.search);

      // If page is there in searc query
      if (queryParams.has("page")) {
          queryParams.set("page", currentPage);
      } else {
        // else add in search params
        queryParams.append("page", currentPage);
      }
    }

    const path = `${window.location.pathname}?${queryParams.toString()}`;
    router.push(path);
  };

  return (
    <div className="d-flex justify-content-center">
      {
        resultsPerPage < filteredRoomsCount && 
      <Pagination
        activePage={page}
        itemsCountPerPage={resultsPerPage}
        totalItemsCount={filteredRoomsCount}
        onChange={handleChange}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass="page-item"
        linkClass="page-link"
      />
      }
    </div>
  );
};
