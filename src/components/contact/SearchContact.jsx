import {CurrentLine, Purple} from "../../helpers/colors";
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";

const SearchContact = () => {
    const {contactSearch} = useContext(ContactContext);
    return (
        <>
            <div className="col-md-6 mt-sm-3">
                <form className="form-check-inline d-flex">
                    <input onChange={e => contactSearch(e.target.value)}  className="form-control" style={{backgroundColor: CurrentLine}} placeholder="جستجوی مخاطب"
                           type="text" name="search"/>
                    <span className="btn" style={{backgroundColor: Purple}}><i className="fa fa-search"></i></span>
                </form>
            </div>
        </>
    )
}
export default SearchContact