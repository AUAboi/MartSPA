import { FaUsers, FaUserShield, FaUsersSlash } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

const userStats = [
  {
    title: "Registered",
    members: '200',
    icon: <FaUsers />,
    bgColor: 'bg-violet-700'
  },
  {
    title: "Vendor",
    members: '20',
    icon: <FaUserShield />,
    bgColor: 'bg-green-700'
  },
  {
    title: "Users",
    members: '170',
    icon: <FaUserGroup />,
    bgColor: 'bg-sky-500'
  },
  {
    title: "Suspended",
    members: '10',
    icon: <FaUsersSlash />,
    bgColor: 'bg-red-700'
  }
];

export default userStats;