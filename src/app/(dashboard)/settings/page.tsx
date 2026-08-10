import { User, Bell, Shield, Key } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account preferences and application settings.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Settings Nav */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto pb-4 md:pb-0">
            <SettingsTab active icon={User} label="Profile" />
            <SettingsTab icon={Bell} label="Notifications" />
            <SettingsTab icon={Shield} label="Security" />
            <SettingsTab icon={Key} label="API Keys" />
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-medium text-slate-900">Profile Information</h2>
              <p className="text-sm text-slate-500 mt-1">Update your personal details and target intake.</p>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Full Name</label>
                  <input type="text" defaultValue="Anya Chen" className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Target Intake</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-sm">
                    <option>Fall 2026</option>
                    <option selected>Fall 2027</option>
                    <option>Spring 2027</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-900">Email Address</label>
                  <input type="email" defaultValue="anya.chen@example.com" disabled className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-500 cursor-not-allowed shadow-sm" />
                  <p className="text-xs text-slate-500">Contact support to change your email address.</p>
                </div>
              </div>

            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end rounded-b-lg">
              <button className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-slate-900/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ active, icon: Icon, label }: any) {
  return (
    <button className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${active ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
