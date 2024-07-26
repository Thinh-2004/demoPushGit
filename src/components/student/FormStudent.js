import React, { useState, useEffect } from "react";
import axios from "../../localhost/Custumize-axios";
import { Link, useNavigate } from "react-router-dom";

export default function FormStudent() {
  //State để lưu dữ liệu của form
  const [formStudent, setFormStudent] = useState({
    email: "",
    fullName: "",
    marks: "",
    gender: false,
    country: "",
  });
  const [state, setState] = useState({
    formStudent : {
      email: "",
      fullName: "",
      marks: "",
      gender: false,
      country: "",
    },
  });
  //Change link
  const changeLink = useNavigate();
  //Hàm xử lí khi ng dùng thay đổi dữ liệu trong input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Nếu là input radio
    if (type === "radio") {
      setFormStudent({
        ...formStudent,
        [name]: value === "true", // Chuyển đổi giá trị từ chuỗi "true" thành boolean true
      });
    } else {
      // Nếu là input khác
      setFormStudent({
        ...formStudent,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  //Hàm xử lí khi người dùng submit
  function handleSubmit(e) {
    e.preventDefault(); //Ngắn chặn hành độngd mặc định của form
    //Xử lí API
    axios
      .post("students.json", formStudent)
      .then((res) => {
        console.log("Add Student: " + res.data);
        alert("Add Student Successfully");
        changeLink('/');
        // //Đặt giá trị cho form khi thêm thành công
        // setFormStudent({
        //   email: "",
        //   fullName: "",
        //   marks: "",
        //   gender: "",
        //   country: "",
        // });
      })
      .catch((error) => {
        alert("Add Student Fail");
        console.log("Error add student: " + error);
      });
  }
  return (
    <div>
      <div className="offset-3 col-6">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Email"
            name="email"
            value={formStudent.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Full Name"
            name="fullName"
            value={formStudent.fullName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Marks"
            name="marks"
            value={formStudent.marks}
            onChange={handleInputChange}
          />
          <div class="form-check form-check-inline mt-3">
            <input
              class="form-check-input "
              type="radio"
              name="gender"
              id="inlineRadio1"
              value="true"
              checked={formStudent.gender === true}
              onChange={handleInputChange}
            />
            <label class="form-check-label" for="inlineRadio1">
              Male
            </label>
          </div>
          <div class="form-check form-check-inline mt-3">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio2"
              value="false"
              checked={formStudent.gender === false}
              onChange={handleInputChange}
            />
            <label class="form-check-label" for="inlineRadio2">
              Female
            </label>
          </div>
          <select
            class="form-select mt-3"
            aria-label="Default select example "
            name="country"
            value={formStudent.country}
            onChange={handleInputChange}
          >
            <option selected>Vui lòng chọn</option>
            <option value="VN">Việt Nam</option>
            <option value="US">Unit State</option>
          </select>
          <div className="mt-3">
            <button type="submit" className="btn btn-outline-success mx-2">
              Create
            </button>
            <button
              type="button"
              className="btn btn-outline-warning mx-2"
              onClick={() =>
                setFormStudent({
                  email: "",
                  fullName: "",
                  marks: "",
                  gender: null,
                  country: "",
                })
              }
            >
              Reset
            </button>
            <Link type="submit" className="btn btn-outline-secondary mx-2" to={'/'}>
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
