function validateForm() {
    let isValid = true;

    // Get form values
    let name = document.getElementById("clientName").value.trim();
    let mobile = document.getElementById("mobileNumber").value.trim();
    let nameError = document.getElementById("nameError");
    let mobileError = document.getElementById("mobileError");

    // Clear previous errors
    nameError.textContent = "";
    mobileError.textContent = "";

    // Name Validation (Only letters and spaces)
    let nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name) || name.length < 3) {
        nameError.textContent = "Enter a valid name (letters only, min 3 characters)";
        isValid = false;
    }

    // Mobile Number Validation (Only numbers, 10-15 digits)
    let mobileRegex = /^[0-9]{10,15}$/;
    if (!mobileRegex.test(mobile)) {
        mobileError.textContent = "Enter a valid mobile number (10-15 digits)";
        isValid = false;
    }

    // If valid, enable PDF download button
    if (isValid) {
        document.getElementById("downloadPdf").classList.remove("d-none");
        downloadPDF();
    }
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    // Ensure autoTable is available
    if (typeof doc.autoTable !== "function") {
        alert("Error: autoTable plugin is missing.");
        return;
    }

    // Get form data
    let clientName = document.getElementById("clientName").value;
    let mobileNumber = document.getElementById("mobileNumber").value;
    let projectDesc = document.getElementById("projectDesc").value;
    let designCost = parseFloat(document.getElementById("designCost").value) || 0;
    let devCost = parseFloat(document.getElementById("devCost").value) || 0;
    let hostingCost = parseFloat(document.getElementById("hostingCost").value) || 0;
    let maintenanceCost = parseFloat(document.getElementById("maintenanceCost").value) || 0;
    let totalCost = designCost + devCost + hostingCost + maintenanceCost;

    // Add Company Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Shree Ram Developers", 60, 20);

    // Add Quotation Title
    doc.setFontSize(14);
    doc.text("Website Design & Development Quotation", 60, 35);

    // Client & Project Information
    doc.setFontSize(12);
    doc.text(`Client Name: ${clientName}`, 20, 50);
    doc.text(`Mobile Number: ${mobileNumber}`, 20, 60);
    doc.text(`Project Description: ${projectDesc}`, 20, 70);

    // Create Table with autoTable
    doc.autoTable({
        startY: 80,
        head: [['Description', 'Cost (USD)']], // Table Headers
        body: [
            ['Design Cost', `$${designCost.toFixed(2)}`],
            ['Development Cost', `$${devCost.toFixed(2)}`],
            ['Hosting Cost', `$${hostingCost.toFixed(2)}`],
            ['Maintenance Cost', `$${maintenanceCost.toFixed(2)}`],
            [{ content: 'Total Cost', styles: { fontStyle: 'bold' } }, { content: `$${totalCost.toFixed(2)}`, styles: { fontStyle: 'bold' } }]
        ],
        theme: 'grid',
        styles: { fontSize: 12, cellPadding: 5 },
        headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
        bodyStyles: { textColor: [0, 0, 0] }
    });

    // Save PDF
    doc.save(clientName + " "+mobileNumber + ".pdf");
}
