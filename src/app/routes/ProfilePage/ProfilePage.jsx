import { useState } from 'react';
import './ProfilePage.css';
import Nav from "../../../components/Nav/Nav.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import blankProfilePicture from "../../../assets/images/blankProfilePicture.webp"

function ProfilePage() {
    // Initialize state for the user's profile data.
    // This object holds the profile values: name, bio, email, and the image URL.
    const [profile, setProfile] = useState({
        name: 'John Doe',
        bio: 'A passionate developer with a love for creating dynamic user experiences.',
        email: 'john.doe@example.com',
        image: blankProfilePicture,
    });

    // State to determine whether the component is in edit mode.
    const [editMode, setEditMode] = useState(false);

    // Handles changes to any of the form inputs.
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the corresponding field in the profile state.
        setProfile({ ...profile, [name]: value });
    };

    // Toggles edit mode on or off.
    const handleToggleEdit = () => {
        setEditMode(!editMode);
    };

    // Handles form submission.
    // Prevents the default form submission behavior and disables edit mode.
    const handleSubmit = (e) => {
        e.preventDefault();
        setEditMode(false);
    };

    return (
        <>
            <Nav />
        <div className="profile-container">
            <div className="profile-card">
                {editMode ? (
                    <form onSubmit={handleSubmit}>
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
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={profile.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Profile Image URL: </label>
                            <input
                                id="image"
                                name="image"
                                type="text"
                                value={profile.image}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Save Profile</button>
                    </form>
                ) : (
                    // When not in edit mode, display the profile details.
                    <>
                        <img src={profile.image} alt="Profile" className="profile-pic" />
                        <h1 className="profile-name">{profile.name}</h1>
                        <p className="profile-bio">{profile.bio}</p>
                        <div className="profile-contact">
                            <a href={`mailto:${profile.email}`}>{profile.email}</a>
                        </div>
                    </>
                )}

                {/* Toggle button to enter/exit edit mode */}
                <button className="profile-button" onClick={handleToggleEdit}>
                    {editMode ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>
        </div>
            <Footer />
        </>
    );
}

export default ProfilePage;
