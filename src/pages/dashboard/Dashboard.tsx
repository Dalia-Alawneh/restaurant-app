import { DollarSignIcon, Home, User2Icon, UserCircleIcon } from "lucide-react"
import withWrapper from "../../components/hoc/withWrapper"
import UserInfo from "./components/UserInfo"
import BarChart from "./components/BarChart"
import AnalysisItem from "./components/AnalysisItem"
import ItemWrapper from "./components/ItemWrapper"
import DoughnutChart from "./components/DoughnutChart"

const Dashboard = withWrapper(() => {
    return (
        <div className="pt-20 ms-16 mt-8">
            <UserInfo name="Dalia Alawneh" />
            <div className="mt-16 px-4">
                <h2>Your Home Value</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                    <AnalysisItem title="Customers Today" value="350" icon={<Home size={30} />} />
                    <AnalysisItem title="Customers Today" value="350" icon={<User2Icon size={30} />} />
                    <AnalysisItem title="Total Revenu Today  " value="$2000.00" icon={<DollarSignIcon size={30} />} />
                    <AnalysisItem title="Employee" value="20" icon={<UserCircleIcon size={30} />} />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <ItemWrapper>
                        <h3 className="font-semibold text-lg">Sales Statistics</h3>
                        <p className="text-gray-500 text-sm my-4">Comparason between total Gain and Revenue among this year</p>
                        <BarChart />
                    </ItemWrapper>
                    <ItemWrapper>
                        <h3 className="font-semibold text-lg">Categories Statistics</h3>
                        <p className="text-gray-500 text-sm my-4">Number of Sales fore each Category</p>
                        <div className="flex justify-center">
                            <div className="w-1/2">
                                <DoughnutChart />
                            </div>
                        </div>
                    </ItemWrapper>
                </div>
            </div>
        </div>
    )
})

export default Dashboard