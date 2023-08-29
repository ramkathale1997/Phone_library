import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/GetUser.css";
import { useNavigate } from 'react-router-dom';

function GetUser() {
    const [users, setUser] = useState([]);
    const [search, setUserSearch] = useState("");
    const navigate = useNavigate();

    const getUserDetails = () => {
        axios.get("http://localhost:3000/users")
            .then((response) => {
                console.log(response);
                setUser(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getUserDetails();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/users/${id}`)
            .then((response) => {
                console.log(response);
                navigate("/user");
            });
    };

    return (
        <div>
            <input className="search" onChange={(e) => setUserSearch(e.target.value)}
                type='text' placeholder='Search first name'></input>
            <div className='cover'>
                <h1 className='heading'>Add User Details</h1>
                <Link className="link" to={"addUser"}>Add User</Link> <br></br>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.filter((user) => {
                                return search.toLowerCase() === "" ? user : user.firstName.toLowerCase().includes(search);
                            }).map((user) => {
                                return <tr>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phoneNo}</td>
                                    <td><button onClick={() => handleDelete(user.id)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GetUser
