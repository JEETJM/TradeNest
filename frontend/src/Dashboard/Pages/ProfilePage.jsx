import { useEffect, useState } from "react";

import {
  FaUser,
  FaCamera,
  FaCheckCircle,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";

import { fetchCurrentUser, updateProfile } from "../../Auth/auth";

import "./ProfilePage.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  /* =========================
     LOAD USER
  ========================= */

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchCurrentUser();

        setUser(data);

        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone || "",
        });

        setPreview(data.profileImage || "");
      } catch (err) {
        setError(err.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /* =========================
     CLEAN PREVIEW URL
  ========================= */

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /* =========================
     INPUT
  ========================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  /* =========================
     IMAGE
  ========================= */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setError("");
    setSuccess("");

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);

    setImageFile(file);
    setPreview(objectUrl);
  };

  /* =========================
     SAVE
  ========================= */

  const handleSave = async () => {
    setSuccess("");
    setError("");

    if (!form.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!form.lastName.trim()) {
      setError("Last name is required.");
      return;
    }

    if (form.phone.trim()) {
      if (!/^[0-9]{10}$/.test(form.phone.trim())) {
        setError("Please enter a valid 10-digit phone number.");
        return;
      }
    }

    try {
      setSaving(true);

      const updatedUser = await updateProfile({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        profileImage: imageFile,
      });

      setUser(updatedUser);

      setForm({
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
        phone: updatedUser.phone || "",
      });

      setImageFile(null);
      setPreview(updatedUser.profileImage || "");

      localStorage.setItem("tradenest_user", JSON.stringify(updatedUser));

      sessionStorage.setItem("tradenest_user", JSON.stringify(updatedUser));

      setEditing(false);

      setSuccess("Profile updated successfully.");

      window.dispatchEvent(new Event("tradenest-profile-update"));
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     CANCEL
  ========================= */

  const handleCancel = () => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
    });

    setPreview(user?.profileImage || "");
    setImageFile(null);

    setError("");
    setSuccess("");

    setEditing(false);
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <section className="profilePage">
        <div className="profileLoading">
          <div className="profileLoader"></div>
          <span>Loading profile...</span>
        </div>
      </section>
    );
  }

  /* =========================
     USER DATA
  ========================= */

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const avatarLetter = user?.firstName?.charAt(0)?.toUpperCase() || "U";

  return (
    <section className="profilePage">
      {/* ================= HEADER ================= */}

      <div className="profileHeader">
        <div>
          <h1>My Profile</h1>

          <p>Manage your personal information and account details.</p>
        </div>

        {!editing ?
          <button
            className="editProfileMainBtn"
            onClick={() => {
              setEditing(true);
              setSuccess("");
              setError("");
            }}
          >
            Edit Profile
          </button>
        : <div className="profileActions">
            <button
              className="cancelProfileBtn"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              className="saveProfileBtn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        }
      </div>

      {/* ================= MESSAGES ================= */}

      {success && (
        <div className="profileSuccess">
          <FaCheckCircle />
          <span>{success}</span>
        </div>
      )}

      {error && <div className="profileError">{error}</div>}

      {/* ================= PROFILE HERO ================= */}

      <div className="profileHero">
        <div className="profileHeroLeft">
          <div className="largeProfileAvatar">
            {preview ?
              <img src={preview} alt={fullName || "Profile"} />
            : avatarLetter}

            {editing && (
              <>
                <label
                  htmlFor="profileImage"
                  className="cameraButton"
                  title="Change profile photo"
                >
                  <FaCamera />
                </label>

                <input
                  id="profileImage"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleImageChange}
                  hidden
                />
              </>
            )}
          </div>

          <div className="profileHeroInfo">
            <h2>{fullName || "TradeNest User"}</h2>

            <p>{user?.email || "-"}</p>

            <span className="profileVerified">
              <FaCheckCircle />
              Account Active
            </span>
          </div>
        </div>
      </div>

      {/* ================= GRID ================= */}

      <div className="profileGrid">
        {/* PERSONAL INFORMATION */}

        <div className="profileCard">
          <div className="profileCardHeader">
            <div>
              <h2>Personal Information</h2>

              <p>Your basic account information.</p>
            </div>

            <FaUser />
          </div>

          <div className="profileForm">
            <div className="profileFormGrid">
              <div className="profileField">
                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="First name"
                  maxLength={50}
                />
              </div>

              <div className="profileField">
                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Last name"
                  maxLength={50}
                />
              </div>
            </div>

            <div className="profileField">
              <label>Email Address</label>

              <div className="inputWithIcon">
                <FaEnvelope />

                <input type="email" value={user?.email || ""} disabled />
              </div>

              <small>Email address cannot be changed.</small>
            </div>

            <div className="profileField">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
              />

              <small>Enter your 10-digit mobile number.</small>
            </div>
          </div>
        </div>

        {/* ACCOUNT INFORMATION */}

        <div className="profileCard">
          <div className="profileCardHeader">
            <div>
              <h2>Account Information</h2>

              <p>Your TradeNest account status.</p>
            </div>

            <FaLock />
          </div>

          <div className="accountInfo">
            <div className="accountRow">
              <span>Account Status</span>

              <strong className="activeStatus">Active</strong>
            </div>

            <div className="accountRow">
              <span>Email Verification</span>

              <strong className="verifiedStatus">Verified</strong>
            </div>

            <div className="accountRow">
              <span>Member Since</span>

              <strong>
                {user?.createdAt ?
                  new Date(user.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
              </strong>
            </div>

            <div className="accountRow">
              <span>Account ID</span>

              <strong title={user?.id || user?._id || "-"}>
                {user?.id || user?._id || "-"}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
