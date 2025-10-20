import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./router/AppRouter";
import { observer } from "mobx-react-lite";

const App = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token") && !store.isAuth) {
      store.checkAuth();
    } else {
      store.setLoading(false);
    }
  }, []);

  if (store.isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default observer(App);
