import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./ContactInfo.css";
import { useGetContactByIdQuery } from "../services/contactsApi";

const ContactInfo = () => {
  const { id } = useParams();
  const {data, error, isLoading, isSuccess} = useGetContactByIdQuery(id!)

  useEffect(() => {
    if (error) {
      toast.error("oops.. there is an error");
    }
  }, [error]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{data && data.name}</span>
          <br />
          <br />
          <strong>Email: </strong>
          <span>{data && data.email}</span>
          <br />
          <br />
          <strong>Contact: </strong>
          <span>{data && data.contact}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
