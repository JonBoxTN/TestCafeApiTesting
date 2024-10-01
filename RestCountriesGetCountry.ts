fixture `REST Countries API Test`

test('GET country Grenada', async t => {


    const response = await t.request({
        url: 'https://restcountries.com/v3.1/alpha/308',
        method: 'get'
    });


    // Check the response status and content type
    await t
        .expect(response.status).eql(200)
        .expect(response.headers['content-type']).contains('application/json')
        .expect(parseInt(response.headers['content-length'], 10)).eql(3007)
    ;
  
    //convert the response.body to a country object
    const country: Country = response.body[0];
    await t
        .expect(country.name.common).eql('Grenada')
        .expect(country.cca2.toUpperCase()).eql('GD')
        .expect(country.cca3.toUpperCase()).eql('GRD')
        .expect(country.continents[0].toUpperCase()).eql('NORTH AMERICA')
        .expect(country.startOfWeek.toUpperCase()).eql('MONDAY')
        .expect(country.capital[0].toUpperCase()).eql('ST. GEORGE\'S')
        .expect(country.capitalInfo.latlng[0]).eql(32.38) //latitude
        .expect(country.capitalInfo.latlng[1]).eql(-64.68) //longitude
        .expect(country.flags.png).contains('gd.png')
        .expect(country.maps.openStreetMaps.toUpperCase()).eql('HTTPS://WWW.OPENSTREETMAP.ORG/RELATION/550727')
        .expect(country.timezones[0]).eql('UTC-04:00')
        .expect(country.currencies.XCD.name).eql('Eastern Caribbean dollar')
        .expect(country.region).eql('Americas')
        .expect(country.subregion).eql('Caribbean')
        .expect(country.population).within(100000,115000) // numeric range check
        .expect(country.car.side).eql('left')
 

});


//created these with Github Copilot
interface Name {
    common: string;
    official: string;
    nativeName: {
        [key: string]: {
            official: string;
            common: string;
        };
    };
}

interface Currency {
    name: string;
    symbol: string;
}

interface Idd {
    root: string;
    suffixes: string[];
}

interface Translation {
    official: string;
    common: string;
}

interface Demonyms {
    eng: {
        f: string;
        m: string;
    };
    fra: {
        f: string;
        m: string;
    };
}

interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

interface Flags {
    png: string;
    svg: string;
    alt: string;
}

interface CoatOfArms {
    png: string;
    svg: string;
}

interface CapitalInfo {
    latlng: number[];
}

interface Car {
    signs: string[];
    side: string;
}

interface Country {
    name: Name;
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: {
        [key: string]: Currency;
    };
    idd: Idd;
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: {
        [key: string]: string;
    };
    translations: {
        [key: string]: Translation;
    };
    latlng: number[];
    landlocked: boolean;
    area: number;
    demonyms: Demonyms;
    flag: string;
    maps: Maps;
    population: number;
    fifa: string;
    car: Car;
    timezones: string[];
    continents: string[];
    flags: Flags;
    coatOfArms: CoatOfArms;
    startOfWeek: string;
    capitalInfo: CapitalInfo;
}
