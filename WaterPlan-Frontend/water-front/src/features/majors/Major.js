import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { selectMajorById } from "./majorsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Major = ({ majorId }) => {
    const major = useSelector(state => selectMajorById(state, majorId))

    const navigate = useNavigate()

    if (major) {
        const handleEdit = () => navigate(`/dash/majors/${majorId}`)

        return (
            <tr className="table__row">
                <td className={`table__cell major__title`}>{major.name}</td>
                <td className={`table__cell major__status`}>{major.year}</td>
                <td className={`table__cell major__status`}>{major.oav}</td>
                <td className={`table__cell major__status`}>{major.mav}</td>
                <td className={`table__cell major__status`}>{major.mathCredits}</td>
                <td className={`table__cell major__status`}>{major.otherCredits}</td>
                <td className={`table__cell major__status`}>{major.mathCredits}</td>
                <td className={`table__cell major__username`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else return null

}

export default Major
