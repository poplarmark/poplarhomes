function registerOwner(user, property, utm) {
    fetch("https://www.poplarhomes.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query: `mutation {
                    registerOwner(input: {
                        user: {
                            firstName: "${user.firstName}",
                            lastName: "${user.lastName}",
                            email: "${user.email}",
                            phone: "${user.phone}",
                            UTMCampaign: "${utm.UTMCampaign}",
                            UTMContent: "${utm.UTMContent}",
                            UTMMedium: "${utm.UTMMedium}",
                            UTMSource: "${utm.UTMSource}",
                            UTMTerm: "${utm.UTMTerm}",
                            leadSource: ONERENT_WEBSITE_GET_RENT_ESTIMATE_LANDING_PAGE
                        }}) {
                            token
                        }
                    }`,
                }),
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.errors) {
                    let today = new Date(),
                        date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
                        time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
                        dateTime = date + " " + time;
                    
                        let googleSheetData = {
                            Timestamp: dateTime,
                            Name: `${user.firstName} ${user.lastName}`,
                            Email: `${user.email}`,
                            phone: `${user.phone}`,
                            Location: autocomplete_input.value,
                            "Submission Error": "true",
                            utm_source: `WEB-${utm.UTMSource}`,
                            utm_campaign: `${utm.UTMCampaign}`,
                            utm_medium: `${utm.UTMMedium}`,
                            utm_content: `${utm.UTMContent}`,
                        };
                        pipeToGoogleSheet("https://script.google.com/macros/s/AKfycbwdTw0XzSPs4Y1Fou6jdLToblFjZneJZGRd2EEowbOMpTgX5te8/exec", googleSheetData);
                        return false;
                    }
                    let token = res.data.registerOwner.token;
                    addProperty(property, utm, token);
                })
                .catch((error) => {
                    console.log(error);
                });
            }