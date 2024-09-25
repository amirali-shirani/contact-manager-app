import {useContext, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Spinner} from "../index";
import {CurrentLine, Orange, Purple,} from "../../helpers/colors";
import {editContact, getContact} from "../../helpers/contactServices";
import {ContactContext} from "../../context/contactContext";
import {contactSchema} from "../../validations/contactValidations";
import {ErrorMessage, Field, Form, Formik} from "formik";
import styles from "../../App.css";
import {useImmer} from "use-immer";
import {toast} from "react-toastify";

const EditContact = () => {
    const {groups, loading, setContacts, setLoading, setFilteredContacts} = useContext(ContactContext);

    const contactId = useParams("id")
    const [contact, setContact] = useImmer({})
    const navigate = useNavigate();
    useEffect(() => {
        try {
            const fetchData = async () => {
                setLoading(true)
                const {data: contactData} = await getContact(contactId.id)
                setContact(contactData)
                setLoading(false)
            }
            fetchData()
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }, []);
    const onSubmitForm = async (values) => {
        try {
            const {status, data} = await editContact(contactId.id, values)
            if (status === 200) {
                setLoading(true)
                setContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === contactId.id)
                    draft[contactIndex] = {...data}
                })
                setFilteredContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === contactId.id)
                    draft[contactIndex] = {...data}
                })
                toast.info("کاربر با موفقیت ویرایش شد", {icon : "👍"})

                navigate("/contacts")
                setLoading(false)
            }
        }catch (err) {
            console.log(err.message)
            setLoading(false)
        }
    }
    return (
        <>
            {
                loading ? (
                    <Spinner/>
                ) : (<>
                    <section>
                        <div className="col-12 text-center  my-5">
                            <h2 style={{color: Orange}}>ویرایش مخاطب</h2>
                            <hr/>
                        </div>
                    </section>
                    <section>
                        <div className="container p-5 align-items-center ">
                            <div className="row"
                                 style={{backgroundColor: CurrentLine}}>
                                <div className="col-md-8 col-sm-10 ">
                                    <Formik initialValues={{
                                        fullName: contact.fullName,
                                        photo: contact.photo,
                                        mobile: contact.mobile,
                                        email: contact.email,
                                        job: contact.job,
                                        groups: contact.groups
                                    }}
                                            validationSchema={contactSchema}
                                            onSubmit={values => {
                                                onSubmitForm(values)
                                            }}>
                                        <Form className={styles.create__contact}>
                                            <Field type="text" name="fullName" className="form-control"
                                                   placeholder="نام و نام خانوادگی"/>
                                            <ErrorMessage className="text-danger py-3" name="fullName">{msg => (
                                                <p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                            <Field type="text" name="photo" className="form-control"
                                                   placeholder="آدرس تصویر"/>
                                            <ErrorMessage className="text-danger py-3" name="photo">{msg => (
                                                <p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                            <Field type="text" name="mobile" className="form-control"
                                                   placeholder="شماره موبایل"/>
                                            <ErrorMessage className="text-danger py-3" name="mobile">{msg => (
                                                <p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                            <Field type="text" name="email" className="form-control"
                                                   placeholder="آدرس ایمیل"/>
                                            <ErrorMessage className="text-danger py-3" name="email">{msg => (
                                                <p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                            <Field type="text" name="job" className="form-control" placeholder="شغل"/>
                                            <ErrorMessage className="text-danger py-3" name="job">{msg => (
                                                <p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                            <Field name="groups" className="form-control" as="select">
                                                <option>انتخاب گروه</option>
                                                {groups.length > 0 && groups.map(group => (
                                                    <option value={group.id} key={group.id}>{group.name}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="groups">{msg => (
                                                <p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                            <div className="mb-4 mt-2">
                                                <button type="submit" className="btn mx-2"
                                                        style={{backgroundColor: Purple}}>
                                                    ویرایش مخاطب
                                                </button>
                                                <Link to="/contacts" className="btn"
                                                      style={{backgroundColor: CurrentLine}}>انصراف</Link>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                                <div className="col-md-4 col-sm-10 ">
                                    <div className="my-3 text-center">
                                        <img src={contact.photo} alt={contact.fullName} className="img-fluid rounded"
                                             style={{border: `1px solid ${Purple}`}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src={require("../../assets/images/man-taking-note.png")} alt=""/>
                                </div>
                            </div>
                        </div>
                    </section>
                </>)
            }
        </>
    )
}
export default EditContact