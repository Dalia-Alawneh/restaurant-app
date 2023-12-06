import withWrapper from "../../components/hoc/withWrapper"
import BreadCrumb from "../../components/ui/BreadCrumb"

const Payment = withWrapper(() => {
    return (
        <div className="mt-24 border-b pb-4">
            <BreadCrumb page="Payment" />

        </div>
    )
}
)
export default Payment