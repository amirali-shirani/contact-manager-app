import {CurrentLine, Cyan, Purple} from "../../helpers/colors";
import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getContact, getGroup} from "../../helpers/contactServices";
import {Spinner} from "../index";
import {ContactContext} from "../../context/contactContext";

const ViewContact = () => {
    const contactId = useParams("id")
    const {loading, setLoading} = useContext(ContactContext)
    const [contact, setContact] = useState({})
    const [group, setGroup] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const {data: contactData} = await getContact(contactId.id)
            console.log(contactData)
            const {data: groupsData} = await getGroup(contactData.groups)
            setContact(contactData)
            setGroup(groupsData)
            setLoading(false)
        }
        fetchData()
    }, []);

    return (
        <>{
            loading ? (<Spinner/>) : (
                <div className="container">
                    <div className="row">
                        <div style={{backgroundColor: CurrentLine}}>
                            <div className="col-12 text-center my-2">
                                <h2 style={{color: Cyan}}>اطلاعات مخاطب</h2>
                                <hr/>
                            </div>
                            <div className="row container align-items-center">
                                <div className="col-md-4 text-center">
                                    <img src={contact.photo} alt="" className="img-fluid rounded"
                                         style={{border: `1px solid ${Purple}`}}/>
                                </div>
                                <div className="col-md-8  my-4">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-dark">نام و نام خانوادگی
                                            : <span>{contact.fullName}</span></li>
                                        <li className="list-group-item list-group-item-dark">شماره موبایل
                                            : <span>{contact.mobile}</span></li>
                                        <li className="list-group-item list-group-item-dark">ایمیل
                                            : <span>{contact.email}</span></li>
                                        <li className="list-group-item list-group-item-dark">شغل
                                            : <span>{contact.job}</span></li>
                                        <li className="list-group-item list-group-item-dark">گروه
                                            : <span>{group.name}</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <div className="text-center mb-3">
                                <Link to="/contacts" style={{backgroundColor: Purple}} className="btn btn-lg">
                                    بازگشت به صفحه اصلی
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ViewContact