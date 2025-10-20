import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const AppRouter = () => {
  const { store } = useContext(Context);

  if (!store.isAuth) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/users" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/users" />} />
    </Routes>
  );
}


export default observer(AppRouter);