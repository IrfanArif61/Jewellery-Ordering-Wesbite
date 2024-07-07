"use client";
import React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetter,
} from "@mui/x-data-grid";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import { useStore } from "@/store";
import { axiosRequest } from "@/lib/config";
import { TbListDetails } from "react-icons/tb";

interface props {
  action?: string;
  data: any;
}

const DataOfGrid = ({ action, data }: props) => {
  const { dispatch } = useStore();

  if (action === "detail") {
    const userRows: any[] = data.map((order: any) => ({
      id: order._id,
      calories: order.totalItems,
      price: order.totalPrice,
      weight: order.totalWeight,
    }));

    const userColumns: GridColDef[] = [
      { field: "id", headerName: "Order Id", width: 150 },
      { field: "price", headerName: "Total Price", width: 120, type: "number" },
      { field: "weight", headerName: "Weight", width: 100, type: "number" },
      {
        field: "calories",
        headerName: "Total Items",
        width: 150,
        type: "number",
      },
    ];

    const actionColumn: GridColDef[] = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        type: "number",
        renderCell: (params) => {
          return (
            <div className="flex mt-2 gap-4 justify-end">
              <Link
                onClick={() => dispatch({ type: "order", payload: data })}
                href={`/order/${params.row.id}`}
              >
                {/* <button className="bg-green-600 text-white px-4 rounded-xl h-[38px] flex items-center">
                  View Details
                </button> */}
                <div className="mt-2.5 text-2xl text-green-700 cursor-pointer font-bold">
                  {/* <CiEdit /> */}
                  <TbListDetails />
                </div>
              </Link>
            </div>
          );
        },
      },
    ];

    return (
      <>
        <div className="h-[50%] w-[100%] mt-[15px]">
          <DataGrid
            className="bg-white"
            rows={userRows}
            columns={[...userColumns, ...actionColumn]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 6 },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            pageSizeOptions={[6]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
          />
        </div>
      </>
    );
  } else {
    let userRows = data.map((product: any) => ({
      id: product._id,
      name: product.name,
      desc: product.description,
      brand: product.brand,
      price: product.price,
      weight: product.weight,
      image: product.image,
    }));

    const handleDelete = async (id: string) => {
      try {
        await axiosRequest.delete(`/product/${id}`);

        window.location.reload();
      } catch (error) {
        console.log("Delete product : ", error);
      }
    };

    const userColumns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 50 },
      {
        field: "pic",
        headerName: "Pic",
        width: 100,
        renderCell: (params) => {
          console.log("Pic params : ", params);
          return (
            <div className="flex justify-center items-center mt-2">
              <img
                src={params.row.image}
                alt="product image"
                className="w-[32px] h-[32px] object-contain"
              />
            </div>
          );
        },
      },
      { field: "name", headerName: "Name", width: 120, type: "string" },
      { field: "price", headerName: "Price", width: 120, type: "number" },
      { field: "weight", headerName: "Weight", width: 100, type: "number" },
      { field: "brand", headerName: "Brand", width: 150, type: "string" },
      { field: "desc", headerName: "Description", width: 400 },
    ];

    const actionColumn: GridColDef[] = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="flex gap-4">
              <Link
                onClick={() =>
                  dispatch({ type: "product", payload: params.row })
                }
                href={`/add-item/${params.id as string}`}
              >
                <div className="mt-2.5 text-2xl text-green-700 cursor-pointer font-bold">
                  <CiEdit />
                </div>
              </Link>
              <div className="mt-2.5 text-2xl text-red-500 cursor-pointer">
                <RiDeleteBin6Line
                  onClick={() => handleDelete(params.id as string)}
                />
              </div>
            </div>
          );
        },
      },
    ];

    return (
      <>
        <div className="h-[50%] w-[100%] mt-[15px]">
          <DataGrid
            className="bg-white"
            rows={userRows}
            columns={[...userColumns, ...actionColumn]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 4 },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            pageSizeOptions={[4]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
          />
        </div>
      </>
    );
  }
};

export default DataOfGrid;
