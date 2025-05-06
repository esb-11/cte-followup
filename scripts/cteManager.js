const BASES = {
    "17162579000191": "BHZ",
    "17162579004936": "MRC",
    "17162579001244": "MEA",
    "17162579001830": "JPA",
    "17162579002640": "CGN",
    "17162579002720": "FZN",
    "17162579004189": "AJU",
    "17162579002992": "SSA",
    "17162579002135": "VIX",
    "17162579000868": "BSB",
    "17162579000949": "SPN",
};

const CARRIERS = {
    "02012862": "LATAM",
};

const parser = new DOMParser();
const cteList = [];

function addCte(xmlString) {
    const cteXml = parser.parseFromString(xmlString, "text/xml");
    if (!cteXml) {
        console.log("Invalid file");
        return 1;
    }

    const cte = cteFactory(cteXml);
    cteList.push(cte);
}

function cteFactory(cteXml) {
    const sender = cteXml.getElementsByTagName("rem")[0];
    const originCNPJ = sender.getElementsByTagName("CNPJ")[0]; // Base origem

    const carrier = cteXml.getElementsByTagName("emit")[0];
    const carrierCNPJ = carrier.getElementsByTagName("CNPJ")[0]; // Transportadora

    const trackingNumber = cteXml.getElementsByTagName("nOCA")[0]; // AWB
    const numCTE = cteXml.getElementsByTagName("nCT")[0]; // Numero do CTE
    const value = cteXml.getElementsByTagName("vRec")[0]; // Valor Total

    // if (!originCNPJ || !carrierCNPJ || !trackingNumber || !numCTE || !value) {
    //     console.log(originCNPJ);
    //     console.log(carrierCNPJ);
    //     console.log(trackingNumber);
    //     console.log(numCTE);
    //     console.log(value);
    // }

    const origin = originCNPJ ? BASES[originCNPJ.textContent] : "UNK";

    return {
        origin,
        carrier: CARRIERS[carrierCNPJ.textContent.slice(0, 8)],
        trackingNumber: trackingNumber.textContent,
        cte: numCTE.textContent,
        value: value.textContent,
    };
}

function getTotalValue(list) {
    let total = 0;
    
    cteList.forEach((cte) => {
        // console.log(parseFloat(cte.value));
        total += parseFloat(cte.value);
        console.log(total);
    });

    return total;
}

const cteManager = { addCte, cteList, getTotalValue };

export { cteManager };
