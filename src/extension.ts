import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand(
        'webinit.start',
        async () => {

            const projectName = await vscode.window.showInputBox({
                prompt: "Enter your project name"
            });

            if (!projectName) return;

            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
                vscode.window.showErrorMessage("Please open a folder first.");
                return;
            }

            const rootPath = workspaceFolders[0].uri.fsPath;
            const projectPath = path.join(rootPath, projectName);

            // Create main folder
            fs.mkdirSync(projectPath, { recursive: true });

            // Create assets/images
            fs.mkdirSync(path.join(projectPath, 'assets', 'images'), { recursive: true });

            // index.html
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

            // style.css
            fs.writeFileSync(
                path.join(projectPath, 'style.css'),
`* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}`
            );

            // script.js
            fs.writeFileSync(
                path.join(projectPath, 'script.js'),
`console.log("${projectName} started 🚀");`
            );

            vscode.window.showInformationMessage("WebInit project created successfully!");
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
