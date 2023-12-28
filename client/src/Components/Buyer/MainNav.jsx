import NavItems from "./NavItems";

export default function MainNav() {
    return (
        <div className="row">
            <nav className="col-12 px-2 py-2 navbar navbar-expand-lg p-0">
                <div className="container-fluid p-0">
                    <button
                        className="navbar-toggler py-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse  navbar-collapse" id="navbarNav">
                        <NavItems
                            items={[
                                { text: "Home", to: "/" },
                                { text: "New Products", to: "/" },
                                {
                                    text: "All Categories",
                                    to: "/all-categories",
                                },
                            ]}
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
}
