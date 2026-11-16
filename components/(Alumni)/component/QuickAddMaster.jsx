"use client";

import { useState } from "react";
import { Modal, message } from "antd";
import FormField from "@/commonComponents/FormFields";
import axios from "axios";
import { BaseURL } from "@/utils/BaseUrl";
import Models from "@/imports/models.import";

/**
 * QuickAddMaster
 *
 * Props:
 *  - type: "location" | "role" | "industry" | "skill" | "country"
 *  - onCreated(newOption): called after successful creation with { value, label }
 *  - adminOnly: if true, only renders for admin/alumniManager (default true)
 */
const QuickAddMaster = ({ type, onCreated, adminOnly = true }) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [err, setErr] = useState({});

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const isAdmin =
    typeof window !== "undefined"
      ? localStorage.getItem("isAdmin") === "true"
      : false;
  const isAlumniManager =
    typeof window !== "undefined"
      ? localStorage.getItem("isAlumniManager") === "true"
      : false;

  if (adminOnly && !isAdmin && !isAlumniManager) return null;

  const config = {
    location: {
      title: "Add Location",
      fields: [{ name: "location", label: "Location Name", type: "text", required: true }],
      submit: async (data) => {
        const res = await axios.post(`${BaseURL}/create_location/`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { value: res.data.id, label: res.data.location };
      },
    },
    role: {
      title: "Add Role",
      fields: [
        { name: "role", label: "Role Name", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
      ],
      submit: async (data) => {
        const res = await axios.post(`${BaseURL}/create_role/`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { value: res.data.id, label: res.data.role };
      },
    },
    industry: {
      title: "Add Industry",
      fields: [
        { name: "title", label: "Industry Name", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
      ],
      submit: async (data) => {
        const res = await axios.post(`${BaseURL}/create_industry/`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { value: res.data.id, label: res.data.title };
      },
    },
    skill: {
      title: "Add Skill",
      fields: [
        { name: "skill", label: "Skill Name", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
      ],
      submit: async (data) => {
        const res = await axios.post(`${BaseURL}/create_skill/`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { value: res.data.skill_id, label: res.data.skill };
      },
    },
    country: {
      title: "Add Country",
      fields: [
        { name: "country_name", label: "Country Name", type: "text", required: true },
        { name: "country_code", label: "Country Code", type: "text", required: true },
      ],
      submit: async (data) => {
        const res = await Models.masters.CreateCountry(data);
        return { value: res.id, label: res.country_name };
      },
    },
  };

  const cfg = config[type];
  if (!cfg) return null;

  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setForm({});
    setErr({});
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (err[name]) setErr((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // basic required validation
    const newErr = {};
    cfg.fields.forEach((f) => {
      if (f.required && !form[f.name]?.trim()) {
        newErr[f.name] = `${f.label} is required`;
      }
    });
    if (Object.keys(newErr).length) {
      setErr(newErr);
      return;
    }
    try {
      setSaving(true);
      const newOption = await cfg.submit(form);
      message.success(`${cfg.title.replace("Add ", "")} created successfully`);
      setOpen(false);
      onCreated?.(newOption);
    } catch (error) {
      message.error(
        error?.response?.data?.error || "Failed to create. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        title={cfg.title}
        style={{
          background: "var(--color-primary)",
          border: "none",
          borderRadius: "50%",
          width: 22,
          height: 22,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          marginLeft: 6,
          verticalAlign: "middle",
        }}
      >
        <i className="feather-plus" style={{ fontSize: 13, color: "#fff" }} />
      </button>

      <Modal
        title={cfg.title}
        open={open}
        onCancel={() => setOpen(false)}
        footer={false}
        centered
      >
        <form onSubmit={handleSubmit} className="applicants-form">
          {cfg.fields.map((f) => (
            <div className="mt-3" key={f.name}>
              <FormField
                type={f.type}
                name={f.name}
                label={f.label}
                value={form[f.name] || ""}
                onChange={handleChange}
                error={err[f.name]}
                required={f.required}
              />
            </div>
          ))}
          <div className="d-flex justify-content-end mt-3">
            <button
              className="rbt-btn btn-gradient radius-round sm-btn"
              type="submit"
              disabled={saving}
            >
              {saving ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default QuickAddMaster;
