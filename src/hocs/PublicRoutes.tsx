import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { StoreType } from "../types/geericTypes";

const PublicRouter: React.FC<{}> = ( ) => {
  const inSession = useSelector((state: StoreType) => state?.app?.user?.token || false);
  return !inSession ? <Outlet /> : <Navigate to={'/inicio'} />;
};

export default PublicRouter;