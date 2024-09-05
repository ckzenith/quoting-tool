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
        
       
