fixture `REST Countries API Test`

test('GET ALL countries, with name and ccn3 filter', async t => {

    const response = await t.request({
        url: 'https://restcountries.com/v3.1/all',
        params: {
            fields: 'name,ccn3'
        },
        method: 'get'
    });

    // Check the response status and content type
    await t
        .expect(response.status).eql(200)
        .expect(response.headers['content-type']).contains('application/json')
        .expect(parseInt(response.headers['content-length'], 10)).gte(53000) //should be size of approx 53045
    ;
  
    //loop through the response.body to create a dictionary of countries
    const countryDictionary: ICountryAbbrevDictionary = {};
    for (let index = 0; index < 300; index++) {
        const c: CountryAbbrev = response.body[index];
        //if c is null, break the loop
        if (!c) {
            //console.debug(index)  //how many countries were created
            break;
        }
        //add c to countryDicitionary
        countryDictionary[c.ccn3] = c;
    }

        // Reusable function to check country details
    async function checkCountryDetails(t: TestController, countryDictionary: ICountryAbbrevDictionary, ccn3: string, expectedCommonName: string) {
        const country = countryDictionary[ccn3] as CountryAbbrev;
        await t.expect(country.name.common).eql(expectedCommonName);
    }

    await checkCountryDetails(t, countryDictionary, "840", "United States");
    await checkCountryDetails(t, countryDictionary, "376", "Israel");
    await checkCountryDetails(t, countryDictionary, "826", "United Kingdom");
    await checkCountryDetails(t, countryDictionary, "484", "Mexico");
    await checkCountryDetails(t, countryDictionary, "162", "Christmas Island");

    //drill deeper into a country object, via a check on Switzerland
    var c1 = countryDictionary["756"] as CountryAbbrev; 
    await t
        .expect(c1.name.common).eql('Switzerland')
        .expect(c1.name.official).eql('Swiss Confederation');
    }
);

interface CountryAbbrev {
    "name": {
        "common": string,
        "official": string,
        "nativeName": {
            "eng": {
                "official": string,
                "common": string
            }
        }
    },
    "ccn3": string
}

interface ICountryAbbrevDictionary {
    [key:string]: CountryAbbrev;
}

