import withWrapper from "../../../components/hoc/withWrapper"
import BreadCrumb from "../../../components/ui/BreadCrumb"

interface IProps {
    
}
const Menus = withWrapper(({}: IProps) => {
    return (
        <div className="mt-24">
            <BreadCrumb homePath="/dashboard" page="Menus"/>

        </div>
    )
})

export default Menus