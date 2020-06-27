/** error check files - TODO move this to main tipitaka.lk repo*/
"use strict"

const fs = require('fs');
const path = require('path');

const getHeadings = (pages, lang) => 
    pages.map((p, pi) => p[lang].entries.map((e, ei) => ({...e, ei, pi}))
        .filter(e => e.type == 'heading')
    ).flat();

const dataInputFolder = path.join(__dirname, '../public/static/text/') //data

const inputFiles = fs.readdirSync(dataInputFolder).filter(name => /json$/.test(name))
inputFiles.forEach(filename => {
    const obj = JSON.parse(fs.readFileSync(path.join(dataInputFolder, filename)))
    const fileKey = filename.split('.')[0]

    if (fileKey != obj.filename) {
        console.error(`filename mismatch in ${fileKey} ${obj.filename}`)
    }

    if (!obj.bookId) console.error(`bookId missing in ${fileKey} ${obj.bookId}`)
    
    // check page numbers
    const pageNumbers = obj.pages.map(p => parseInt(p.pageNum))
    if (pageNumbers.some(n => !n)) console.error(`pageNum in ${fileKey} not a number`)
    const pageIncrement = filename.startsWith('ap-pat') ? 1 : 2
    for (let i = 0; i < pageNumbers.length - 1; i++) {
        if (pageNumbers[i+1] - pageNumbers[i] != pageIncrement) 
            console.error(`page numbers ${pageNumbers[i]}:${pageNumbers[i+1]} not in order in ${fileKey}`)
    }

    if (pageIncrement == 1) return; // cant check conditions below if only have pali

    const headings = getHeadings(obj.pages, 'pali'), sinhHeadings = getHeadings(obj.pages, 'sinh')

    headings.forEach((heading, ind) => {
        const sinhH = sinhHeadings[ind]
        if (heading.pi != sinhH.pi || heading.ei != sinhH.ei || heading.level != sinhH.level) {
            console.error(`headings mismatch in ${fileKey} ${JSON.stringify(heading)}`)
        }
        if (!heading.text || !sinhH.text) {
            console.error(`empty heading in ${fileKey} ${JSON.stringify(heading)}`)
        }
    })

    // check entries
    obj.pages.forEach(p => {
        if (!p.pali.entries.length) console.error(`page ${p.pageNum} in ${fileKey} is empty`)
        if (p.pali.entries.length != p.sinh.entries.length)
            console.error(`page ${p.pageNum} in ${fileKey} has different pali and sinh entry counts`)
    })
})
console.log(`errors checked in ${inputFiles.length} files in ${dataInputFolder}`)