import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">WaterPlan</span></h1>
            </header>
            <main className="public__main">
                <p>WaterPlan is a web application that allows University of Waterloo students to create water-proof plans for their future</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}

export default Public
