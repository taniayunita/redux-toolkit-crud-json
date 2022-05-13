import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as MdIcon from "react-icons/md";
import * as FaIcon from "react-icons/fa";
import * as AiIcon from "react-icons/ai";

import {
  useGetAllContactQuery,
  useDeleteContactMutation,
} from "../services/contactsApi";

const ListContacts = () => {
  const { data, error } = useGetAllContactQuery();
  const [deleteContact] = useDeleteContactMutation();
  useEffect(() => {
    if (error) {
      toast.error("oops.. there is an error");
    }
  }, [error]);

  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure that you wanted to delete this contact ?")) {
      await deleteContact(id);
      toast.success("Contact Deleted Successfully");
    }
  };
  return (
    <div className="container-md pt-4">
      <h2>Data Contact Number</h2>
      <Link to="/add-contact">
        <div className="pb-2">
          <button type="button" className="btn btn-success">
            <span>
              <AiIcon.AiOutlinePlus
                style={{ fontSize: "1.5rem", paddingBottom: "0.5px" }}
              />
            </span>
            Add Contact
          </button>
        </div>
      </Link>
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                No
              </th>
              <th scope="col" className="text-center">
                Nama
              </th>
              <th scope="col" className="text-center">
                Email
              </th>
              <th scope="col" className="text-center">
                No Telepon/HP
              </th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-start">
            {data && data.length > 0 ?
              data.map((contact: any, index: any) => {
                return (
                  <tr key={index}>
                    <th scope="row" >{index + 1}</th>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.contact}</td>
                    <td>
                      <div className="d-flex">
                        <Link to={`/update-contact/${contact.id}`}>
                          <button
                            type="button"
                            className="btn btn-primary me-2"
                          >
                            <span>
                              <FaIcon.FaEdit
                                style={{
                                  fontSize: "1rem",
                                  paddingBottom: "3px",
                                }}
                              />
                            </span>
                            edit
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(contact.id)}
                        >
                          <span>
                            <MdIcon.MdDelete
                              style={{
                                fontSize: "1.2rem",
                                paddingBottom: "0.8px",
                              }}
                            />
                          </span>
                          delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }) : <tr>
                <td className="text-center" colSpan={5}>you have no contact yet...</td>
                </tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListContacts;
