import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import sdkProvider from "../../utils/sdk";

const ShowListingPage = () => {
  const [myListings, setMyListings] = React.useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const sdk = sdkProvider();
  const fetcher = () => {
    return sdk.listings?.query({ perPage: 4, page: pageIndex }).then((res) => {
      const showListings = res?.data?.data;
      setTotalPage(res?.data?.meta?.totalPages);
      return showListings;
    });
  };
  const { data, error } = useSWR(`/api/data?page=${pageIndex}`, fetcher);
  // sdk.listings?.query({}).then((res) => {
  //   setMyListings(res?.data?.data);
  // });
  if (error) {
    return "error";
  }
  if (!data) {
    return "Loading";
  }
  console.log("my listing", totalPage);

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-center text-4xl my-6">My Listings</h1>
        <div className="grid grid-cols-3 gap-10">
          {data?.map((listing) => {
            return (
              <div key={listing.id.uuid} className="bg-green-300 p-5">
                <h2 className="text-3xl font-bold">
                  {listing.attributes.title}
                </h2>
                <p>{listing.attributes.description}</p>
                <p>Price: ${listing.attributes.price.amount}</p>
                <p>City: {listing.attributes.publicData.address.city}</p>
                <p>Country: {listing.attributes.publicData.address.country}</p>
                <p>Street: {listing.attributes.publicData.address.street}</p>
              </div>
            );
          })}
        </div>
        <div>
          {pageIndex > 1 ? (
            <button
              onClick={() => setPageIndex(pageIndex - 1)}
              className="bg-red-500 p-3 text-white mr-3"
            >
              Previous
            </button>
          ) : (
            <></>
          )}
          {pageIndex < totalPage && (
            <button
              onClick={() => setPageIndex(pageIndex + 1)}
              className="bg-red-500 p-3 text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowListingPage;
