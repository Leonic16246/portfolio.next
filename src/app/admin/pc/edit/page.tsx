"use client";

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

type PCItem = {
  pc_id: number;
  user_id: string;
  name: string;
  cpu: string;
  gpu: string;
};

type EditingItem = {
  pc_id: number | '';
  name: string;
  cpu: string;
  gpu: string;
};

export default function EditPC() {
  const [data, setData] = useState<PCItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [isInserting, setIsInserting] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial user session
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
    fetchPCData();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchPCData = async () => {
    try {
      setLoading(true);
      
      const { data: pcData, error: supabaseError } = await supabase
        .from('pc')
        .select('pc_id, user_id, name, cpu, gpu')
        .order('pc_id', { ascending: true });

      if (supabaseError) {
        throw new Error(`Supabase error: ${supabaseError.message}`);
      }

      setData(pcData || []);
      setError(null);
    } catch (err) {
      console.error('Error loading PC data:', err);
      setError('Failed to load PC data');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch data when user changes
  useEffect(() => {
    if (user) {
      fetchPCData();
    }
  }, [user]);

  const handleEdit = (item: PCItem) => {
    setEditingItem({
      pc_id: item.pc_id,
      name: item.name,
      cpu: item.cpu,
      gpu: item.gpu
    });
    setIsInserting(false);
  };

  const handleInsert = () => {
    if (!user) {
      setError('You must be logged in');
      return;
    }
    
    setEditingItem({
      pc_id: '',
      name: '',
      cpu: '',
      gpu: ''
    });
    setIsInserting(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    // Check if user is authenticated
    if (!user) {
      setError('You must be logged in to perform this action');
      return;
    }

    // Basic validation
    if (!editingItem.name.trim()) {
      setError('PC name is required');
      return;
    }

    try {
      setOperationLoading(true);
      setError(null); // Clear any previous errors
      
      if (isInserting) {
        // Insert new item - let the database auto-generate the id
        const insertData = {
          user_id: user.id, 
          name: editingItem.name.trim(),
          cpu: editingItem.cpu.trim() || null,
          gpu: editingItem.gpu.trim() || null
        };

        const { data: insertedData, error: insertError } = await supabase
          .from('pc')
          .insert([insertData])
          .select(); // Return the inserted data

        if (insertError) {
          console.error('Insert error details:', insertError);
          throw new Error(`Insert failed: ${insertError.message}`);
        }

        console.log('Successfully inserted:', insertedData);
      } else {
        // Update existing item
        const updateData = {
          name: editingItem.name.trim(),
          cpu: editingItem.cpu.trim() || null,
          gpu: editingItem.gpu.trim() || null
        };

        const { data: updatedData, error: updateError } = await supabase
          .from('pc')
          .update(updateData)
          .eq('pc_id', editingItem.pc_id)
          .select(); // Return the updated data

        if (updateError) {
          console.error('Update error details:', updateError);
          throw new Error(`Update failed: ${updateError.message}`);
        }

        console.log('Successfully updated:', updatedData);
      }

      // Refresh data and close edit mode
      await fetchPCData();
      setEditingItem(null);
      setIsInserting(false);
    } catch (err) {
      console.error('Error saving PC data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to ${isInserting ? 'insert' : 'update'} PC data: ${errorMessage}`);
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this PC component?')) {
      return;
    }

    if (!user) {
      setError('You must be logged in to delete PC components');
      return;
    }

    try {
      setOperationLoading(true);
      
      const { error: deleteError } = await supabase
        .from('pc')
        .delete()
        .eq('pc_id', id)

      if (deleteError) {
        throw new Error(`Delete error: ${deleteError.message}`);
      }

      // Refresh data
      await fetchPCData();
    } catch (err) {
      console.error('Error deleting PC data:', err);
      setError('Failed to delete PC data');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsInserting(false);
  };

  const handleInputChange = (field: keyof EditingItem, value: string) => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        [field]: value
      });
    }
  };

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                  <div className="font-geist-mono text-sm tracking-widest uppercase text-white/60 mb-4">
                      Loading...
                  </div>
                  <div className="w-8 h-8 border-2 border-white/60 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
          </div>
      );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">
            Please log in
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="rounded-xl border border-white/10 px-4 py-2 font-geist-mono text-sm uppercase text-white/80 transition hover:bg-white/5 hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400/90">
          {error}
          <button 
            onClick={fetchPCData}
            className="ml-4 rounded-xl border border-white/10 px-4 py-2 font-geist-mono text-sm uppercase text-white/80 transition hover:bg-white/5 hover:border-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight text-white/90">
            Edit PC Components 
          </h1>
          <button
            onClick={handleInsert}
            disabled={editingItem !== null || operationLoading}
            className="rounded-full border-2 bg-white/90 px-6 py-2.5 text-center text-black transition hover:bg-white/75 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add New PC
          </button>
        </div>

        <div className="relative w-full rounded border-2 border-white/5 bg-neutral-950 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="py-4 pr-6 text-left font-geist-mono text-sm tracking-widest uppercase text-white/70">
                    Name
                  </th>
                  <th className="py-4 pr-6 text-left font-geist-mono text-sm tracking-widest uppercase text-white/70">
                    CPU
                  </th>
                  <th className="py-4 pr-6 text-left font-geist-mono text-sm tracking-widest uppercase text-white/70">
                    GPU
                  </th>
                  <th className="py-4 pr-6 text-left font-geist-mono text-sm tracking-widest uppercase text-white/70">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {/* Insert Row */}
                {isInserting && editingItem && (
                  <tr className="bg-white/[0.03]">
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                        placeholder="PC Name"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingItem.cpu}
                        onChange={(e) => handleInputChange('cpu', e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                        placeholder="CPU"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingItem.gpu}
                        onChange={(e) => handleInputChange('gpu', e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                        placeholder="GPU"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          disabled={operationLoading}
                          className="rounded-xl border border-white/10 px-3 py-1 font-geist-mono text-sm uppercase text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={operationLoading}
                          className="rounded-xl border border-white/10 px-3 py-1 font-geist-mono text-sm uppercase text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Data Rows */}
                {data.map((item) => (
                  <tr 
                    key={item.pc_id} 
                    className={`transition-colors duration-150 hover:bg-white/[0.02] ${
                      editingItem?.pc_id === item.pc_id ? 'bg-white/[0.05]' : ''
                    }`}
                  >
                    <td className="py-4 pr-6 text-white/90 break-words">
                      {editingItem?.pc_id === item.pc_id ? (
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                        />
                      ) : (
                        item.name || '-'
                      )}
                    </td>
                    <td className="py-4 pr-6 text-white/80 break-words">
                      {editingItem?.pc_id === item.pc_id ? (
                        <input
                          type="text"
                          value={editingItem.cpu}
                          onChange={(e) => handleInputChange('cpu', e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                        />
                      ) : (
                        item.cpu || '-'
                      )}
                    </td>
                    <td className="py-4 pr-6 text-white/80 break-words">
                      {editingItem?.pc_id === item.pc_id ? (
                        <input
                          type="text"
                          value={editingItem.gpu}
                          onChange={(e) => handleInputChange('gpu', e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                        />
                      ) : (
                        item.gpu || '-'
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingItem?.pc_id === item.pc_id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            disabled={operationLoading}
                            className="rounded-xl border border-white/10 px-3 py-1 font-geist-mono text-sm uppercase text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            disabled={operationLoading}
                            className="rounded-xl border border-white/10 px-3 py-1 font-geist-mono text-sm uppercase text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            disabled={editingItem !== null || operationLoading}
                            className="rounded-xl border border-white/10 px-3 py-1 font-geist-mono text-sm uppercase text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.pc_id)}
                            disabled={editingItem !== null || operationLoading}
                            className="rounded-xl border border-red-400/30 px-3 py-1 font-geist-mono text-sm uppercase text-red-400/90 transition hover:bg-red-400/10 hover:border-red-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {/* Insert Card */}
            {isInserting && editingItem && (
              <div className="border-b border-white/10 bg-white/[0.03] p-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white/90">
                    Add New PC
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block font-geist-mono text-sm tracking-widest uppercase text-white/70 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                        placeholder="PC Name"
                      />
                    </div>
                    <div>
                      <label className="block font-geist-mono text-sm tracking-widest uppercase text-white/70 mb-1">
                        CPU
                      </label>
                      <input
                        type="text"
                        value={editingItem.cpu}
                        onChange={(e) => handleInputChange('cpu', e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                        placeholder="CPU"
                      />
                    </div>
                    <div>
                      <label className="block font-geist-mono text-sm tracking-widest uppercase text-white/70 mb-1">
                        GPU
                      </label>
                      <input
                        type="text"
                        value={editingItem.gpu}
                        onChange={(e) => handleInputChange('gpu', e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                        placeholder="GPU"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={operationLoading}
                      className="rounded-xl border border-white/10 px-4 py-2 font-geist-mono text-sm uppercase text-white/80 transition hover:bg-white/5 hover:border-white/20 hover:text-white disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={operationLoading}
                      className="rounded-xl border border-white/10 px-4 py-2 font-geist-mono text-sm uppercase text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Cards */}
            {data.map((item) => (
              <div 
                key={item.pc_id} 
                className={`border-b border-white/10 p-6 last:border-b-0 ${
                  editingItem?.pc_id === item.pc_id ? 'bg-white/[0.05]' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-white/90">
                      {editingItem?.pc_id === item.pc_id ? (
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                        />
                      ) : (
                        item.name || 'Unnamed PC'
                      )}
                    </h3>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-geist-mono text-sm tracking-widest uppercase text-white/70">CPU:</span>
                      <div className="mt-1">
                        {editingItem?.pc_id === item.pc_id ? (
                          <input
                            type="text"
                            value={editingItem.cpu}
                            onChange={(e) => handleInputChange('cpu', e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                          />
                        ) : (
                          <span className="text-white/60">{item.cpu || '-'}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="font-geist-mono text-sm tracking-widest uppercase text-white/70">GPU:</span>
                      <div className="mt-1">
                        {editingItem?.pc_id === item.pc_id ? (
                          <input
                            type="text"
                            value={editingItem.gpu}
                            onChange={(e) => handleInputChange('gpu', e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 placeholder-white/40 transition focus:border-white/25"
                          />
                        ) : (
                          <span className="text-white/60">{item.gpu || '-'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {editingItem?.pc_id === item.pc_id ? (
                      <>
                        <button
                          onClick={handleSave}
                          disabled={operationLoading}
                          className="rounded-xl border border-white/10 px-4 py-2 font-geist-mono text-sm uppercase text-white/80 transition hover:bg-white/5 hover:border-white/20 hover:text-white disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={operationLoading}
                          className="rounded-xl border border-white/10 px-4 py-2 font-geist-mono text-sm uppercase text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(item)}
                          disabled={editingItem !== null || operationLoading}
                          className="rounded-xl border border-white/10 px-4 py-2 font-geist-mono text-sm uppercase text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.pc_id)}
                          disabled={editingItem !== null || operationLoading}
                          className="rounded-xl border border-red-400/30 px-4 py-2 font-geist-mono text-sm uppercase text-red-400/90 transition hover:bg-red-400/10 hover:border-red-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.length === 0 && !isInserting && (
          <div className="text-center py-12">
            <p className="text-white/60">No PC components found.</p>
          </div>
        )}
    </>
  );
}