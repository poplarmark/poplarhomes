<script type="text/javascript">
$('form[action^="https://api.hsforms.com"]').each(function (i) { // intercept forms whos action goes to hubspot
    $(this).find("input[type=checkbox]").val("true")
    $(this).submit(function (e) { // when the form submits
        e.preventDefault() //stop the form from submitting to webflow
        const formData = new FormData(e.target) // get the form data
        const parsedFormData = [...formData.entries()].map(dataObject => ({ // convert data to array
            name: dataObject[0], // make sure the name of the input is the same as the hubspot input name
            value: dataObject[1]  // the value of the input
        }))
        const goToWebinarWebinarKey = parsedFormData.find(input => input.name === 'goToWebinarWebinarKey')?.value // looks for an input with the name goToWebinarWebinarKey
        const sfdcCampaignId = parsedFormData.find(input => input.name === 'sfdcCampaignId')?.value// looks for an input with the name sfdcCampaignId
        const hutk = document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1") || undefined // looks for an input with the name hutk, the hubspot user token
        console.log(hutk)
        const processingPrompt = $(this).find("[id*='gdpr-processing-prompt']")// looks for an element with the id gdpr-processing-prompt
        const communicationConsent = parsedFormData.filter(item => item.name.includes('LEGAL_CONSENT')).map(item => { // finds LEGAL_CONSENT options and stores them
            const element = $(`#${item.name.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1")}`)[0] // checks if they've checked the checkbox to consent
            const label = $("span[for='" + $(element).attr('id').replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1") + "']") // gets the label of the checkbox
            return {
                value: element.checked,
                text: label.text(),
                subscriptionTypeId: parseInt(item.name.split("LEGAL_CONSENT.subscription_type_")[1]) // the subscription the user is consenting to
            }
        })
        const ignoredFields = ["cc-num", "cc-number", "gdpr", "LEGAL_CONSENT", "goToWebinarWebinarKey", "sfdcCampaignId"]
        const data = { // the data we send to hubspot
            "fields": parsedFormData.filter(item => !ignoredFields.find(ignoredField => item.name.includes(ignoredField))), // set the form data but ignore certain fields
            "context": {
                "pageUri": window.location.href, // log the current url
                "pageName": document.title, // log the pages title
                "sfdcCampaignId": sfdcCampaignId, // salesforce campaign id
                "goToWebinarKey": goToWebinarWebinarKey, // go to meeting key
                "hutk": hutk, // hubspot user token
            },
            ...(!processingPrompt) ? {}
                : {
                    "legalConsentOptions": {
                        "consent": {
                            ...(!processingPrompt) ? {}
                                : {
                                    "consentToProcess": true,
                                    "text": processingPrompt.text(),
                                },
                            ...(!communicationConsent) ? {}
                                : {
                                    "communications": communicationConsent
                                }
                        }
                    }
                }
        }
        const final_data = JSON.stringify(data) // turn that javascript object into a json string
        $.ajax({
            url: e.target.action,
            method: "POST",
            dataType: "json",
            data: final_data,
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response) {
                    if (response.inlineMessage) {
                        const parent = $(e.target).parent()
                        // parent.children("form").css("display", "none") // hide form
                        parent.children(".w-form-done").show() // replace .w-form-done with your own form done section
                    } else if (response.redirectUri) {
                        window.location.href = response.redirectUri
                    }
                } else {
                    console.log('response but no inlineMessage or redirectUri')
                }
            },
            // error: function () {
            //     console.log("error on the form submitting")
            //     $(e.target).css('display', 'none').siblings('.w-form-fail').css('display', 'block') // replace .w-form-fail with your own form done section
            // }
        })
    })
})
 </script>