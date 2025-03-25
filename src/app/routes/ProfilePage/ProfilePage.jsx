import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './ProfilePage.css';
import Nav from '../../../components/Nav/Nav.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import blankProfilePicture from '../../../assets/images/blankProfilePicture.webp';

function ProfilePage() {
    const [profile, setProfile] = useState({
        name: '',
        bio: '',
        email: '',
        image: blankProfilePicture,
    });
    const [isEditing, setIsEditing] = useState(false); // State for edit mode
    const [updatedProfile, setUpdatedProfile] = useState({}); // Temp storage for edits

    const token = localStorage.getItem('jwtToken'); // Fetch token once

    const fetchProfile = async () => {
        if (!token) return;

        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;

        try {
            console.log("Fetching user...");
            const userResponse = await axios.get(
                `https://api.datavortex.nl/anilytics/users/${username}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("User Response: ", userResponse.data);

            const userInfoResponse = await axios.get(
                `https://api.datavortex.nl/anilytics/users/${username}/info`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("User Info Response: ", userInfoResponse.data);

            setProfile({
                name: userResponse.data.username,
                bio: userInfoResponse.data,
                email: userResponse.data.email,
                image: userResponse.data.image || blankProfilePicture,
            });
            setUpdatedProfile({
                name: userResponse.data.username,
                bio: userInfoResponse.data.info,
                email: userResponse.data.email,
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        if (!token) return;
        fetchProfile();
    }, [token]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;

        try {
            await axios.post(
                `https://api.datavortex.nl/anilytics/users/${username}/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            fetchProfile(); // Refresh profile after upload
        } catch (err) {
            console.error("Error uploading image:", err);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedProfile({
            name: profile.name,
            bio: profile.bio,
            email: profile.email,
        }); // Reset edited values to original profile
    };

    const handleSave = async () => {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;

        try {
            const response = await axios.put(
                `https://api.datavortex.nl/anilytics/users/${username}`,
                {
                    name: updatedProfile.name,
                    email: updatedProfile.email,
                    info: updatedProfile.bio, // Save the "bio" as "info"
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Profile updated successfully:", response.data);
            setProfile(updatedProfile); // Update profile view
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <Nav />
            <div className="profile-container">
                <div className="profile-card">
                    <img
                        src={profile.image}
                        alt="Profile"
                        className="profile-pic"
                    />
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                name="name"
                                value={updatedProfile.name}
                                onChange={handleInputChange}
                                className="profile-input"
                            />
                            <textarea
                                name="bio"
                                value={updatedProfile.bio}
                                onChange={handleInputChange}
                                className="profile-input"
                            />
                            <input
                                type="email"
                                name="email"
                                value={updatedProfile.email}
                                onChange={handleInputChange}
                                className="profile-input"
                            />
                            <div>
                                <button onClick={handleSave} className="profile-button">
                                    Save
                                </button>
                                <button onClick={handleCancel} className="profile-button">
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="profile-name">{profile.name || "Loading name..."}</h2>
                            <p className="profile-bio">{profile.bio || "Empty bio"}</p>
                            <p className="profile-contact">
                                <a href={`mailto:${profile.email}`}>{profile.email || "Loading email..."}</a>
                            </p>
                            <button onClick={handleEdit} className="profile-button">
                                Edit
                            </button>
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="profile-button"
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;