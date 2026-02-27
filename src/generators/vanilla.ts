import * as fs from 'fs';
import * as path from 'path';

export async function generateVanilla(projectPath: string, projectName: string) {
    // index.html (your exact code)
    fs.writeFileSync(
        path.join(projectPath, 'index.html'),
`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${projectName}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h1>Thanks for using WebInit :) </h1>
<script src="script.js"></script>
</body>
</html>`
    );

    // style.css (your exact code)
    fs.writeFileSync(
        path.join(projectPath, 'style.css'),
`*{
margin: 0;
padding:0;
box-sizing: border-box;
font-family: Helvetica , sans-serif;
}
html,
body {
width: 100%;
height: 100%;
}`
    );

    // script.js (your exact code)
    fs.writeFileSync(
        path.join(projectPath, 'script.js'),
`console.log("${projectName} started 🚀");
alert("JS is working");`
    );
}
