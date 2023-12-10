import { Outlet } from "react-router-dom"
import withWrapper from "../../components/hoc/withWrapper"


const Transaction = withWrapper(() => {
    
    return (
        <div className="mt-24 pt-8 ">
            <Outlet/>
        </div>
    )
})

export default Transaction