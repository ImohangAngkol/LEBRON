// In ViewVehicles.html, add this script to process URL parameters
document.addEventListener('DOMContentLoaded', function() {
    // Get search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const pickupDate = urlParams.get('pickup');
    const returnDate = urlParams.get('return');
    const location = urlParams.get('location');
    const carType = urlParams.get('type');
    
    // If search parameters exist, apply filters
    if (pickupDate || returnDate || location || carType) {
        // Show "Search Results" header instead of "All Vehicles"
        document.querySelector('h1').textContent = 'Search Results';
        
        // Apply filters to your vehicle listing
        applySearchFilters(pickupDate, returnDate, location, carType);
    }
    
    function applySearchFilters(pickup, returnDate, location, type) {
        // This function should filter your vehicles array
        filteredVehicles = vehicles.filter(vehicle => {
            // Filter by type if specified
            if (type && vehicle.type !== type) return false;
            
            // Filter by location if specified
            if (location && !vehicle.locations.includes(location)) return false;
            
            // Add additional filtering logic for dates if needed
            // You might need to check vehicle availability against the dates
            
            return true;
        });
        
        // Re-render the filtered vehicles
        currentPage = 1;
        renderVehicles();
        renderPagination();
        
        // Show active filters
        displayActiveFilters(pickup, returnDate, location, type);
    }
    
    function displayActiveFilters(pickup, returnDate, location, type) {
        const filtersContainer = document.createElement('div');
        filtersContainer.className = 'bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-8';
        filtersContainer.innerHTML = `
            <h3 class="font-bold text-yellow-800 mb-2">Active Filters:</h3>
            <div class="flex flex-wrap gap-2">
                ${pickup ? `<span class="bg-white px-3 py-1 rounded-full text-sm shadow-sm">Pickup: ${new Date(pickup).toLocaleDateString()}</span>` : ''}
                ${returnDate ? `<span class="bg-white px-3 py-1 rounded-full text-sm shadow-sm">Return: ${new Date(returnDate).toLocaleDateString()}</span>` : ''}
                ${location ? `<span class="bg-white px-3 py-1 rounded-full text-sm shadow-sm">Location: ${location.charAt(0).toUpperCase() + location.slice(1)}</span>` : ''}
                ${type ? `<span class="bg-white px-3 py-1 rounded-full text-sm shadow-sm">Type: ${type.toUpperCase()}</span>` : ''}
            </div>
        `;
        
        document.querySelector('main').prepend(filtersContainer);
    }
});