import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import blankProfilePicture from '../../../../assets/images/blankProfilePicture.webp';


const CreateNewAccount = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        bio: 'Welcome to my profile!', // Default bio for new users
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                name: form.name,
                bio: form.bio,
                email: form.email,
                password: form.password,
                image: blankProfilePicture, // Assign the default profile picture
            };

            const response = await axios.post(
                'https://api.datavortex.nl/anilytics/users',
                newUser
            );

            // Store returned JWT token for immediate use
            localStorage.setItem('jwtToken', response.data.token);

            // Redirect to the ProfilePage while ensuring synchronization
            navigate('/profile');
        } catch (error) {
            console.error('Error creating account:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="bio">Bio:</label>
                <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Create Account</button>
        </form>
    );
};

export default CreateNewAccount;