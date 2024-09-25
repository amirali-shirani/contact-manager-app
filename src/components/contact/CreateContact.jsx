import {CurrentLine, Green, Purple} from "../../helpers/colors";
import styles from '../../App.css'
import {Link} from "react-router-dom";
import {Spinner} from "../index";
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";
import {Formik, useFormik, Form, Field, ErrorMessage} from "formik";
import {contactSchema} from "../../validations/contactValidations";

const CreateContact = () => {
    const {groups, loading, createContactForm} = useContext(ContactContext);
    const formik = useFormik({})
    return (<>
        {loading ? <Spinner/> :
            <div className="container">
                <div className="row">
                    <div className="col-12 my-5">
                        <h3 className="text-center" style={{color: Green}}>ساخت مخاطب جدید</h3>
                        <hr/>
                    </div>
                    <div className="col-md-5 col-sm-10">
                        <Formik initialValues={{fullName: "",photo: "",mobile: "",email: "",job: "",groups: ""}}
                                validationSchema={contactSchema}
                                onSubmit={(values) => {
                                    createContactForm(values)
                                }}>
                            <Form className={styles.create__contact}>
                                <Field type="text" name="fullName" className="form-control" placeholder="نام و نام خانوادگی"/>
                                <ErrorMessage className="text-danger py-3" name="fullName">{msg => (<p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                <Field type="text" name="photo" className="form-control" placeholder="آدرس تصویر"/>
                                <ErrorMessage className="text-danger py-3" name="photo">{msg => (<p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                <Field type="text" name="mobile" className="form-control" placeholder="شماره موبایل"/>
                                <ErrorMessage className="text-danger py-3" name="mobile">{msg => (<p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                <Field type="text" name="email" className="form-control"placeholder="آدرس ایمیل"/>
                                <ErrorMessage className="text-danger py-3" name="email">{msg => (<p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                <Field type="text" name="job" className="form-control"placeholder="شغل"/>
                                <ErrorMessage className="text-danger py-3" name="job">{msg => (<p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                <Field name="groups" className="form-control" as="select">
                                    <option>انتخاب گروه</option>
                                    {groups.length > 0 && groups.map(group => (
                                        <option value={group.id} key={group.id}>{group.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="groups">{msg => (<p className="text-danger ">{msg}</p>)}</ErrorMessage>
                                <div className="mb-4 mt-2">
                                    <button type="submit" className="btn mx-2" style={{backgroundColor: Purple}}>ساخت
                                        مخاطب
                                    </button>
                                    <Link to="/contacts" className="btn"
                                          style={{backgroundColor: CurrentLine}}>انصراف</Link>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <div className="col-md-7 col-sm-10">
                        <img src={require('../../assets/images/man-taking-note.png')} className="img-fluid" alt=""/>
                    </div>
                </div>
            </div>
        }
    </>)
}
export default CreateContact