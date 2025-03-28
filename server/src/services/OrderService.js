// nơi xử lý api

const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel")
const EmailService = require("../services/EmailService")

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
      const { orderItems,paymentMethod, deliveryMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone,user, isPaid, paidAt,email } = newOrder
      try {
          const promises = orderItems.map(async (order) => {
              const productData = await Product.findOneAndUpdate(
                  {
                  _id: order.product,
                  countInStock: {$gte: order.amount}
                  },
                  {$inc: {
                      countInStock: -order.amount,
                      selled: +order.amount
                  }},
                  {new: true}
              )
              if(productData) {
                  return {
                      status: 'OK',
                      message: 'SUCCESS'
                  }
              }
               else {
                  return{
                      status: 'OK',
                      message: 'ERR',
                      id: order.product
                  }
              }
          })
          const results = await Promise.all(promises)
          const newData = results && results.filter((item) => item.id)
          if(newData.length) {
              const arrId = []
              newData.forEach((item) => {
                  arrId.push(item.id)
              })
              resolve({
                  status: 'ERR',
                  message: `San pham voi id: ${arrId.join(',')} khong du hang`
              })
          } else {
              const createdOrder = await Order.create({
                  orderItems,
                  shippingAddress: {
                      fullName,
                      address,
                      city, phone
                  },
                  paymentMethod,
                  deliveryMethod,
                  itemsPrice,
                  shippingPrice,
                  totalPrice,
                  user: user,
                  isPaid, paidAt
              })
              if (createdOrder) {
                  await EmailService.sendEmailCreateOrder(email,orderItems)
                  resolve({
                      status: 'OK',
                      message: 'success'
                  })
              }
          }
      } catch (e) {
        console.log(e)
          reject(e)
      }
  })
}

const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      }).sort({createdAt: -1, updatedAt: -1});
      if (order === null) {
        resolve({
          status: "OK",
          message: "Đơn hàng không tìm thấy",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "Đơn hàng không tìm thấy",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const cancelOrderDetails = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = null;
      const promises = data.map(async (item) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: item.product,
            selled: { $gte: item.amount },
          },
          {
            $inc: {
              countInStock: +item.amount,
              selled: -item.amount,
            },
          },
          { new: true }
        );
        if (!productData) {
   
          return {
            status: 'ERR',
            message: `Đơn hàng với id: ${item.product} không tồn tại `,
            id: item.product,
          };
        }
      });

      const results = await Promise.all(promises);


      const errorResult = results.find(result => result && result.status === 'ERR');
      if (errorResult) {
        resolve(errorResult);
        return;
      }

      
      order = await Order.findByIdAndDelete(id);
      if (!order) {
        reject({
          status: 'ERR',
          message: 'Đơn hàng không tìm thấy',
        });
        return;
      }

      resolve({
        status: 'OK',
        message: 'Success',
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
      try {
         const allOrder = await Order.find()
          resolve({
              status: 'OK',
              message: 'Success',
              data: allOrder
          })
          

      } catch(e) {
          reject(e)
      }
  })
}
module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder
};
