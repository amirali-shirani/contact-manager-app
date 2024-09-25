import {Pink} from "../../helpers/colors";
import {Link} from "react-router-dom";
import {Contact, Spinner} from "../index";
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";

const Contacts = () => {
    const {filteredContacts, loading} = useContext(ContactContext);
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 mb-4">
                        <Link to="/contacts/CreateContact" className="btn btn-lg" style={{backgroundColor: Pink}}>ساخت
                            مخاطب جدید <i
                                className="fas fa-plus-circle"></i></Link>
                    </div>
                    <div className="row mx-auto">
                        {loading ? <Spinner/> :
                            filteredContacts.length > 0 ? filteredContacts.map(contact => (
                                    <Contact key={contact.id} contact={contact}/>
                                )) :
                                <div className="text-center">
                                    <img src={require('../../assets/images/no-found.gif')}
                                         className="img-fluid w-25 mt-5"
                                         alt=""/>
                                    <h1 className="mt-3">NOT FOUND</h1>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contacts