// Function to show a confirmation dialog
function submitStandard() {
    // Collect form data and create a summary
    var dataCenter = document.getElementById('dataCenter').value;
    var environment = document.getElementById('environment').value;
    var electroluxEmail = document.getElementById('electroluxEmail').value;
    var developerEmail = document.getElementById('developerEmail').value;

    var summary = "Confirmation:\n";
    summary += "Data Center: " + dataCenter + "\n";
    summary += "Environment: " + environment + "\n";
    summary += "Electrolux POC Email: " + electroluxEmail + "\n";
    summary += "Developer Email: " + developerEmail + "\n";

    // Display a confirmation dialog
    var confirmed = confirm(summary);

    // If confirmed, show loader modal
    if (confirmed) {
        $('#loaderModal').modal('show');

        // Make API call
        fetch('https://api-eu-nonprod.electrolux.com/external/cdc/dev/certificate-provisioning/v1.0/generate-csr', {
            method: 'POST', // or 'GET' based on your API
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${readCookie("BearerToken")}`,
                'ocp-apim-subscription-key': 'a4d99ae0a37342a383f7fa4ea2aebc93'
                // You may need to include additional headers (e.g., authorization) based on your API requirements
            },
            body: JSON.stringify({
                dataCenter: dataCenter,
                environment: environment,
                emailAddress: electroluxEmail,
                developerEmail: developerEmail,
            }),
        })
        .then(response => response.blob())
        .then(blob => {
            // Hide loader modal
            $('#loaderModal').modal('hide');

            // Trigger the download using a hidden iframe
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = window.URL.createObjectURL(blob);
            document.body.appendChild(iframe);

            // Remove the iframe after the download
            iframe.onload = function () {
                document.body.removeChild(iframe);
            };
        })
        .catch(error => {
            // Handle error
            console.error('API Call Error:', error);
            alert('Failed to make API call.');
            $('#loaderModal').modal('hide');
        });
    }

    // Return false to prevent the form from being submitted here
    return false;
}