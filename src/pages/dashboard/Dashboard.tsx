import { Banknote, DollarSignIcon, UserCircleIcon, UserPlus2 } from "lucide-react"
import withWrapper from "../../components/hoc/withWrapper"
import UserInfo from "./components/UserInfo"
import BarChart from "./components/BarChart"
import AnalysisItem from "./components/AnalysisItem"
import ItemWrapper from "./components/ItemWrapper"
import DoughnutChart from "./components/DoughnutChart"
import MostSelectedFoods from "./components/MostSelectedFoods"
import { useAppSelector } from "../../app/store"
import { IUser } from "../../interfaces"
const Dashboard = withWrapper(() => {
    const loggedInUser: IUser | null = useAppSelector((state) => state.user.user);
    return (
        <div className="pt-20 ms-16 mt-8">
            <UserInfo name={`${loggedInUser?.username}`} />
            <div className="mt-16 px-4">
                <h2>Your Home Value</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                    <AnalysisItem title="Customers Today" textColor="var(--primary)" bgColor="var(--primary-extra-light)" value="350" icon={<UserPlus2 size={30} />} />
                    <AnalysisItem title="Total Gain Today" textColor="var(--sec-color)" bgColor="var(--sec-light1)" value="$3500.00" icon={<Banknote size={30} />} />
                    <AnalysisItem title="Total Revenu Today" bgColor="#a4daa6bd" textColor="#18931c" value="$2000.00" icon={<DollarSignIcon size={30} />} />
                    <AnalysisItem title="Employee" bgColor="#b855cd80" textColor="#941cad" value="20" icon={<UserCircleIcon size={30} />} />

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
                <MostSelectedFoods/>
            </div>
        </div>
    )
})

export default Dashboard