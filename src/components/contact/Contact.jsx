import {CurrentLine, Cyan, Orange, Purple, Red} from "../../helpers/colors";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";


const Contact = ({contact}) => {
    const {deleteContact} = useContext(ContactContext);
    return (
        <>
            <div className="col-md-6 col-sm-10 mx-auto col-sm-10 my-2">
                <div className="card " style={{backgroundColor: CurrentLine}}>
                    <div className="card-body d-flex flex-row justify-content-center align-items-center">
                        <div className="col-md-4 col-sm-4">
                            <div className="">
                                <img src={contact.photo ? contact.photo : "https://placehold.co/400"}
                                     className="card-img rounded"
                                     alt="" style={{border: `1px solid ${Purple}`}}/>
                                </div>
                        </div>
                        <div className="col-sm-7 ms-2">
                            <div style={{backgroundColor: CurrentLine}}>
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-dark">نام و نام خانوادگی
                                        : <b>{contact.fullName}</b></li>
                                    <li className="list-group-item list-group-item-dark">شماره موبایل
                                        : <b>{contact.mobile}</b></li>
                                    <li className="list-group-item list-group-item-dark">ایمیل
                                        : <b>{contact.email}</b></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <div className="d-flex flex-column align-items-center">
                                <Link to={`/contacts/${contact.id}`} className="btn mb-2"
                                      style={{backgroundColor: Orange}}><i
                                    className="fa fa-eye"></i></Link>
                                <Link to={`/contacts/edit/${contact.id}`} className="btn mb-2"
                                      style={{backgroundColor: Cyan}}><i
                                    className="fa fa-pen"></i></Link>
                                <button onClick={() => deleteContact(contact.id, contact.fullName)} className="btn mb-2"
                                        style={{backgroundColor: Red}}><i
                                    className="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact