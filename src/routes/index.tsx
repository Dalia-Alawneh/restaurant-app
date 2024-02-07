import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/error/ErrorHandler"
import { Dashboard } from "../pages/dashboard";
import { Pos } from "../pages/pos";
import { Transaction } from "../pages/transaction";
import Payment from "../pages/pos/Payment";
import OrderDetails from "../pages/transaction/OrderDetails";
import OrderHistory from "../pages/transaction/OrderHistory";
import DashboardLayout from "../pages/dashboard/Layout";
import Menus from "../pages/dashboard/pages/Menus";
import AuthLayout from "../pages/Auth/Layout";
import { Register } from "../pages/Auth/pages/Register";
import { Login } from "../pages/Auth/pages/Login";
import ClientLayout from "../pages/Client/Layout";
import Protected from "../components/hoc/withProtection";
import Home from "../pages/Client/pages/Home";
import Category from "../pages/Client/pages/Category";
import Cart from "../pages/Client/pages/Cart";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler status={500} title="Server Error" />}>
            <Route index element={<Pos />} />
            <Route path="payment/:orderId" element={<Payment />} />
            <Route path="transaction" element={<Transaction />}>
                <Route index element={<OrderHistory />} />
                <Route path="order/:id" element={<OrderDetails />} />
            </Route>

        </Route>
        <Route path="/dashboard" element={<Protected redirectTo="/admin/auth"><DashboardLayout/></Protected>} errorElement={<ErrorHandler status={500} title="Server Error" />}>
            <Route index element={<Dashboard />} />
            <Route path="menus" element={<Menus />} />
        </Route>
        <Route path="/auth" element={<AuthLayout/>} errorElement={<ErrorHandler status={500} title="Server Error" />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin/auth" element={<AuthLayout/>} errorElement={<ErrorHandler status={500} title="Server Error" />}>
            <Route index element={<Login />} />
        </Route>
        <Route path="/home" element={<ClientLayout />} errorElement={<ErrorHandler status={500} title="Server Error" />}>
            <Route index element={<Home />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<ErrorHandler status={404} title="Page Not Found!" />} />
    </>

))

export default router