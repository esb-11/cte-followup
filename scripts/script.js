import { cteManager } from "./cteManager.js";
import { render } from "./cteRender.js";

const container = document.querySelector("#cte-container");
const inputElement = document.querySelector("#cte");

const fileTypes = [
    "text/xml"
];

inputElement.addEventListener("change", async (e) => {
    const curFiles = inputElement.files;
    if (curFiles.length === 0) {
        console.log("No files currently selected for upload");
        return 1;
    }

    for (const file of curFiles) {
        if (!validFileType(file)) {
            console.log(`${file.name}: ${file.type} is an invalid file type`);
            return 1;
        }
        await file.text().then(cteManager.addCte);
    }

    const list = cteManager.cteList.sort((a, b) => {
        if (a.origin < b.origin) return 1;
        if (a.origin > b.origin) return -1;
        return 0;
    })

    console.log(cteManager.getTotalValue());
    container.innerHTML = "";
    const table = render(list);
    container.appendChild(table);
});

function validFileType(file) {
    return fileTypes.includes(file.type);
}

