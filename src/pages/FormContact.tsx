import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  useCreateContactMutation,
  useGetContactByIdQuery,
  useUpdateContactMutation,
} from "../services/contactsApi";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [addContact] = useCreateContactMutation();
  const { name, email, contact } = formValue;
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetContactByIdQuery(id!);
  const [updatedContact] = useUpdateContactMutation();


  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id, data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      alert("please complete field data");
      return false;
    } else {
      if (!editMode) {
        await addContact(formValue);
        navigate("/");
        toast.success("Contact Added Successfully");
      } else {
        await updatedContact(formValue);
        navigate("/");
        setEditMode(false);
        toast.success("Contact Updated Successfully");
      }
    }
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div className="container-sm pt-5">
      <h2>{id?"Update Contact" : "Add Contact" }</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group text-start">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name..."
            value={name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-3 text-start">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email..."
            value={email || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-3 text-start">
          <label htmlFor="">Nomor Telepon/HP</label>
          <input
            type="number"
            className="form-control"
            id="contact"
            name="contact"
            placeholder="Contact Number. ..."
            value={contact || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-success w-100 mt-3">
            {id ? "Update" : "Save"}
          </button>
          <Link to="/">
            <button type="button" className="btn btn-light w-100 mt-3">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddEditUser;
