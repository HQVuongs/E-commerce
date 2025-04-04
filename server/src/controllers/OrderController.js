const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try { 
        const { paymentMethod, itemsPrice, totalPrice, fullName, address, city, phone, deliveryMethod } = req.body
        if (!paymentMethod || !itemsPrice ||!totalPrice || !fullName || !address || !city || !phone || !deliveryMethod) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập thông tin'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {

        return res.status(404).json({
            message: e
        })
    }
}
const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy người dùng'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    }catch(e){ 
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if(!orderId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìn thấy đơn hàng'
            })
        }
        const response = await OrderService.getDetailsOrder(orderId)
        return res.status(200).json(response)
    }catch(e){ 
        return res.status(404).json({
            message: e
        })
    }
}
const cancelOrderDetails = async (req, res) => {
    try {
        const data= req.body.orderItems
        const orderId= req.body.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìn thấy đơn hàng'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder
}