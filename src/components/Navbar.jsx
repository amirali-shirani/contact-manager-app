import {Background, Purple} from "../helpers/colors";
import {SearchContact} from "./index"
import {useLocation} from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    return (
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg" style={{backgroundColor: Background}}>
                    <div className="col-md-12 d-flex container row">
                        <div className="col-md-6">
                            <div className="mx-2 d-flex">
                                <span style={{color: Purple}}><i className="fas fa-id-badge"></i></span>
                                <h6 className="ms-2">وب اپلیکیشن مدیریت <span style={{color: Purple}}>مخاطبین</span>
                                </h6>
                            </div>
                        </div>
                        {
                            location.pathname === "/contacts" ? <SearchContact/> : null
                        }
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default Navbar