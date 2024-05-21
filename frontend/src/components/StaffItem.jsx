import { useNavigate } from "react-router-dom";

const StaffItem = ({ staff }) => {
  const navigate = useNavigate();

  return (
    <>
      <tr
        className="hover:bg-[#adebd4] cursor-pointer"
        onClick={(e) => navigate(`${staff.id}`)}
      >
        <td>
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={"https://picsum.photos/200?random=" + staff.id}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
        </td>
        <td>{staff.name}</td>
        <td>{staff.designation}</td>
      </tr>
    </>
  );
};

export default StaffItem;
