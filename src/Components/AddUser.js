import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/AddUser.scss';

const AddUser = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phoneNo: ''
    })

    const navigate = useNavigate();
    const handleInput = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/users', user)
            .then((response) => {
                navigate('/user');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='cover' >
            <h1>Add User Details</h1>
            <input type='text' onChange={handleInput} placeholder='enter first name' name='firstName' />
            <input type='text' onChange={handleInput} placeholder='enter last name' name='lastName' />
            <input type='tel' onChange={handleInput} placeholder='enter phone number' name='phoneNo' />
            <div className='login-btn' onClick={handleSubmit}>Add User</div>
        </div>
    );
};

export default AddUser;
