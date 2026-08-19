import React, { useState } from 'react';
import './RegisterPage.css';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Task 4: state untuk error message
    const [showerr, setShowerr] = useState('');

    // Task 5: navigate dan setIsLoggedIn
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    const handleRegister = async () => {
        try {
            const response = await fetch(
                `${urlConfig.backendUrl}/api/auth/register`,
                {
                    // Task 6
                    method: 'POST',

                    // Task 7
                    headers: {
                        'content-type': 'application/json',
                    },

                    // Task 8
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    })
                }
            );

            // Task 1: Access data from backend
            const json = await response.json();

            // Task 2: Set user details
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);

                // Task 3: Set logged in state
                setIsLoggedIn(true);

                // Task 4: Navigate to MainPage
                navigate('/app');
            }

            // Task 5: Handle registration error
            if (json.error) {
                setShowerr(json.error);
            }

        } catch (e) {
            console.log("Error fetching details: " + e.message);
            setShowerr("Error registering user");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">

                        <h2 className="text-center mb-4 font-weight-bold">
                            Register
                        </h2>

                        {/* Task 6: Display error message */}
                        {showerr && (
                            <div className="text-danger mb-3">
                                {showerr}
                            </div>
                        )}

                        <div className="mb-4">
                            <label
                                htmlFor="firstName"
                                className="form-label"
                            >
                                First Name
                            </label>

                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) =>
                                    setFirstName(e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="lastName"
                                className="form-label"
                            >
                                Last Name
                            </label>

                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) =>
                                    setLastName(e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="form-label"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>

                        <button
                            className="btn btn-primary w-100 mb-3"
                            onClick={handleRegister}
                        >
                            Register
                        </button>

                        <p className="mt-4 text-center">
                            Already a member?{' '}
                            <a
                                href="/app/login"
                                className="text-primary"
                            >
                                Login
                            </a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;