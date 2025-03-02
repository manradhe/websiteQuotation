function generateQuotation() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    // Load images
    let logo = new Image();
    logo.src = "logo.png"; // Place your company logo in the project folder

    let background = new Image();
    background.src = "background.jpg"; // Background image file

    logo.onload = function () {
        background.onload = function () {
            // Draw Background Image (Full Page)
            doc.addImage(background, "jpg", 0, 0, 210, 297); // A4 Size (210x297 mm)

            // Add Company Logo
            doc.addImage(logo, "PNG", 10, 10, 40, 20); // Adjust position and size

            // Add Company Name
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("Shree Ram Developers", 60, 20);

            // Get form data
            let clientName = document.getElementById("clientName").value;
            let projectDesc = document.getElementById("projectDesc").value;
            let designCost = parseFloat(document.getElementById("designCost").value) || 0;
            let devCost = parseFloat(document.getElementById("devCost").value) || 0;
            let hostingCost = parseFloat(document.getElementById("hostingCost").value) || 0;
            let maintenanceCost = parseFloat(document.getElementById("maintenanceCost").value) || 0;
            let totalCost = designCost + devCost + hostingCost + maintenanceCost;

            // Add Quotation Details
            doc.setFontSize(12);
            doc.text(`Client: ${clientName}`, 20, 50);
            doc.text(`Project: ${projectDesc}`, 20, 60);
            doc.text(`Design Cost: $${designCost.toFixed(2)}`, 20, 80);
            doc.text(`Development Cost: $${devCost.toFixed(2)}`, 20, 90);
            doc.text(`Hosting Cost: $${hostingCost.toFixed(2)}`, 20, 100);
            doc.text(`Maintenance Cost: $${maintenanceCost.toFixed(2)}`, 20, 110);
            doc.text(`Total Cost: $${totalCost.toFixed(2)}`, 20, 130);

            // Save PDF
            doc.save(clientName+".pdf");
        };
    };
}
