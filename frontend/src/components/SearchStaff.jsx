import React, { useState, useEffect } from "react";
import { useGetStaffListQuery } from "../slices/staffApiSlice";

const SearchStaff = ({ onSelectStaff }) => {
  const { data: staffs, isLoading, isSuccess } = useGetStaffListQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStaffs, setFilteredStaffs] = useState([]);

  useEffect(() => {
    if (isSuccess && staffs && staffs.length > 0 && searchQuery.trim() !== "") {
      // Filter the staffs based on the search query
      const filteredStaffs = staffs.filter((staff) =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStaffs(filteredStaffs);
    } else {
      setFilteredStaffs([]);
    }
  }, [searchQuery, staffs, isSuccess]);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleStaffSelection = (selectedStaff) => {
    // Clear the search query after selecting a staff
    setSearchQuery("");
    // Pass the selected staff to the parent component
    onSelectStaff(selectedStaff);
  };

  return (
    <div className="search-staff">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Search staff by name..."
      />
      {isLoading && <p>Loading...</p>}
      {filteredStaffs.length > 0 && (
        <ul className="staff-dropdown border-[2px] border-#F5F5F5 rounded-br-lg rounded-bl-lg px-2">
          {filteredStaffs.map((staff) => (
            <li
              key={staff.id}
              onClick={() => handleStaffSelection(staff)}
              className="staff-dropdown-item hover:bg-[#D9D9D9] border-b-[1px] border-[#F5F5F5] cursor-pointer"
            >
              {staff.name} {staff.surname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchStaff;
