import { Form } from "antd";
import React from "react";
import Loading from "../../components/LoadingComponent/Loading";

import {
  Lable,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperItemOrder,
  WrapperItemOrderInfo,
} from "./style";

import { useLocation } from "react-router-dom";
import { orderContent } from "../../content";
import { convertPrice } from "../../utils";

const OrderSuccess = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <Loading isPending={false}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h3 style={{ fontWeight: "bold" }}>Đơn hàng đặt thành công</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>

                  <WrapperValue>
                    <span style={{ color: "#ea8500", fontWeight: "bold" }} >
                      {orderContent.delivery[state?.delivery].split(":")[0]}:
                    </span>
                    <span>
                    {orderContent.delivery[state?.delivery].split(":")[1]}
                    </span>
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>
                  <WrapperValue>
                    {orderContent.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state?.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name}>
                      <div
                        style={{
                          width: "390px",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <img
                          src={order?.image}
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                          alt="imageProductSmall"
                        />
                        <div
                          style={{
                            width: 260,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                      >
                        <span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 500,
                            }}
                          >
                            {" "}
                            Giá tiền: {convertPrice(order?.price)}{" "}
                          </span>
                        </span>
                        <span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 500,
                            }}
                          >
                            Số lượng: {order?.amount}
                          </span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperItemOrderInfo>
              <div>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "red",
                  }}
                >
                  Tổng tiền: {convertPrice(state?.totalPriceMemo)}
                </span>
              </div>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSuccess;
