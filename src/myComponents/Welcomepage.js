import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../context/UserAuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { auth, db, doc, setDoc } from "../firebase";
import { getDoc } from 'firebase/firestore';
import "../myCss/Welcomepage.css"
const Welcomepage = () => {
    const { logOut } = useUserAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const navigate = useNavigate();

    const fetchUserDatas = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data());
                        console.log("DATA", docSnap.data());
                    } else {
                        console.log("Document does not exist.");
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                }
            } else {
                console.log("No user is signed in.");
                navigate("/login");
            }
        });
    };

    const handleUsernameChange = async () => {
        if (!newUsername.trim()) {
            alert("Username cannot be empty.");
            return;
        }
        try {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                await setDoc(docRef, { ...userDetails, username: newUsername }); 
                setUserDetails((prevDetails) => ({ ...prevDetails, username: newUsername })); 
                alert("Username updated successfully!");
                setNewUsername(""); 
            }
        } catch (err) {
            console.error("Error updating username:", err);
            alert("Failed to update username.");
        }
    };

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        try {
            fetchUserDatas();
        } catch (err) {
            console.error("Error during fetching user data:", err);
        }
    }, []);

    return (
        <div className='welcomepage-container'>
            <div>Welcomepage</div>
            {userDetails ? (
                <p>Hi, {userDetails.username}</p>
            ) : (
                <p>Loading user data...</p>
            )}
            <div className='changeusername-box'>
                <input
                    type="text"
                    placeholder="Enter new username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <button onClick={handleUsernameChange}>Change Username</button>
            </div>

            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default Welcomepage;
