import './App.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Contacts, CreateContact, EditContact, Navbar, ViewContact} from "../src/components/index"
import {useEffect} from "react";
import {createContact, getAllContacts, getAllGroups, removeContact} from "./helpers/contactServices";
import {CurrentLine, Purple, Red} from "./helpers/colors";
import {confirmAlert} from "react-confirm-alert"
import {ContactContext} from "./context/contactContext";
import _ from "lodash";
import {useImmer} from "use-immer";
import {ToastContainer, toast} from 'react-toastify';


function App() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);
    const [loading, setLoading] = useImmer(false);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data: contactData} = await getAllContacts()
                const {data: groupsData} = await getAllGroups()
                setContacts(contactData)
                setFilteredContacts(contactData)
                setGroups(groupsData)
                setLoading(false)
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        fetchData()
    }, [])
    const createContactForm = async (values) => {
        ;
        try {
            setLoading(true)
            const {status, data} = await createContact(values)
            if (status === 201) {
                setLoading(true)
                setContacts(draft => {
                    draft.push(data)
                })
                setFilteredContacts(draft => {
                    draft.push(data)
                })
                setLoading(false)
                navigate("/contacts")
                toast.success("کاربر با موفقیت ساخته شد", {icon: "✅"})
            }
        } catch (err) {
            console.log(err.message)
            setLoading(false)
        }

    }
    const confirmDelete = (contactId, contactFullName) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="p-4 card" style={{backgroundColor: CurrentLine, border: `1px solid ${Purple}`}}>
                        <h1>مطمعنی ؟</h1>
                        <p>مطمعن هستی میخوای <b className="mx-1">{contactFullName}</b>کاربر رو پاک کنی</p>
                        <button style={{backgroundColor: Red}} className="btn my-2" onClick={() => {
                            deleteContact(contactId);
                            onClose()
                            toast.success("کاربر با موفقیت حذف شد" , {icon : "👌"})
                        }}>
                            بله پاکش کن !
                        </button>
                        <button style={{backgroundColor: Purple}} className="btn" onClick={onClose}>خیر</button>
                    </div>
                );
            }
        });
    }

    const deleteContact = async (contactId) => {
        const contactsBackup = [...contacts]
        try {
            setContacts(draft =>
                draft.filter(c => c.id !== contactId)
            )
            setFilteredContacts(draft =>
                draft.filter(c => c.id !== contactId)
            )

            const {status} = await removeContact(contactId)

            if (status !== 200) {
                setContacts(contactsBackup)
                setFilteredContacts(contactsBackup)
            }

        } catch (err) {
            console.log(err)
            setLoading(false)
            setContacts(contactsBackup)
            setFilteredContacts(contactsBackup)
        }
    }

    const contactSearch = _.debounce((query) => {
        if (!query) return setFilteredContacts([...contacts])
        setFilteredContacts(draft =>
            draft.filter(c =>
                c.fullName.toLowerCase().includes(query.toLowerCase())
            )
        )
    }, 1000)

    return (
        <ContactContext.Provider value={{
            loading,
            setLoading,
            groups,
            setGroups,
            deleteContact: confirmDelete,
            createContactForm,
            contactSearch,
            filteredContacts,
            setFilteredContacts,
            setContacts,
            contacts,
        }}>
            <ToastContainer rtl={true} theme="light"/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Navigate to="/contacts"/>}/>
                <Route path="/contacts"
                       element={<Contacts/>}/>
                <Route path="/contacts/:id" element={<ViewContact/>}/>
                <Route path="/contacts/edit/:id" element={<EditContact/>}/>
                <Route path="/contacts/CreateContact"
                       element={<CreateContact/>}/>
            </Routes>
        </ContactContext.Provider>
    );
}

export default App;
