import { useState, useEffect } from 'react';
import axios from 'axios';
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
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [emailError, setEmailError] = useState(false);
    const token = localStorage.getItem('jwtToken');

    const fetchProfile = async () => {
        if (!token) return;
        try {
            const userResponse = await axios.get(
                `https://frontend-educational-backend.herokuapp.com/api/user/`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const userInfoResponse = await axios.get(
                `https://frontend-educational-backend.herokuapp.com/api/user/`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setProfile({
                name: userResponse.data.username,
                bio: userInfoResponse.data.info,
                email: userResponse.data.email,
                image: userResponse.data.image || blankProfilePicture,
            });
            setUpdatedProfile({
                name: userResponse.data.username,
                bio: userInfoResponse.data.info,
                email: userResponse.data.email,
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    useEffect(() => {
        if (!token) return;
        fetchProfile();
    }, [token]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });

        if (name === 'email') {
            setEmailError(!validateEmail(value));
        }
    };

    const handleSave = async () => {
        if (emailError || !updatedProfile.email) {
            alert('Please fix the errors in the form before saving.');
            return;
        }

        try {
            await axios.put(
                `https://frontend-educational-backend.herokuapp.com/api/user`,
                {
                    name: updatedProfile.name,
                    email: updatedProfile.email,
                    info: updatedProfile.bio,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setProfile(updatedProfile); // Update the main profile state
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedProfile({
            name: profile.name,
            bio: profile.bio,
            email: profile.email,
        });
        setEmailError(false); // Clear any email validation errors
    };

    return (
        <div>
            <Nav />
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-image">
                        <img src={profile.image} alt="Profile" className="profile-pic" />
                    </div>
                    {isEditing ? (
                        <>
                            <label className="custom-upload-button">
                                Change Profile Picture
                                <input
                                    type="file"
                                    className="image-button"
                                    accept="image/*"
                                    style={{ display: 'none' }} // Hide the input visually but keep it functional
                                />
                            </label>
                            <h2 className="profile-name">{profile.name || "Loading name..."}</h2>
                            <p className="p-email">Bio:</p>
                            <textarea
                                name="bio"
                                value={updatedProfile.bio}
                                onChange={handleInputChange}
                                className="profile-input"
                            />
                            <p className="p-email">Email:</p>
                            <input
                                type="email"
                                name="email"
                                value={updatedProfile.email}
                                onChange={handleInputChange}
                                className={`profile-email ${emailError ? 'input-error' : ''}`}
                                placeholder="Enter a valid email address"
                            />
                            {emailError && (
                                <p style={{ color: 'red', fontSize: '14px' }}>
                                    Please enter a valid email address.
                                </p>
                            )}
                            <button
                                className="save-button"
                                onClick={handleSave}
                                disabled={emailError || !updatedProfile.email}
                            >
                                Save
                            </button>
                            <button className="cancel-button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="profile-name">{profile.name}</p>
                            <strong><p>Bio:</p></strong>
                            <p className="profile-bio">{profile.bio}</p>
                            <br/>
                            <strong><p>Email:</p></strong><p>{profile.email}</p>
                            <br/>
                            <button className="profile-button" onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;