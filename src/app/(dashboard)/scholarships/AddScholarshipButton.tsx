"use client";

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { addScholarship } from "@/app/actions";

export default function AddScholarshipButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await addScholarship(formData);
    
    setIsLoading(false);
    
    if (result?.error) {
      alert("Error: " + result.error);
    } else {
      setIsOpen(false);
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 h-9 px-4 py-2 gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Program
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isLoading && setIsOpen(false)} />
          
          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Add New Scholarship</h2>
              <button onClick={() => !isLoading && setIsOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-900">Program Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="e.g. KAUST Fellowship"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-sm" 
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="provider" className="text-sm font-medium text-slate-900">University / Provider</label>
                <input 
                  type="text" 
                  id="provider" 
                  name="provider" 
                  required 
                  placeholder="e.g. King Abdullah University"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-sm" 
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="fully_funded" 
                  name="fully_funded" 
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <label htmlFor="fully_funded" className="text-sm font-medium text-slate-700 cursor-pointer">This is a Fully Funded program</label>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-slate-900 hover:bg-slate-900/90 transition-colors shadow-sm disabled:opacity-50 gap-2"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isLoading ? 'Saving...' : 'Save Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
