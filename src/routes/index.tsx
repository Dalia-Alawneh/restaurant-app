import { createBrowserRouter,createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/error/ErrorHandler"
import { Dashboard } from "../pages/dashboard";
import { Pos } from "../pages/pos";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Pos/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
        </Route>
        <Route path="*" element={<ErrorHandler status={404} title="Page Not Found!"/>}/>
    </>

))

export default router