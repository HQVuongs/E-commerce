# Dự Án E-commerce

## Giới thiệu

Dự án E-commerce là một ứng dụng web thương mại điện tử được xây dựng bằng Node.js cho backend và React cho frontend. Dự án cung cấp các chức năng cơ bản của một trang thương mại điện tử như quản lý sản phẩm, giỏ hàng, đơn hàng và xác thực người dùng.

## Công nghệ sử dụng

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful API

### Frontend

- React.js
- Redux Toolkit
- Axios
- Ant Design
- React Router

## Các tính năng chính

- 🔐 Xác thực người dùng với JWT
- 👥 Quản lý người dùng (đăng ký, đăng nhập, cập nhật thông tin)
- 🛍️ Quản lý sản phẩm (thêm, sửa, xóa, tìm kiếm)
- 🛒 Giỏ hàng và quản lý đơn hàng
- 👨‍💼 Phân quyền người dùng (Admin/User)
- 🔄 Refresh token tự động
- 🛡️ Bảo mật với HTTP-only cookies

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js (v14 trở lên)
- MongoDB
- npm hoặc yarn

### Cài đặt Backend

```bash
# Di chuyển vào thư mục server
cd server

# Cài đặt dependencies
npm install

# Tạo file .env và cấu hình các biến môi trường
cp .env.example .env

# Chạy server
npm start
```

### Cài đặt Frontend

```bash
# Di chuyển vào thư mục client
cd my-shop

# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm start
```

## Cấu trúc thư mục

```
├── server/                 # Backend
│   ├── src/
│   │   ├── controllers/   # Xử lý logic
│   │   ├── models/        # Schema database
│   │   ├── routes/        # Định tuyến API
│   │   ├── services/      # Business logic
│   │   └── middleware/    # Middleware
│   └── package.json
│
└── my-shop/               # Frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Các trang
    │   ├── redux/         # State management
    │   └── services/      # API services
    └── package.json
```

## API Endpoints

### Authentication

- POST /api/user/signup - Đăng ký tài khoản
- POST /api/user/login - Đăng nhập
- POST /api/user/logout - Đăng xuất
- GET /api/user/refresh-token - Làm mới token

### Products

- GET /api/product - Lấy danh sách sản phẩm
- POST /api/product - Thêm sản phẩm mới
- PUT /api/product/:id - Cập nhật sản phẩm
- DELETE /api/product/:id - Xóa sản phẩm

### Orders

- GET /api/order - Lấy danh sách đơn hàng
- POST /api/order - Tạo đơn hàng mới
- PUT /api/order/:id - Cập nhật trạng thái đơn hàng

## Bảo mật

- Sử dụng JWT cho xác thực
- Refresh token được lưu trong HTTP-only cookies
- Mã hóa mật khẩu với bcrypt
- Phân quyền người dùng (Admin/User)

## Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo một pull request hoặc mở một issue để thảo luận về các thay đổi.

## Tác giả

Ha Quoc Vuong

## Giấy phép

MIT License
