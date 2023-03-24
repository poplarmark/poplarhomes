function addProperty(property, utm, token) {
    fetch("https://www.poplarhomes.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify({
            query: `mutation {
                        addProperty(input: {
                            property: {
                            type: ${property.type},
                            propertyCategory: ${property.propertyCategory},
                            numBeds: ${property.numBeds},
                            numBaths: ${property.numBaths},
                            street: "${property.street}",
                            city: "${property.city}",
                            state: "${property.state}",
                            zipCode: "${property.zipCode}",
                            country: "USA"
                        },
                        UTMCampaign: "${utm.UTMCampaign}",
                        UTMContent: "${utm.UTMContent}",
                        UTMMedium: "${utm.UTMMedium}",
                        UTMSource: "${utm.UTMSource}",
                        UTMTerm: "${utm.UTMTerm}",
                        }) {
                            property {
                            propertyID
                            unitNumber
                            name
                            numBaths
                            numBeds
                            status
                            type
                            communityFeatures
                            interiorFeatures
                            exteriorFeatures
                            appliances
                            isFurnished
                            petPolicy
                            petInformation
                            climateControls
                            washerDryerType
                            additionalRooms
                            desiredLeaseRange
                            storageType
                            storageFee
                            parkingTypes
                            renterResponsibleUtilities
                            ownerResponsibleUtilities
                            latitude
                            longitude
                            totalArea
                            street
                            city
                            state
                            country
                            county
                            zipCode
                        }
                    }
                }`,
            }),
        })
        .then((res) => res.json())
        .then((res) => {})
        .catch((error) => {
            console.log(error);
        });
    }