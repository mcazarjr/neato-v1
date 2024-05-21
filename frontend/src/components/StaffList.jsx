import { useGetStaffListQuery } from "../slices/staffApiSlice";
import { useState, useEffect } from "react";
import StaffItem from "./StaffItem";
import Loader from "./Loader";

const StaffList = () => {
  const { data: staffs, isLoading, isSuccess } = useGetStaffListQuery();

  return (
    <>
      <table className="table text-base">
        <thead>
          <tr className="text-lg">
            <th>Avatar</th>
            <th>Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td>{<Loader />}</td>
            </tr>
          )}

          {isSuccess &&
            staffs.map((staff) => <StaffItem key={staff.id} staff={staff} />)}
        </tbody>
      </table>
    </>
  );
};

export default StaffList;
