import { DollarSignIcon, Home, User2Icon, UserCircleIcon } from "lucide-react"
import withWrapper from "../../components/hoc/withWrapper"
import UserInfo from "./components/UserInfo"
import { Chart } from "./components/Chart"
import AnalysisItem from "./components/AnalysisItem"
import ItemWrapper from "./components/ItemWrapper"

const Dashboard = withWrapper(() => {
    return (
        <div className="pt-8 ms-16">
            <UserInfo name="Dalia Aalwneh" />
            <div className="mt-16 px-4">
                <h2>Your Home Value</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                    <AnalysisItem title="Customers Today" value="350" icon={<Home size={30} />} />
                    <AnalysisItem title="Customers Today" value="350" icon={<User2Icon size={30} />} />
                    <AnalysisItem title="Total Revenu Today  " value="$2000.00" icon={<DollarSignIcon size={30} />} />
                    <AnalysisItem title="Employee" value="20" icon={<UserCircleIcon size={30} />} />

                </div>
                <ItemWrapper>
                    <Chart />
                </ItemWrapper>
            </div>
        </div>
    )
})

export default Dashboard