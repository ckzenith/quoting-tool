let scopeCount = 1;

function addScope() {
    scopeCount++;
    const scopeContainer = document.getElementById('scopeContainer');
    const newScope = document.createElement('div');
    newScope.innerHTML = `
        <h3>Scope of Work ${scopeCount}</h3>
        <label for="scope${scopeCount}">Description:</label>
        <input type="text" id="scope${scopeCount}" name="scope${scopeCount}" required>
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

document.getElementById('addScopeButton').addEventListener('click', addScope);

function calculateTotal() {
    const principalEngineerRate = parseFloat(document.getElementById('principalEngineerRate').value);
    const engineeringRate = parseFloat(document.getElementById('engineeringRate').value);
    const draftingRate = parseFloat(document.getElementById('draftingRate').value);
    const siteVisitFee = parseFloat(document.getElementById('siteVisitFee').value);
    const travelFee = parseFloat(document.getElementById('travelFee').value);
    let totalBeforeDiscount = travelFee;

    for (let i = 1; i <= scopeCount; i++) {
        const hoursPrincipal = parseFloat(document.getElementById(`hoursPrincipal${i}`).value);
        const hoursEngineering = parseFloat(document.getElementById(`hoursEngineering${i}`).value);
        const hoursDrafting = parseFloat(document.getElementById(`hoursDrafting${i}`).value);
        const siteVisits = parseFloat(document.getElementById(`siteVisits${i}`).value);
        totalBeforeDiscount += (hoursPrincipal * principalEngineerRate) + 
                               (hoursEngineering * engineeringRate) + 
                               (hoursDrafting * draftingRate) + 
                               (siteVisits * siteVisitFee);
    }

    const clientDiscount = parseFloat(document.getElementById('clientDiscount').value) / 100;
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

