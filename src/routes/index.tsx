import { createBrowserRouter,createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/error/ErrorHandler"
import { Dashboard } from "../pages/dashboard";
import { Pos } from "../pages/pos";
import { Transaction } from "../pages/transaction";
import Payment from "../pages/pos/Payment";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Pos/>}/>
            <Route path="payment" element={<Payment/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="transaction" element={<Transaction/>}/>
        </Route>
        <Route path="*" element={<ErrorHandler status={404} title="Page Not Found!"/>}/>
    </>

))

export default router