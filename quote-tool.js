let scopeCount = 1;

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
    `;
    scopeContainer.appendChild(newScope);
}

function removeScope() {
    if (scopeCount > 1) {
        const scopeContainer = document.getElementById('scopeContainer');
        scopeContainer.removeChild(scopeContainer.lastChild);
        scopeCount--;
    }
}

document.getElementById('addScopeButton').addEventListener('click', addScope);
document.getElementById('removeScopeButton').addEventListener('click', removeScope);

function checkOtherScope(scopeNum) {
    const dropdown = document.getElementById(`scopeWork${scopeNum}`);
    const otherScopeInput = document.getElementById(`otherScopeWork${scopeNum}`);
    if (dropdown.value === 'other') {
        otherScopeInput.style.display = 'block';
    } else {
        otherScopeInput.style.display = 'none';
    }
}

function calculateTotal() {
    const principalEngineerRate = parseFloat(document.getElementById('principalEngineerRate').value) || 0;
    const engineeringRate = parseFloat(document.getElementById('engineeringRate').value) || 0;
    const draftingRate = parseFloat(document.getElementById('draftingRate').value) || 0;
    const siteVisitFee = parseFloat(document.getElementById('siteVisitFee').value) || 0;
    const travelFee = parseFloat(document.getElementById('travelFee').value) || 0;
    let totalBeforeDiscount = travelFee;

    for (let i = 1; i <= scopeCount; i++) {
        const hoursPrincipal = parseFloat(document.getElementById(`hoursPrincipal${i}`).value) || 0;
        const hoursEngineering = parseFloat(document.getElementById(`hoursEngineering${i}`).value) || 0;
        const hoursDrafting = parseFloat(document.getElementById(`hoursDrafting${i}`).value) || 0;
        const siteVisits = parseFloat(document.getElementById(`siteVisits${i}`).value) || 0;

        totalBeforeDiscount += (hoursPrincipal * principalEngineerRate) + 
                               (hoursEngineering * engineeringRate) + 
                               (hoursDrafting * draftingRate) + 
                               (siteVisits * siteVisitFee);
    }

    const clientDiscount = parseFloat(document.getElementById('clientDiscount').value) / 100 || 0;
    const totalAfterDiscount = totalBeforeDiscount * (1 - clientDiscount);

    document.getElementById('totalEstimate').innerText = `$${totalAfterDiscount.toFixed(2)}`;
}

function generatePDF() {
    const quoteForm = document.getElementById('quoteForm');
    const pdfContent = quoteForm.innerHTML;  // Simplified version; you might want to customize this
    const newWindow = window.open();
    newWindow.document.write('<html><head><title>Quote PDF</title></head><body>');
    newWindow.document.write(pdfContent);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
}

function initializeAutocomplete() {
    const input = document.getElementById('projectLocation');
    const autocomplete = new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initializeAutocomplete);
