import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Settings() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Basic validation
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError("⚠ All fields are required.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("⚠ New password and confirmation do not match.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("⚠ New password must be at least 6 characters long.");
      return;
    }

    // Mock success
    setMessage("✅ Password updated successfully (mock)");
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account, preferences, and system settings.
          </p>
        </div>

        {/* Change Password (Mock) */}
        <Card title="Change Password">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <Button type="submit" variant="primary">
              Update Password
            </Button>

            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}

