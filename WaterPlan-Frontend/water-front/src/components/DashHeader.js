import { Link } from 'react-router-dom'

const DashHeader = () => {
  return (
    <header className="dash-header">
        <div className="dash-header__container">
            <Link to="/dash">
                <h1 className="dash-header__title">majors</h1>
            </Link>
            <nav className="dash-header__nav">
                {/* add later */}
            </nav>
        </div>
    </header>
  )
}

export default DashHeader
