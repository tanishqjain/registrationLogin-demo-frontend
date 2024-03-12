// Check if the URL contains the #customized fragment identifier
if (window.location.hash === '#customSection') {
    // Open the second card by default
    $('#customSection').collapse('show');
}

var EnvAndDcData = {}
// JavaScript function to add a new row of form elements
function addRow() {
    var additionalRowContainer = document.querySelector('.additional-row-container');
    var newRow = document.createElement('div');
    newRow.classList.add('form-row', 'additional-row');
    newRow.innerHTML = `
        <div class="form-group col-md-4">
            <select class="form-control" name="EnvironmentDetailed" onchange="populateCountries(event)" required>
                <option value="" disabled selected>Select Environment</option>
                <!-- Add options here as needed -->
            </select>
        </div>

        <div class="form-group col-md-4">
            <select class="form-control" name="country" onchange="populateBrands(event)" required>
                <option value="" disabled selected>Select Country</option>
                <!-- Add options here as needed -->
            </select>
        </div>

        <!-- Brand Dropdown -->
        <div class="form-group col-md-3">
            <select class="form-control" name="brand" required>
                <option value="" disabled selected>Select Brand</option>
                <!-- Add options here as needed -->
            </select>
        </div>

        <!-- Remove Button -->
        <div class="form-group col-md-1">
            <button type="button" class="btn btn-danger" onclick="removeRow(this)">Remove</button>
        </div>
    `;
    additionalRowContainer.appendChild(newRow);
    let environmentDropdown = newRow.querySelector(":first-Child select");
    const environments = [...new Set(EnvAndDcData.map(item => item.EnvironmentDetailed))];
            
            environmentDropdown.innerHTML = '<option value="" selected disabled>Select Environment</option>';

            environments.forEach(environment => {
                const option = document.createElement('option');
                option.value = environment;
                option.textContent = environment;
                environmentDropdown.appendChild(option);
            });


}

// JavaScript function to remove a row of form elements
function removeRow(button) {
    var rowToRemove = button.parentNode.parentNode;
    var container = rowToRemove.parentNode;

    // Check if it's the last row in the container
    if (container.children.length > 1) {
        // If not the last row, remove it
        rowToRemove.remove();
    } else {
        // If the last row, display an alert
        alert("Provide atleast one site!");
    }
}

function handleDropdownChange() {
    let dataCenterSelector = document.getElementById('custom-dataCenter');
    let environmentSelector = document.getElementById('custom-environment');

    let dataCenter = dataCenterSelector.value
    let environment = environmentSelector.value
    // Check if both dropdowns have valid selections
    if (dataCenter && environment) {
        // Show loading modal
        // dataCenterSelector.disabled = true
        // environmentSelector.disabled = true
        
        $('#loaderModal').modal('show');

        // Make API call (replace 'your_api_endpoint' with the actual endpoint)
        fetch('https://api-eu-nonprod.electrolux.com/external/cdc/dev/certificate-provisioning/v1.0/fetch-customize-data', {
            method: 'POST', // or 'GET' based on your API
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${readCookie("BearerToken")}`,
                'ocp-apim-subscription-key': 'a4d99ae0a37342a383f7fa4ea2aebc93'
                // Add additional headers if needed
            },
            body: JSON.stringify({
                dataCenter: dataCenter,
                environment: environment,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Get distinct environments
            EnvAndDcData = data;
            removeAllRowsExceptFirst();
            populateEnvironment(document.getElementById('first-customize-row'));
            // Hide loading modal
            $('#loaderModal').modal('hide');
        })
        .catch(error => {
            // Handle API call error
            console.error('API Call Error:', error);

            // Hide loading modal (in case of error)
            $('#loaderModal').modal('hide');
        });
    }
}

function removeAllRowsExceptFirst() {
    // Get all the additional rows except the first one
    var additionalRows = document.querySelectorAll('.additional-row-container .additional-row:not(:first-child)');

    // Remove each additional row
    additionalRows.forEach(function(row) {
        row.remove();
    });
}

function populateEnvironment(customizationRow){
    const environments = [...new Set(EnvAndDcData.map(item => item.EnvironmentDetailed))];
            
            let environmentDropdown = customizationRow.querySelector(":first-Child select");
            
            environmentDropdown.innerHTML = '<option value="" selected disabled>Select Environment</option>';
            
            let countryContainer = customizationRow.querySelector(":nth-child(2)")
            countryContainer.querySelector("select").innerHTML = '<option value="" selected disabled>Select Country <option>';
            
            let brandContainer = customizationRow.querySelector(":nth-child(3)")
            brandContainer.querySelector("select").innerHTML = '<option value="" selected disabled>Select Brand</option>';

            environments.forEach(environment => {
                const option = document.createElement('option');
                option.value = environment;
                option.textContent = environment;
                environmentDropdown.appendChild(option);
            });
}

// Function to populate countries based on selected environment
function populateCountries(event) {
    
    let countryDropdown = event.target.parentElement.nextElementSibling.querySelector("select");
    const selectedEnvironment = event.target.value;
    const countries = [...new Set(EnvAndDcData.filter(item => item.EnvironmentDetailed === selectedEnvironment).map(item => item.Country))];

    // Clear previous options
    //const countryDropdown = document.getElementById('countryDropdown');
    countryDropdown.innerHTML = '<option value="" selected disabled>Select Country</option>';

    // Populate the second dropdown with distinct countries
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryDropdown.appendChild(option);
    });

    // Clear third dropdown
    countryDropdown.parentElement.nextElementSibling.querySelector("select").innerHTML = '<option value="" selected disabled>Select Brand</option>';
}

// Function to populate brands based on selected country
function populateBrands(event) {
    let brandDropdown = event.target.parentElement.nextElementSibling.querySelector("select");
    const selectedCountry = event.target.value;
    const brands = [...new Set(EnvAndDcData.filter(item => item.Country === selectedCountry).map(item => item.Brand))];

    // Clear previous options
    //const brandDropdown = document.getElementById('brandDropdown');
    brandDropdown.innerHTML = '<option value="" selected disabled>Select Brand</option>';
    // Populate the third dropdown with distinct brands
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandDropdown.appendChild(option);
    });
}

// Function to show a confirmation dialog
function submitCustomized() {
    // Collect form data and create a summary
    var dataCenter = document.getElementById('custom-dataCenter').value;
    var environment = document.getElementById('custom-environment').value;
    var electroluxEmail = document.getElementById('custom-electroluxEmail').value;
    var developerEmail = document.getElementById('custom-developerEmail').value;

    const customizationSections = document.querySelectorAll('.additional-row');
    const customization = Array.from(customizationSections).map(section => {
        const brand = section.querySelector('[name="brand"]').value;
        const country = section.querySelector('[name="country"]').value;
        const EnvironmentDetailed = section.querySelector('[name="EnvironmentDetailed"]').value;

        return { brand, country, EnvironmentDetailed };
    });

     // Generate the confirmation summary
    var summary = "Confirmation\n";
    summary += "You are raising request for following domains\n"
    
    // Construct the string
    summary += customization.map(customizationItem => {
        const domain = findDomain(customizationItem);
        return `- ${domain}`;
    }).join('\n');

    // Display a confirmation dialog
    var confirmed = confirm(summary);

    // If confirmed, show loader modal
    if (confirmed) {
        $('#loaderModal').modal('show');

        // Make API call
        fetch('https://api-eu-nonprod.electrolux.com/external/cdc/dev/certificate-provisioning/v1.0/generate-csr-customize', {
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
                customization: customization
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

// Function to find domain for each customization item
function findDomain(customizationItem) {
    const matchingObject = EnvAndDcData.find(item =>
        item.Brand === customizationItem.brand &&
        item.Country === customizationItem.country &&
        item.EnvironmentDetailed === customizationItem.EnvironmentDetailed
    );

    return matchingObject ? matchingObject.Domain : "Domain not found";
}