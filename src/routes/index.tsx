import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/error/ErrorHandler"
import { Dashboard } from "../pages/dashboard";
import { Pos } from "../pages/pos";
import { Transaction } from "../pages/transaction";
import Payment from "../pages/pos/Payment";
import OrderDetails from "../pages/transaction/OrderDetails";
import OrderHistory from "../pages/transaction/OrderHistory";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler status={500} title="Server Error" />}>
            <Route index element={<Pos />} />
            <Route path="payment" element={<Payment />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transaction" element={<Transaction />}>
                <Route index element={<OrderHistory />} />
                <Route path="order/:id" element={<OrderDetails />} />
            </Route>
        </Route>
        {/* <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<Dashboard/>}/>
        </Route> */}
        <Route path="*" element={<ErrorHandler status={404} title="Page Not Found!" />} />
    </>

))

export default router