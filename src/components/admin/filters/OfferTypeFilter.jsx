const OfferTypeFilter = ({ selectedOfferType, onOfferTypeChange }) => {
  const offerTypes = [
    'Discount',
    'Buy One Get One',
    'Flash Sale',
    'Seasonal Offer',
    'Clearance',
    'New Arrival',
    'Limited Time',
    'Bundle Deal'
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Offer Type
      </label>
      <select
        value={selectedOfferType}
        onChange={(e) => onOfferTypeChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Offer Types</option>
        {offerTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OfferTypeFilter;