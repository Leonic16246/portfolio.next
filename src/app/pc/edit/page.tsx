"use client";

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

type PCItem = {
  id: number;
  user_id: string;
  name: string;
  cpu: string;
  gpu: string;
};

type EditingItem = {
  id: number | '';
  name: string;
  cpu: string;
  gpu: string;
};

export default function PC() {
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
        .select('id, user_id, name, cpu, gpu')
        .order('id', { ascending: true });

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
      id: item.id,
      name: item.name,
      cpu: item.cpu,
      gpu: item.gpu
    });
    setIsInserting(false);
  };

  const handleInsert = () => {
    if (!user) {
      setError('You must be logged in to add new PC components');
      return;
    }
    
    setEditingItem({
      id: '',
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
          .eq('id', editingItem.id)
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
        .eq('id', id)

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
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-neutral-600 dark:text-neutral-300">Loading PC components...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">
            Please log in to manage PC components
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">
          {error}
          <button 
            onClick={fetchPCData}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">
            PC Components Admin
          </h1>
          <button
            onClick={handleInsert}
            disabled={editingItem !== null || operationLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add New PC
          </button>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100 dark:bg-neutral-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    CPU
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    GPU
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-600">
                {/* Insert Row */}
                {isInserting && editingItem && (
                  <tr className="bg-blue-50 dark:bg-blue-900/20">
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        placeholder="PC Name"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingItem.cpu}
                        onChange={(e) => handleInputChange('cpu', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        placeholder="CPU"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingItem.gpu}
                        onChange={(e) => handleInputChange('gpu', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        placeholder="GPU"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          disabled={operationLoading}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={operationLoading}
                          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 disabled:opacity-50"
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
                    key={item.id} 
                    className={`hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-150 ${
                      editingItem?.id === item.id ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {editingItem?.id === item.id ? (
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        />
                      ) : (
                        item.name || '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {editingItem?.id === item.id ? (
                        <input
                          type="text"
                          value={editingItem.cpu}
                          onChange={(e) => handleInputChange('cpu', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        />
                      ) : (
                        item.cpu || '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300">
                      {editingItem?.id === item.id ? (
                        <input
                          type="text"
                          value={editingItem.gpu}
                          onChange={(e) => handleInputChange('gpu', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        />
                      ) : (
                        item.gpu || '-'
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingItem?.id === item.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            disabled={operationLoading}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            disabled={operationLoading}
                            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            disabled={editingItem !== null || operationLoading}
                            className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={editingItem !== null || operationLoading}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-600 bg-blue-50 dark:bg-blue-900/20">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Add New PC
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        placeholder="PC Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        CPU
                      </label>
                      <input
                        type="text"
                        value={editingItem.cpu}
                        onChange={(e) => handleInputChange('cpu', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        placeholder="CPU"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        GPU
                      </label>
                      <input
                        type="text"
                        value={editingItem.gpu}
                        onChange={(e) => handleInputChange('gpu', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        placeholder="GPU"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={operationLoading}
                      className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={operationLoading}
                      className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 disabled:opacity-50"
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
                key={item.id} 
                className={`p-6 border-b border-neutral-200 dark:border-neutral-600 last:border-b-0 ${
                  editingItem?.id === item.id ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {editingItem?.id === item.id ? (
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                        />
                      ) : (
                        item.name || 'Unnamed PC'
                      )}
                    </h3>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">CPU:</span>
                      <div className="mt-1">
                        {editingItem?.id === item.id ? (
                          <input
                            type="text"
                            value={editingItem.cpu}
                            onChange={(e) => handleInputChange('cpu', e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                          />
                        ) : (
                          <span className="text-neutral-600 dark:text-neutral-400">{item.cpu || '-'}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">GPU:</span>
                      <div className="mt-1">
                        {editingItem?.id === item.id ? (
                          <input
                            type="text"
                            value={editingItem.gpu}
                            onChange={(e) => handleInputChange('gpu', e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
                          />
                        ) : (
                          <span className="text-neutral-600 dark:text-neutral-400">{item.gpu || '-'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {editingItem?.id === item.id ? (
                      <>
                        <button
                          onClick={handleSave}
                          disabled={operationLoading}
                          className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={operationLoading}
                          className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(item)}
                          disabled={editingItem !== null || operationLoading}
                          className="px-4 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={editingItem !== null || operationLoading}
                          className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <p className="text-neutral-600 dark:text-neutral-400">No PC components found.</p>
          </div>
        )}
      </div>
    </div>
  );
}