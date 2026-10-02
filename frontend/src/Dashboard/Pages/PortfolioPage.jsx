import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCamera,
  FaSave,
  FaSyncAlt,
  FaExclamationCircle,
} from "react-icons/fa";

import { getStoredUser, getToken } from "../../utils/auth";

import "./ProfilePage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const ProfilePage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [profileImage, setProfileImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================
     UPDATE FORM
  ========================================= */

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================================
     LOAD PROFILE
  ========================================= */

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = getToken();

      if (!token) {
        const storedUser = getStoredUser();

        if (storedUser) {
          setForm({
            firstName: storedUser.firstName || "",
            lastName: storedUser.lastName || "",
            email: storedUser.email || "",
            phone: storedUser.phone || "",
            address: storedUser.address || "",
            city: storedUser.city || "",
            state: storedUser.state || "",
            pincode: storedUser.pincode || "",
          });

          setProfileImage(storedUser.profileImage || "");
        } else {
          setError("Please login again.");
        }

        return;
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const text = await response.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message || `Failed to load profile (${response.status})`,
        );
      }

      const user = data.user || data.data?.user || data.data || data;

      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
      });

      setProfileImage(user.profileImage || "");

      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (storageError) {
        console.log("User storage update skipped:", storageError);
      }
    } catch (err) {
      console.error("Profile load error:", err);

      setError(err.message || "Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  /* =========================================
     IMAGE
  ========================================= */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    setError("");
    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setProfileImage(previewUrl);
  };

  /* =========================================
     SAVE PROFILE
  ========================================= */

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = getToken();

      if (!token) {
        setError("Your session has expired. Please login again.");
        return;
      }

      const formData = new FormData();

      formData.append("firstName", form.firstName);

      formData.append("lastName", form.lastName);

      formData.append("phone", form.phone);

      formData.append("address", form.address);

      formData.append("city", form.city);

      formData.append("state", form.state);

      formData.append("pincode", form.pincode);

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      });

      const text = await response.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message || `Profile update failed (${response.status})`,
        );
      }

      const updatedUser = data.user || data.data?.user || data.data || null;

      if (updatedUser) {
        setForm({
          firstName: updatedUser.firstName || "",

          lastName: updatedUser.lastName || "",

          email: updatedUser.email || form.email,

          phone: updatedUser.phone || "",

          address: updatedUser.address || "",

          city: updatedUser.city || "",

          state: updatedUser.state || "",

          pincode: updatedUser.pincode || "",
        });

        setProfileImage(updatedUser.profileImage || "");

        try {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (storageError) {
          console.log("User storage update skipped:", storageError);
        }

        window.dispatchEvent(
          new CustomEvent("tradenest-profile-update", {
            detail: updatedUser,
          }),
        );
      }

      setImageFile(null);

      setSuccess(data.message || "Profile updated successfully.");
    } catch (err) {
      console.error("Profile update error:", err);

      setError(err.message || "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
     FULL NAME
  ========================================= */

  const fullName = `${form.firstName} ${form.lastName}`.trim();

  const getInitial = () => {
    return form.firstName?.trim()?.charAt(0)?.toUpperCase() || "U";
  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <FaSyncAlt className="spin" />

          <h3>Loading profile...</h3>

          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="profile-page-header">
        <div className="profile-header-icon">
          <FaUser />
        </div>

        <div>
          <h1>My Profile</h1>

          <p>Manage your personal information and account details.</p>
        </div>
      </div>

      {/* =====================================
          ALERTS
      ===================================== */}

      {error && (
        <div className="profile-alert profile-alert-error">
          <FaExclamationCircle />

          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="profile-alert profile-alert-success">
          <FaSave />

          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* ===================================
            PROFILE CARD
        =================================== */}

        <div className="profile-card profile-main-card">
          <div className="profile-cover"></div>

          <div className="profile-main-content">
            <div className="profile-avatar-wrapper">
              {profileImage ?
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-avatar"
                />
              : <div className="profile-avatar profile-avatar-placeholder">
                  {getInitial()}
                </div>
              }

              <label
                htmlFor="profile-image"
                className="profile-camera-btn"
                title="Change profile picture"
              >
                <FaCamera />
              </label>

              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </div>

            <div className="profile-main-info">
              <h2>{fullName || "TradeNest User"}</h2>

              <p>
                <FaEnvelope />

                {form.email || "No email"}
              </p>
            </div>
          </div>
        </div>

        {/* ===================================
            PERSONAL INFORMATION
        =================================== */}

        <div className="profile-card">
          <div className="profile-card-heading">
            <div>
              <h2>Personal Information</h2>

              <p>Update your basic account information.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            {/* FIRST NAME */}

            <div className="profile-field">
              <label>
                <FaUser />
                First Name
              </label>

              <input
                type="text"
                value={form.firstName}
                onChange={(e) => updateForm("firstName", e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>

            {/* LAST NAME */}

            <div className="profile-field">
              <label>
                <FaUser />
                Last Name
              </label>

              <input
                type="text"
                value={form.lastName}
                onChange={(e) => updateForm("lastName", e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>

            {/* EMAIL */}

            <div className="profile-field">
              <label>
                <FaEnvelope />
                Email Address
              </label>

              <input type="email" value={form.email} disabled />

              <small>Email address cannot be changed here.</small>
            </div>

            {/* PHONE */}

            <div className="profile-field">
              <label>
                <FaPhone />
                Phone Number
              </label>

              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        {/* ===================================
            ADDRESS
        =================================== */}

        <div className="profile-card">
          <div className="profile-card-heading">
            <div>
              <h2>Address Information</h2>

              <p>Keep your location details up to date.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            {/* ADDRESS */}

            <div className="profile-field profile-field-full">
              <label>
                <FaMapMarkerAlt />
                Address
              </label>

              <input
                type="text"
                value={form.address}
                onChange={(e) => updateForm("address", e.target.value)}
                placeholder="House / Street / Area"
              />
            </div>

            {/* CITY */}

            <div className="profile-field">
              <label>City</label>

              <input
                type="text"
                value={form.city}
                onChange={(e) => updateForm("city", e.target.value)}
                placeholder="City"
              />
            </div>

            {/* STATE */}

            <div className="profile-field">
              <label>State</label>

              <input
                type="text"
                value={form.state}
                onChange={(e) => updateForm("state", e.target.value)}
                placeholder="State"
              />
            </div>

            {/* PINCODE */}

            <div className="profile-field">
              <label>PIN Code</label>

              <input
                type="text"
                value={form.pincode}
                onChange={(e) => updateForm("pincode", e.target.value)}
                placeholder="PIN Code"
                maxLength="6"
              />
            </div>
          </div>
        </div>

        {/* ===================================
            SAVE
        =================================== */}

        <div className="profile-save-area">
          <button type="submit" className="profile-save-btn" disabled={saving}>
            {saving ?
              <>
                <FaSyncAlt className="spin" />
                Saving...
              </>
            : <>
                <FaSave />
                Save Changes
              </>
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
