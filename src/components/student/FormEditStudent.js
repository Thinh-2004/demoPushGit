import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../localhost/Custumize-axios";

export default function FormEditStudent() {
  const { id } = useParams();
  const changeLink = useNavigate();
  console.log("ID: " + id);
  const [formEdit, setFormEdit] = useState([]);
  useEffect(() => {
    axios
      .get(`students/${id}.json`)
      .then((res) => {
        console.log(res.data);
        setFormEdit(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormEdit({
      ...formEdit,
      [name]: value,
    });

    // Nếu là input radio
    if (type === "radio") {
      setFormEdit({
        ...formEdit,
        [name]: value === "true", // Chuyển đổi giá trị từ chuỗi "true" thành boolean true
      });
    } else {
      // Nếu là input khác
      setFormEdit({
        ...formEdit,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  function handleSubmitUpdate(e) {
    e.preventDefault();
    axios
      .put(`students/${id}.json`, formEdit)
      .then((res) => {
        alert("Update Student Successful");
        changeLink("/");
      })
      .catch((error) => {
        console.log("Update Student fail: " + error);
      });
  }

  return (
    <div>
      <div className="offset-3 col-6">
        <form onSubmit={handleSubmitUpdate}>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Email"
            name="email"
            value={formEdit.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Full Name"
            name="fullName"
            value={formEdit.fullName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Marks"
            name="marks"
            value={formEdit.marks}
            onChange={handleInputChange}
          />
          <div class="form-check form-check-inline mt-3">
            <input
              class="form-check-input "
              type="radio"
              name="gender"
              id="inlineRadio1"
              value="true"
              checked={formEdit.gender === true}
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
              checked={formEdit.gender === false}
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
            value={formEdit.country}
            onChange={handleInputChange}
          >
            <option selected>Vui lòng chọn</option>
            <option value="VN">Việt Nam</option>
            <option value="US">Unit State</option>
          </select>
          <div className="mt-3">
            <button type="submit" className="btn btn-outline-primary mx-2">
              Update
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
