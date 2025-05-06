const COLUMNS = [
    makeColumn("Base", "origin"),
    makeColumn("Transportadora", "carrier"),
    makeColumn("AWB", "trackingNumber"),
    makeColumn("CTE", "cte"),
    makeColumn("Valor", "value"),
];

function render(cteList) {
    const table = createTable();
    const tbody = table.querySelector("tbody");

    cteList.forEach((element) => {
        const cte = createRow(element);
        tbody.appendChild(cte);
    });

    table.appendChild(tbody);

    return table;
}

function createTable() {
    const table = document.createElement("table");
    const thead = createHeader();
    const tbody = document.createElement("tbody");

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}

function createHeader() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    
    COLUMNS.forEach((col) => {
        const th = document.createElement("th");
        th.innerText = col.name;
        tr.appendChild(th);
    });
    
    thead.appendChild(tr);
    
    return thead;
}

function createRow(cte) {
    const tr = document.createElement("tr");

    COLUMNS.forEach((col) => {
        const td = document.createElement("td");
        td.innerText = cte[col.attribute];
        td.innerText = cte[col.attribute].replace(".", ",");

        tr.appendChild(td);
    });

    return tr;
}

function makeColumn(name, attribute) {
    return { name, attribute }
}



export { render };
