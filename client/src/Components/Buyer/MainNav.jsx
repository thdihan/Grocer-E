import NavItems from "./NavItems";

export default function MainNav() {
    return (
        <nav className="navbar navbar-expand-lg p-0">
            <div className="container-fluid p-0">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <NavItems
                        items={["Home", "New Products", "All Categories"]}
                    />
                </div>
            </div>
        </nav>
    );
}