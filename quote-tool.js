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
    }

    // Add total estimate on the last page
    doc.addPage();
    addHeader();
    addFooter(doc.internal.getNumberOfPages());
    doc.setFontSize(14); // Ensure font size is set for new page
    doc.text('Total Estimate', 20, 50);
    doc.text(document.getElementById('totalEstimate').innerText, 20, 60);

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

    // Event listener for "Generate PDF" button
    const generatePdfButton = document.getElementById('generatePdfButton');
    if (generatePdfButton) {
        generatePdfButton.addEventListener('click', generatePDF);
    } else {
        console.error('Element with id "generatePdfButton" not found');
    }
   
    // Initialize Google Maps Places Autocomplete
function initAutocomplete() {
    const input = document.getElementById('projectLocation');
    if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input);
        console.log('Autocomplete initialized');
    } else {
        console.error('Element with id "projectLocation" not found');
    }
}
});
