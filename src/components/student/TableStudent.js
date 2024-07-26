import React, { useState, useEffect } from "react";
import axios from "../../localhost/Custumize-axios";
import { Link, useNavigate } from "react-router-dom";

export default function TableStudent() {
  // const [students, setStudents] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    students: [],
    loading: true,
  });
  const changeLink = useNavigate();
  useEffect(() => {
    axios
      .get("students.json")
      .then((res) => {
        //lấy ra key của các đổi tượng res.data
        //Tạo mảng mới cung cấp trên từng phần tử mảng cũ
        const studentArrays = Object.keys(res.data).map((key) => ({
          id: key, //Gán key thành id
          ...res.data[key], //copy đối tượng cũ vào đối tượng mới
        }));
        //đặt dữ liệu cho mảng rỗng students
        setState({
          students : studentArrays,
          loading : false,
        })
        console.log(studentArrays);
      })
      .catch((error) => {
        console.error(error);
        setState({
          loading : true,
        })
      });
  }, []);
  function handleSubmitDelete(id) {
    const chooseDelet = window.confirm("Are you sure?");
    if (chooseDelet) {
      axios
        .delete(`students/${id}.json`)
        .then((res) => {
          alert("Delete Student Successfull");
          changeLink("/");
        })
        .catch((error) => {
          console.log("Delete Student Fail " + error);
        });
    }
  }
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-sm-between">
          <h1>Table Student</h1>
          <Link to="/create" className="btn btn-primary">
            Add
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Full Name</th>
              <th scope="col">Marks</th>
              <th scope="col">Gender</th>
              <th scope="col">Country</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {state.loading ? (
              <p>Loading...</p>
            ) : (
              state.students.map((st, index) => (
                <tr key={index}>
                  <th scope="row">{st.email}</th>
                  <td>{st.fullName}</td>
                  <td>{st.marks}</td>
                  <td>{st.gender ? "Male" : "Female"}</td>
                  <td>{st.country}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary"
                      to={`/update/${st.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger mx-2"
                      onClick={(e) => handleSubmitDelete(st.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
