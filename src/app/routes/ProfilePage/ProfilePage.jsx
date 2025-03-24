import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // ✅ Updated import syntax
import './ProfilePage.css';
import Nav from '../../../components/Nav/Nav.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import blankProfilePicture from '../../../assets/images/blankProfilePicture.webp';

function ProfilePage() {
    // Initial default profile state.
    const [profile, setProfile] = useState({
        name: 'John Doe',
        bio: 'A passionate developer with a love for creating dynamic user experiences.',
        email: 'john.doe@example.com',
        image: blankProfilePicture, // Default temporary image
    });

    const [editMode, setEditMode] = useState(false);

    // Retrieve and decode JWT token.
    const token = localStorage.getItem('jwtToken');
    const decodedToken = token ? jwtDecode(token) : null;

    useEffect(() => {
        if (!token || !decodedToken) {
            console.warn("No valid token available for fetching profile data.");
            return;
        }

        async function fetchProfile() {
            try {
                const response = await axios.get(
                    `https://api.datavortex.nl/Anilytics/users/${decodedToken.username}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setProfile({
                    name: response.data.name || profile.name,
                    bio: response.data.bio || profile.bio,
                    email: response.data.email || profile.email,
                    image: response.data.image || profile.image,
                });
            } catch (error) {
                console.error("Error fetching profile:", error.message);
            }
        }

        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, decodedToken]);

    // Update profile inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    // Toggle editing mode.
    const handleToggleEdit = () => {
        setEditMode(!editMode);
    };

    // Save updated profile data.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token || !decodedToken) {
            console.error("Cannot update profile because the token is missing or invalid.");
            return;
        }
        try {
            const response = await axios.put(
                `https://api.datavortex.nl/anilytics/users/${decodedToken.username}/info`,
                profile,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProfile(response.data);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    // Handle profile picture update via file input
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    image: reader.result, // Convert file to base64 and set as image
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Reset profile picture to default (blankProfilePicture)
    const handleResetImage = () => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            image: blankProfilePicture,
        }));
    };

    return (
        <>
            <Nav />
            <div className="profile-container">
                <div className="profile-card">
                    {editMode ? (
                        <form onSubmit={handleSubmit}>
                            {/* Display current profile picture */}
                            <img
                                src={profile.image}
                                alt="Profile"
                                className="profile-pic"
                            />
                            {/* Image upload field */}
                            <div className="form-group">
                                <label htmlFor="image">Profile Picture: </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <button
                                    type="button"
                                    className="profile-button"
                                    onClick={handleResetImage}
                                >
                                    Reset to Default
                                </button>
                            </div>
                            {/* Editable form fields */}
                            <div className="form-group">
                                <label htmlFor="name">Name: </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={profile.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Bio: </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows="4"
                                    value={profile.bio}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Submit and Cancel buttons */}
                            <button type="submit" className="profile-button">
                                Save
                            </button>
                            <button
                                type="button"
                                className="profile-button"
                                onClick={handleToggleEdit}
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <>
                            {/* Display profile details */}
                            <img
                                src={profile.image}
                                alt="Profile"
                                className="profile-pic"
                            />
                            <h2 className="profile-name">{profile.name}</h2>
                            <p className="profile-bio">{profile.bio}</p>
                            <p className="profile-email">{profile.email}</p>
                            <button
                                className="profile-button"
                                onClick={handleToggleEdit}
                            >
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;