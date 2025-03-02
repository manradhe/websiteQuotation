function generateQuotation() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    // Ensure autoTable is available
    if (!doc.autoTable) {
        console.error("autoTable plugin is missing!");
        return;
    }

    // Base64 Logo (Replace with your actual Base64 logo)
    let logoBase64 = "data:image/png;base64,iVBORw0KGgo...";

    // Add Company Logo
    doc.addImage(logoBase64, "PNG", 10, 10, 40, 20);

    // Add Company Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Shree Ram Developers", 60, 20);

    // Add Quotation Title
    doc.setFontSize(14);
    doc.text("Website Design & Development Quotation", 60, 35);

    // Get Form Data
    let clientName = document.getElementById("clientName").value;
    let mobilenumber = document.getElementById("mobilenumber").value;
    let projectDesc = document.getElementById("projectDesc").value;
    let designCost = parseFloat(document.getElementById("designCost").value) || 0;
    let devCost = parseFloat(document.getElementById("devCost").value) || 0;
    let hostingCost = parseFloat(document.getElementById("hostingCost").value) || 0;
    let maintenanceCost = parseFloat(document.getElementById("maintenanceCost").value) || 0;
    let totalCost = designCost + devCost + hostingCost + maintenanceCost;

    // Client & Project Information
    doc.setFontSize(12);
    doc.text(`Client Name: ${clientName}`, 20, 50);
    doc.text(`Contact: ${mobilenumber}`, 20, 50);
    doc.text(`Project Description: ${projectDesc}`, 20, 60);

    // Create Table with autoTable
    doc.autoTable({
        startY: 70,
        head: [['Description', 'Cost (USD)']], // Table Headers
        body: [
            ['Design Cost', `$${designCost.toFixed(2)}`],
            ['Development Cost', `$${devCost.toFixed(2)}`],
            ['Hosting Cost', `$${hostingCost.toFixed(2)}`],
            ['Maintenance Cost', `$${maintenanceCost.toFixed(2)}`],
            [{ content: 'Total Cost', styles: { fontStyle: 'bold' } }, { content: `$${totalCost.toFixed(2)}`, styles: { fontStyle: 'bold' } }]
        ],
        theme: 'grid', // Grid-style table
        styles: { fontSize: 12, cellPadding: 5 },
        headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] }, // Blue header
        bodyStyles: { textColor: [0, 0, 0] }
    });

    // Save PDF
    doc.save(clientName +" "+ mobilenumber +".pdf");
}
