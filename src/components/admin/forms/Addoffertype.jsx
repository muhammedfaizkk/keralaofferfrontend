import React, { useState, useEffect, useCallback } from 'react';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCreateOffertype, useUpdateOffertype } from '../../../hooks/admin/Offertypehooks';

const Addoffertype = ({ onClose, refetch, editData }) => {
  const [offerType, setOfferType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createOffertype, loading: creating } = useCreateOffertype();
  const { updateOffertype, loading: updating } = useUpdateOffertype();

  useEffect(() => {
    if (editData) {
      setOfferType(editData.title || '');
    }
  }, [editData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!offerType.trim()) {
      toast.error('Offer type name is required');
      setIsSubmitting(false);
      return;
    }

    if (offerType.trim().length < 2 || offerType.trim().length > 50) {
      toast.error('Offer type name must be between 2-50 characters');
      setIsSubmitting(false);
      return;
    }

    try {
      if (editData) {
        await updateOffertype(editData._id, { title: offerType });
        toast.success('Offer type updated successfully!');
      } else {
        await createOffertype({ title: offerType });
        toast.success('Offer type created successfully!');
      }
      refetch?.();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  }, [offerType, editData, createOffertype, updateOffertype, refetch, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] sm:w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {editData ? 'Edit Offer Type' : 'Add New Offer Type'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="offerType" className="block text-sm font-medium text-gray-700 mb-1">
              Offer Type <span className="text-red-500">*</span>
            </label>
            <input
              id="offerType"
              type="text"
              value={offerType}
              onChange={(e) => setOfferType(e.target.value)}
              placeholder="Enter offer type name"
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={50}
              aria-required="true"
            />
          </div>

          <div className="flex justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded-xl hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex justify-center items-center"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                editData ? 'Update Offer Type' : 'Create Offer Type'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addoffertype;
