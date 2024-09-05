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

    // Show the "Remove Last Scope of Work" button after adding a new scope
    document.getElementById('removeScopeButton').style.display = 'block';
}

function removeScope() {
    if (scopeCount > 1) {
        const scopeContainer = document.getElementById('scopeContainer');
        scopeContainer.removeChild(scopeContainer.lastChild);
        scopeCount--;

        // Hide the "Remove Last Scope of Work" button if there's only one scope left
        if (scopeCount === 1) {
            document.getElementById('removeScopeButton').style.display = 'none';
        }
    }
}

document.getElementById('addScopeButton').addEventListener('click', addScope);
document.getElementById('removeScopeButton').addEventListener('click', removeScope);

function checkOtherScope(scopeNum) {
    const dropdown = document.getElementById(`scopeWork${scopeNum}`);
    const otherScopeInput = document.getElementById(`otherScopeWork${scopeNum}`);
    if (dropdown.value === 'other') {
        otherScopeInput.style.display = 'block';
