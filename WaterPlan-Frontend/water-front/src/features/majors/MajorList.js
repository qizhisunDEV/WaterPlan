import { useGetMajorsQuery } from "./majorsApiSlice"
import Major from "./Major"

const MajorList = () => {
  
  const {
    data: majors,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetMajorsQuery()

let content

if (isLoading) content = <p>Loading...</p>

if (isError) {
    content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
}

if (isSuccess) {

    const { ids } = majors

    const tableContent = ids?.length
        ? ids.map(majorId => <Major key={majorId} majorId={majorId} />) : null
    
    content = (
        <table className="table table--majors">
            <thead className="table__thead">
                <tr className="table__row">
                    <th scope="col" className="table__th major__title">Username</th>
                    <th scope="col" className="table__th major__status">Year</th>
                    <th scope="col" className="table__th major__status">OAV</th>
                    <th scope="col" className="table__th major__status">MAV</th>
                    <th scope="col" className="table__th major__status">MathCredits</th>
                    <th scope="col" className="table__th major__status">OtherCredits</th>
                    <th scope="col" className="table__th major__status">Courses</th>
                    <th scope="col" className="table__th major__edit">Edit</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
    )
}

return content
}

export default MajorList
