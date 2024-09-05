function calculateTotal() {
    // Get rates
    const principalEngineerRate = parseFloat(document.getElementById('principalEngineerRate').value);
    const engineeringRate = parseFloat(document.getElementById('engineeringRate').value);
    const draftingRate = parseFloat(document.getElementById('draftingRate').value);
    const siteVisitFee = parseFloat(document.getElementById('siteVisitFee').value);
    const travelFee = parseFloat(document.getElementById('travelFee').value);

    // Get hours for Scope 1
    const hoursPrincipal1 = parseFloat(document.getElementById('hoursPrincipal1').value);
    const hoursEngineering1 = parseFloat(document.getElementById('hoursEngineering1').value);
    const hoursDrafting1 = parseFloat(document.getElementById('hoursDrafting1').value);
    const siteVisits1 = parseFloat(document.getElementById('siteVisits1').value);

    // Get hours for Scope 2
    const hoursPrincipal2 = parseFloat(document.getElementById('hoursPrincipal2').value);
    const hoursEngineering2 = parseFloat(document.getElementById('hoursEngineering2').value);
    const hoursDrafting2 = parseFloat(document.getElementById('hoursDrafting2').value);
    const siteVisits2 = parseFloat(document.getElementById('siteVisits2').value);

    // Get hours for Scope 3
    const hoursPrincipal3 = parseFloat(document.getElementById('hoursPrincipal3').value);
    const hoursEngineering3 = parseFloat(document.getElementById('hoursEngineering3').value);
    const hoursDrafting3 = parseFloat(document.getElementById('hoursDrafting3').value);
    const siteVisits3 = parseFloat(document.getElementById('siteVisits3').value);

    // Calculate cost for Scope 1
    const scope1Cost = (hoursPrincipal1 * principalEngineerRate) + 
                       (hoursEngineering1 * engineeringRate) + 
                       (hoursDrafting1 * draftingRate) + 
                       (siteVisits1 * siteVisitFee);

    // Calculate cost for Scope 2
    const scope2Cost = (hoursPrincipal2 * principalEngineerRate) + 
                       (hoursEngineering2 * engineeringRate) + 
                       (hoursDrafting2 * draftingRate) + 
                       (siteVisits2 * siteVisitFee);

    // Calculate cost for Scope 3
    const scope3Cost = (hoursPrincipal3 * principalEngineerRate) + 
                       (hoursEngineering3 * engineeringRate) + 
                       (hoursDrafting3 * draftingRate) + 
                       (siteVisits3 * siteVisitFee);

    // Calculate total cost before discount
    const totalBeforeDiscount = scope1Cost + scope2Cost + scope3Cost + travelFee;

    // Get discount
    const clientDiscount = parseFloat(document.getElementById('clientDiscount').value) / 100;

    // Calculate total after discount
    const totalAfterDiscount = totalBeforeDiscount * (1 - clientDiscount);

    // Display total
    document.getElementById('totalEstimate').innerText = `$${totalAfterDiscount.toFixed(2)}`;
}

