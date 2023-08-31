import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/AddUser.css";
let AddUser = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phoneNo: ""
    })
    const [formErrors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const handleInput = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); //form will not get reload 
        axios.post("http://localhost:3000/users", user)
            .then((response) => {
                setErrors(validate(user));
                setIsSubmit(true);
                navigate("/user");
                //console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(user);
        }
    })
    const validate = (value) => {
        const errors = {}
        // const regex = /^[^\$@]+@[^\$@]+\.[^\$@]{2,}$/i;
        if (!value.firstName) {
            errors.firstName = "First name is required!";
        }
        if (!value.lastName) {
            errors.lastName = "Last name is required!";
        }
        if (!value.phoneNo) {
            errors.phoneNo = "Phone number is required!";
        }
        return errors;
    }
    return (
        <div className='cover' >
            <h1>Add User Details</h1>
            <p>{formErrors.firstName}</p>
            <input type="text" onChange={handleInput} placeholder='enter first name' name='firstName' />
            <p>{formErrors.lastName}</p>
            <input type="text" onChange={handleInput} placeholder='enter last name' name='lastName' />
            <p>{formErrors.phoneNo}</p>
            <input type="tel" onChange={handleInput} placeholder='enter phone number' name='phoneNo' />
            <div className='login-btn' onClick={handleSubmit}>Add User</div>
        </div>
    )
}

export default AddUser;