let scopeCount = 1;

const rates = {
    principal: 150, // Example rate per hour for Principal Engineer
    engineering: 100, // Example rate per hour for Engineering
    drafting: 80, // Example rate per hour for Drafting
    travel: 50 // Example rate per hour for Travel
};

function updateRates() {
    rates.principal = parseFloat(document.getElementById('ratePrincipal').value) || 0;
    rates.engineering = parseFloat(document.getElementById('rateEngineering').value) || 0;
    rates.drafting = parseFloat(document.getElementById('rateDrafting').value) || 0;
    rates.travel = parseFloat(document.getElementById('rateTravel').value) || 0;
    calculateTotalEstimate();
}

function calculateTotalEstimate() {
    let total = 0;
    for (let i = 1; i <= scopeCount; i++) {
        const hoursPrincipal = parseFloat(document.getElementById(`hoursPrincipal${i}`).value) || 0;
        const hoursEngineering = parseFloat(document.getElementById(`hoursEngineering${i}`).value) || 0;
        const hoursDrafting = parseFloat(document.getElementById(`hoursDrafting${i}`).value) || 0;
        const siteVisits = parseFloat(document.getElementById(`siteVisits${i}`).value) || 0;

        total += (hoursPrincipal * rates.principal) +
                 (hoursEngineering * rates.engineering) +
                 (hoursDrafting * rates.drafting) +
                 (siteVisits * rates.travel);
    }
    document.getElementById('totalEstimate').innerText = `$${total.toFixed(2)}`;
}

function addScope() {
    scopeCount++;
    const scopeContainer = document.getElementById('scopeContainer');
    const newScope = document.createElement('div');
    newScope.innerHTML = `
        <h3>Scope of Work ${scopeCount}</h3>

        <label for="scopeWork${scopeCount}">Scope of Work:</label>
        <select id="scopeWork${scopeCount}" name="scopeWork${scopeCount}" onchange="checkOtherScope(${scopeCount})">
            <option value="anchorage design">Anchorage Design</option>
            <option value="pipe support design">Pipe Support Design</option>
            <option value="other">Other</option>
        </select>

        <input type="text" id="otherScopeWork${scopeCount}" name="otherScopeWork${scopeCount}" placeholder="Enter other scope" style="display:none;">

        <label for="description${scopeCount}">Description:</label>
        <input type="text" id="description${scopeCount}" name="description${scopeCount}" required>

        <label for="hoursPrincipal${scopeCount}">Hours of Principal Engineer:</label>
        <input type="number" id="hoursPrincipal${scopeCount}" name="hoursPrincipal${scopeCount}" min="0" value="0" required>

        <label for="hoursEngineering${scopeCount}">Hours of Engineering:</label>
        <input type="number" id="hoursEngineering${scopeCount}" name="hoursEngineering${scopeCount}" min="0" value="0" required>

        <label for="hoursDrafting${scopeCount}">Hours of Drafting:</label>
        <input type="number" id="hoursDrafting${scopeCount}" name="hoursDrafting${scopeCount}" min="0" value="0" required>

        <label for="siteVisits${scopeCount}">Site Visits Needed:</label>
        <input type="number" id="siteVisits${scopeCount}" name="siteVisits${scopeCount}" min="0" value="0" required>

        <!-- Subtotal for Scope of Work ${scopeCount} -->
        <p id="subtotal${scopeCount}">Subtotal: $0.00</p>
    `;
    scopeContainer.appendChild(newScope);

    // Show the "Remove Last Scope of Work" button after adding a new scope
    const removeScopeButton = document.getElementById('removeScopeButton');
    if (removeScopeButton) {
        removeScopeButton.style.display = 'block';
    } else {
        console.error('Element with id "removeScopeButton" not found');
    }

    // Recalculate the total estimate
    calculateTotalEstimate();
}

function removeScope() {
    if (scopeCount > 1) {
        const scopeContainer = document.getElementById('scopeContainer');
        scopeContainer.removeChild(scopeContainer.lastChild);
        scopeCount--;

        // Hide the "Remove Last Scope of Work" button if there's only one scope left
        const removeScopeButton = document.getElementById('removeScopeButton');
        if (removeScopeButton) {
            if (scopeCount === 1) {
                removeScopeButton.style.display = 'none';
            }
        } else {
            console.error('Element with id "removeScopeButton" not found');
        }

        // Recalculate the total estimate
        calculateTotalEstimate();
    }
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Define the header
    function addHeader() {
        doc.setFontSize(18);
        doc.text('Zenith Engineers', 20, 10);
        doc.setFontSize(12);
        doc.text('Quoting Tool', 20, 16);
        doc.setFontSize(10);
        doc.text('Contact: conrad@zenithengineers.com | Phone: (415) 786-1700', 20, 22);
        doc.line(20, 24, 190, 24); // Horizontal line
    }

    // Define the footer
    function addFooter(pageNumber) {
        doc.setFontSize(10);
        doc.text(`Page ${pageNumber}`, 105, 290, null, null, 'center');
        doc.line(20, 285, 190, 285); // Horizontal line
        doc.setFontSize(8);
        doc.text('Zenith Engineers © 2023', 20, 292);
    }

    // Add header and footer to the first page
    addHeader();
    addFooter(1);

    doc.setFontSize(14);
    doc.text('Project Information', 20, 30);
    doc.text(`Project Address: ${document.getElementById('projectLocation').value}`, 20, 40);

    for (let i = 1; i <= scopeCount; i++) {
        if (i > 1) {
            doc.addPage();
            addHeader();
            addFooter(doc.internal.getNumberOfPages());
            doc.setFontSize(14); // Ensure font size is set for new page
        }

        let yOffset = 50;
        doc.text(`Scope of Work ${i}`, 20, yOffset);
        doc.text(`Scope: ${document.getElementById(`scopeWork${i}`).value}`, 20, yOffset + 10);
        doc.text(`Description: ${document.getElementById(`description${i}`).value}`, 20, yOffset + 20);
        doc.text(`Hours of Principal Engineer: ${document.getElementById(`hoursPrincipal${i}`).value}`, 20, yOffset + 30);
        doc.text(`Hours of Engineering: ${document.getElementById(`hoursEngineering${i}`).value}`, 20, yOffset + 40);
        doc.text(`Hours of Drafting: ${document.getElementById(`hoursDrafting${i}`).value}`, 20, yOffset + 50);
        doc.text(`Site Visits Needed: ${document.getElementById(`siteVisits${i}`).value}`, 20, yOffset + 60);

        const hoursPrincipal = parseFloat(document.getElementById(`hoursPrincipal${i}`).value) || 0;
        const hoursEngineering = parseFloat(document.getElementById(`hoursEngineering${i}`).value) || 0;
        const hoursDrafting = parseFloat(document.getElementById(`hoursDrafting${i}`).value) || 0;
        const siteVisits = parseFloat(document.getElementById(`siteVisits${i}`).value) || 0;

        const subtotal = (hoursPrincipal * rates.principal) +
                         (hoursEngineering * rates.engineering) +
                         (hoursDrafting * rates.drafting) +
                         (siteVisits * rates.travel);

        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, yOffset + 70);
        doc.setFontSize(14); // Ensure font size is set for new page
        doc.text('Total Estimate', 20, 50);
        doc.text(document.getElementById('totalEstimate').innerText, 20, 60);
    }

    // Save the PDF
    doc.save('quote.pdf');
}

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    const addScopeButton = document.getElementById('addScopeButton');
    if (addScopeButton) {
        addScopeButton.addEventListener('click', addScope);
    } else {
        console.error('Element with id "addScopeButton" not found');
    }

    const removeScopeButton = document.getElementById('removeScopeButton');
    if (removeScopeButton) {
        removeScopeButton.addEventListener('click', removeScope);
    } else {
        console.error('Element with id "removeScopeButton" not found');
    }

    // New event listeners for rate fields
    document.getElementById('ratePrincipal').addEventListener('input', updateRates);
    document.getElementById('rateEngineering').addEventListener('input', updateRates);
    document.getElementById('rateDrafting').addEventListener('input', updateRates);
    document.getElementById('rateTravel').addEventListener('input', updateRates);

    // Ensure rates are updated and total estimate is calculated on page load
    updateRates();


// Open the rates modal
function openRatesModal() {
    document.getElementById('ratesModal').style.display = 'block';
}

// Close the rates modal
function closeRatesModal() {
    document.getElementById('ratesModal').style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('ratesModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Function to update rates and recalculate total estimate
function updateRates() {
    rates.principal = parseFloat(document.getElementById('ratePrincipal').value) || 0;
    rates.engineering = parseFloat(document.getElementById('rateEngineering').value) || 0;
    rates.drafting = parseFloat(document.getElementById('rateDrafting').value) || 0;
    rates.travel = parseFloat(document.getElementById('rateTravel').value) || 0;
    calculateTotalEstimate();
}

// Function to calculate the total estimate
function calculateTotalEstimate() {
    let total = 0;
    for (let i = 1; i <= scopeCount; i++) {
        const hoursPrincipal = parseFloat(document.getElementById(`hoursPrincipal${i}`).value) || 0;
        const hoursEngineering = parseFloat(document.getElementById(`hoursEngineering${i}`).value) || 0;
        const hoursDrafting = parseFloat(document.getElementById(`hoursDrafting${i}`).value) || 0;
        const siteVisits = parseFloat(document.getElementById(`siteVisits${i}`).value) || 0;

        total += (hoursPrincipal * rates.principal) +
                 (hoursEngineering * rates.engineering) +
                 (hoursDrafting * rates.drafting) +
                 (siteVisits * rates.travel);
    }
    document.getElementById('totalEstimate').innerText = `$${total.toFixed(2)}`;
}

// Function to add a new scope of work
function addScope() {
    scopeCount++;
    const scopeContainer = document.getElementById('scopeContainer');
    const newScope = document.createElement('div');
    newScope.innerHTML = `
        <h3>Scope of Work ${scopeCount}</h3>

        <label for="scopeWork${scopeCount}">Scope of Work:</label>
        <select id="scopeWork${scopeCount}" name="scopeWork${scopeCount}" onchange="checkOtherScope(${scopeCount})">
            <option value="anchorage design">Anchorage Design</option>
            <option value="pipe support design">Pipe Support Design</option>
            <option value="other">Other</option>
        </select>

        <input type="text" id="otherScopeWork${scopeCount}" name="otherScopeWork${scopeCount}" placeholder="Enter other scope" style="display:none;">

        <label for="description${scopeCount}">Description:</label>
        <input type="text" id="description${scopeCount}" name="description${scopeCount}" required>

        <label for="hoursPrincipal${scopeCount}">Hours of Principal Engineer:</label>
        <input type="number" id="hoursPrincipal${scopeCount}" name="hoursPrincipal${scopeCount}" min="0" value="0" required>

        <label for="hoursEngineering${scopeCount}">Hours of Engineering:</label>
        <input type="number" id="hoursEngineering${scopeCount}" name="hoursEngineering${scopeCount}" min="0" value="0" required>

        <label for="hoursDrafting${scopeCount}">Hours of Drafting:</label>
        <input type="number" id="hoursDrafting${scopeCount}" name="hoursDrafting${scopeCount}" min="0" value="0" required>

        <label for="siteVisits${scopeCount}">Site Visits Needed:</label>
        <input type="number" id="siteVisits${scopeCount}" name="siteVisits${scopeCount}" min="0" value="0" required>

        <!-- Subtotal for Scope of Work ${scopeCount} -->
        <p id="subtotal${scopeCount}">Subtotal: $0.00</p>
    `;
    scopeContainer.appendChild(newScope);

    // Show the "Remove Last Scope of Work" button after adding a new scope
    const removeScopeButton = document.getElementById('removeScopeButton');
    if (removeScopeButton) {
        removeScopeButton.style.display = 'block';
    } else {
        console.error('Element with id "removeScopeButton" not found');
    }

    // Recalculate the total estimate
    calculateTotalEstimate();
}

// Function to remove the last scope of work
function removeScope() {
    if (scopeCount > 1) {
        const scopeContainer = document.getElementById('scopeContainer');
        scopeContainer.removeChild(scopeContainer.lastChild);
        scopeCount--;

        // Hide the "Remove Last Scope of Work" button if there's only one scope left
        const removeScopeButton = document.getElementById('removeScopeButton');
        if (removeScopeButton) {
            if (scopeCount === 1) {
                removeScopeButton.style.display = 'none';
            }
        } else {
            console.error('Element with id "removeScopeButton" not found');
        }

        // Recalculate the total estimate
        calculateTotalEstimate();
    }
}

// Function to generate PDF
async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Define the header
    function addHeader() {
        doc.setFontSize(18);
        doc.text('Zenith Engineers', 20, 10);
        doc.setFontSize(12);
        doc.text('Quoting Tool', 20, 16);
        doc.setFontSize(10);
        doc.text('Contact: conrad@zenithengineers.com | Phone: (415) 786-1700', 20, 22);
        doc.line(20, 24, 190, 24); // Horizontal line
    }

    // Define the footer
    function addFooter(pageNumber) {
        doc.setFontSize(10);
        doc.text(`Page ${pageNumber}`, 105, 290, null, null, 'center');
        doc.line(20, 285, 190, 285); // Horizontal line
        doc.setFontSize(8);
        doc.text('Zenith Engineers © 2023', 20, 292);
    }

    // Add header and footer to the first page
    addHeader();
    addFooter(1);

    doc.setFontSize(14);
    doc.text('Project Information', 20, 30);
    doc.text(`Project Address: ${document.getElementById('projectLocation').value}`, 20, 40);

    for (let i = 1; i <= scopeCount; i++) {
        if (i > 1) {
            doc.addPage();
            addHeader();
            addFooter(doc.internal.getNumberOfPages());
            doc.setFontSize(14); // Ensure font size is set for new page
        }

        let yOffset = 50;
        doc.text(`Scope of Work ${i}`, 20, yOffset);
        doc.text(`Scope: ${document.getElementById(`scopeWork${i}`).value}`, 20, yOffset + 10);
        doc.text(`Description: ${document.getElementById(`description${i}`).value}`, 20, yOffset + 20);
        doc.text(`Hours of Principal Engineer: ${document.getElementById(`hoursPrincipal${i}`).value}`, 20, yOffset + 30);
        doc.text(`Hours of Engineering: ${document.getElementById(`hoursEngineering${i}`).value}`, 20, yOffset + 40);
        doc.text(`Hours of Drafting: ${document.getElementById(`hoursDrafting${i}`).value}`, 20, yOffset + 50);
        doc.text(`Site Visits Needed: ${document.getElementById(`siteVisits${i}`).value}`, 20, yOffset + 60);

        const hoursPrincipal = parseFloat(document.getElementById(`hoursPrincipal${i}`).value) || 0;
        const hoursEngineering = parseFloat(document.getElementById(`hoursEngineering${i}`).value) || 0;
        const hoursDrafting = parseFloat(document.getElementById(`hoursDrafting${i}`).value) || 0;
        const siteVisits = parseFloat(document.getElementById(`siteVisits${i}`).value) || 0;

        const subtotal = (hoursPrincipal * rates.principal) +
                         (hoursEngineering * rates.engineering) +
                         (hoursDrafting * rates.drafting) +
                         (siteVisits * rates.travel);

        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, yOffset + 70);
    }

    // Add the attachment to the last page
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async function(event) {
            const fileContent = event.target.result;
            if (file.type.startsWith('image/')) {
                // Add image to the last page
                doc.addPage();
                doc.addImage(fileContent, 'JPEG', 10, 10, 180, 160);
                doc.save('quote.pdf');
            } else if (file.type === 'application/pdf') {
                // Add PDF to the last page using pdf-lib
                const existingPdfBytes = await fetch(fileContent).then(res => res.arrayBuffer());
                const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
                const pages = await doc.copyPages(pdfDoc, pdfDoc.getPageIndices());
                pages.forEach(page => {
                    doc.addPage(page);
                });
                doc.save('quote.pdf');
            }
        };
        reader.readAsDataURL(file);
    } else {
        // Save the PDF without attachment
        doc.save('quote.pdf');
    }
}


// Initialize the application
function init() {
    // Initialize Google Maps Places Autocomplete
    initAutocomplete();

    // Initialize the map
    initMap();

    // Add event listeners for rate fields
    document.getElementById('ratePrincipal').addEventListener('input', updateRates);
    document.getElementById('rateEngineering').addEventListener('input', updateRates);
    document.getElementById('rateDrafting').addEventListener('input', updateRates);
    document.getElementById('rateTravel').addEventListener('input', updateRates);

    // Ensure rates are updated and total estimate is calculated on page load
    updateRates();

    // Event listener for "Generate PDF" button
    const generatePdfButton = document.getElementById('generatePdfButton');
    if (generatePdfButton) {
        generatePdfButton.addEventListener('click', generatePDF);
    } else {
        console.error('Element with id "generatePdfButton" not found');
    }

    // Event listener for "View Hourly Rates" button
    const viewRatesButton = document.getElementById('viewRatesButton');
    if (viewRatesButton) {
        viewRatesButton.addEventListener('click', openRatesModal);
    } else {
        console.error('Element with id "viewRatesButton" not found');
    }
}

// Initialize Google Maps Places Autocomplete
function initAutocomplete() {
    const input = document.getElementById('projectLocation');
    if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', function() {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                console.error("No details available for input: '" + place.name + "'");
                return;
            }
            const location = place.geometry.location;
            updateMap(location.lat(), location.lng());
        });
        console.log('Autocomplete initialized');
    } else {
        console.error('Element with id "projectLocation" not found');
    }
}

// Initialize the map
let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
    marker = new google.maps.Marker({
        map: map
    });

    // Check if there's an address in the "Project Address" field and center the map on it
    const projectLocation = document.getElementById('projectLocation').value;
    if (projectLocation) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: projectLocation }, function(results, status) {
            if (status === 'OK') {
                const location = results[0].geometry.location;
                updateMap(location.lat(), location.lng());
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}

// Function to update the map based on the address input
function updateMap(lat, lng) {
    const location = new google.maps.LatLng(lat, lng);
    map.setCenter(location);
    marker.setPosition(location);
}

// Function to calculate the total estimate
function calculateTotalEstimate() {
    let total = 0;
    for (let i = 1; i <= scopeCount; i++) {
        const hoursPrincipal = parseFloat(document.getElementById(`hoursPrincipal${i}`).value) || 0;
        const hoursEngineering = parseFloat(document.getElementById(`hoursEngineering${i}`).value) || 0;
        const hoursDrafting = parseFloat(document.getElementById(`hoursDrafting${i}`).value) || 0;
        const siteVisits = parseFloat(document.getElementById(`siteVisits${i}`).value) || 0;

        total += (hoursPrincipal * rates.principal) +
                 (hoursEngineering * rates.engineering) +
                 (hoursDrafting * rates.drafting) +
                 (siteVisits * rates.travel);
    }
    document.getElementById('totalEstimate').innerText = `$${total.toFixed(2)}`;
}

// Save the rates and close the modal
function saveRates() {
    // Get the rates from the input fields
    const ratePrincipal = document.getElementById('ratePrincipal').value;
    const rateEngineering = document.getElementById('rateEngineering').value;
    const rateDrafting = document.getElementById('rateDrafting').value;
    const rateTravel = document.getElementById('rateTravel').value;

    // Save the rates (you can add your own logic here to save the rates)
    console.log('Rates saved:', {
        ratePrincipal,
        rateEngineering,
        rateDrafting,
        rateTravel
    });

    // Close the modal
    closeRatesModal();
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('ratesModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Function to update rates and recalculate total estimate
function updateRates() {
    const ratePrincipal = parseFloat(document.getElementById('ratePrincipal').value) || 0;
    const rateEngineering = parseFloat(document.getElementById('rateEngineering').value) || 0;
    const rateDrafting = parseFloat(document.getElementById('rateDrafting').value) || 0;
    const rateTravel = parseFloat(document.getElementById('rateTravel').value) || 0;

    // Update the rates in your application logic
    // For example, you might want to update some global variables or recalculate the total estimate
    console.log('Rates updated:', {
        ratePrincipal,
        rateEngineering,
        rateDrafting,
        rateTravel
    });

    // Recalculate the total estimate
    calculateTotalEstimate();
}

// Call the init function on page load
window.onload = init;
