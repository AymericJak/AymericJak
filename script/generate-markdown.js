const fs = require('fs');

// Load data from JSON file
const rawData = fs.readFileSync('../data/technologies.json');
const data = JSON.parse(rawData);

/**
 * Generate cell content.
 *
 * @param category - Category object from JSON file (see data/technologies.json)
 *
 * @returns {string} - HTML content
 */
function generateCellContent(category) {
    let content = '';
    category.tools.forEach(tool => {
        content += `<a href="${tool.url}" target="_blank"><img src="${tool.logo}" height="35" alt="${category.name} - ${tool.name} logo" /></a>&nbsp;`;
    });
    return content;
}

/**
 * Generate HTML table of skills.
 *
 * @returns {string} - HTML table.
 */
function generateSkillsTable() {
    let table = '<table>';
    data.categories.forEach(category => {
        table += '<tr>';
        table += `<th style="text-align: left;">${category.name}</th>`;
        table += `<td style="text-align: right;">${generateCellContent(category)}</td>`;
        table += '</tr>';
    });
    table += '</table>';
    return table;
}


// Read the existing README.md content
let readmeContent = fs.readFileSync('../README.md', 'utf-8');

// Replace the content of <div id="skills-container"> with the generated table
readmeContent = readmeContent.replace(/<div id="skills-container">[\s\S]*?<\/div>/, `<div id="skills-container">\n\t${generateSkillsTable()}\n</div>`);

// Write the modified content back to README.md
fs.writeFileSync('../README.md', readmeContent);

console.log('README.md updated successfully!');
