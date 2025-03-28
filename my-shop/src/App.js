import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "./redux/slides/userSlide";
import Loading from "./components/LoadingComponent/Loading";

function App() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsPending(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
    setIsPending(false);
  }, []);

  // VD 30

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };
  // const handleDecoded = () => {
  //   let storageData = user?.access_token || localStorage.getItem('access_token')
  //   let decoded = {}
  //   if (storageData && isJsonString(storageData) && !user?.access_token) {
  //     storageData = JSON.parse(storageData)
  //     decoded = jwtDecode(storageData)
  //   }
  //   return { decoded, storageData }
  // }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  });
  // UserService.axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     // Do something before request is sent
  //     const currentTime = new Date();
  //     const { decoded } = handleDecoded();
  //     let storageRefreshToken = localStorage.getItem("refresh_token");
  //     const refreshToken = JSON.parse(storageRefreshToken);
  //     const decodedRefreshToken = jwtDecode(refreshToken);
  //     if (decoded?.exp < currentTime.getTime() / 1000) {
  //       if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
  //         const data = await UserService.refreshToken(refreshToken);
  //         config.headers["token"] = `Bearer ${data?.access_token}`;
  //       } else {
  //         dispatch(resetUser());
  //       }
  //     }
  //     return config;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );

  const handleGetDetailUser = async(id, token) => {
    try {
      const res = await UserService.getDetailUser(id, token)
      dispatch(updateUser({...res?.data, access_token: token}))
    } catch (err) {
      console.error("Error fetching user details", err)
    }

  }

  // const handleGetDetailUser = async (id, token) => {
  //   let storageRefreshToken = localStorage.getItem("refresh_token");
  //   const refreshToken = JSON.parse(storageRefreshToken);
  //   const res = await UserService.getDetailUser(id, token);
  //   dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  // };

  return (
    <div>
      <Loading isPending={isPending}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin;
              // doan nay khi la neu isShowHeader la true thi sẽ hiện ra các thành phần có trong Default, ngược lại thì sẽ là fragment
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={isCheckAuth ? route.path : undefined}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}

export default App;
