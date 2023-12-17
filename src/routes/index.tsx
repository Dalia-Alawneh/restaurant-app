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

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler status={500} title="Server Error" />}>
            <Route index element={<Pos />} />
            <Route path="payment" element={<Payment />} />
            <Route path="transaction" element={<Transaction />}>
                <Route index element={<OrderHistory />} />
                <Route path="order/:id" element={<OrderDetails />} />
            </Route>
            
        </Route>
        <Route path="/dashboard" element={<DashboardLayout/>} errorElement={<ErrorHandler status={500} title="Server Error" />}>
            <Route index element={<Dashboard/>}/>
            <Route path="menus" element={<Menus/>}/>
        </Route>
        <Route path="/auth" element={<AuthLayout/>} errorElement={<ErrorHandler status={500} title="Server Error" />}>
        <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<ErrorHandler status={404} title="Page Not Found!" />} />
    </>

))

export default router