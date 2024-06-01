import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../redux/features/auth/authSlice";

export const ShowIfLoggedIn = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const ShowIfLoggedOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export const ShowToAdminVendor = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  if (isLoggedIn && (userRole?.role === "admin" || userRole?.role === "vendor")) {
    return <>{children}</>;
  }
  return null;
};

export const ShowToUsernVendor = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  if (isLoggedIn && (userRole?.role === "user" || userRole?.role === "vendor")) {
    return <>{children}</>;
  }
  return null;
};


export const ShowOnlyAdmin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  if (isLoggedIn && userRole?.role === "admin") {
    return <>{children}</>;
  }
  return null;
};
export const ShowOnlyVendor = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  if (isLoggedIn && userRole?.role === "vendor") {
    return <>{children}</>;
  }
  return null;
};
export const ShowOnlyUser = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  if (isLoggedIn && userRole?.role === "user") {
    return <>{children}</>;
  }
  return null;
};
