const countryStateMap = {
    'India': ["Maharashtra","Madhya Pradesh","Telangana"],
    'United States': ["California", "Texas","Florida"],
    'Sweden': ["Bohuslän","Dalsland","Västergötland","Östergötland","Småland","Öland","Gotland","Halland"]
}

const dropDownHtml = `<option value="value" selected="selected" data-translation-key="DROPDOWN_41399066006529016_CHOICES_2063C1608D6E0BAF80249C42E2BE5804" data-screenset-element-id="__gig_template_element_82_1681734044821" data-screenset-element-id-publish="false" data-screenset-roles="instance">Default</option>`

function onFieldChangeHandler(event){
    if(event.screen === 'gigya-register-screen'){
        if(event.field === 'profile.country'){
            states = countryStateMap[event.value]
            if(states.length > 0){
                $("#gigya-dropdown-111227722184183000").empty();
                $.each(states, function(index, state){
                    $("#gigya-dropdown-111227722184183000").append(`<option value=${state} data-screenset-element-id-publish="false" data-screenset-roles="instance">${state}</option>`)
                })
            }
        }
    }
}

// function onSubmitHandler(event){
    
//     if(event.screen === "Registration-tc-poc"){
//         var countryConsentMap = {
//             "SG": "ElectroluxGroup",
//             "MY": "termsofservice_elx"
//         };
        
//         var terms = {};
//         terms[countryConsentMap[ACC.eluxGigyaCountry]] = {'isConsentGranted': true};
       
//        Object.assign(event.formModel.preferences, {terms});
//     }
// }