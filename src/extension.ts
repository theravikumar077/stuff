import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { generateVanilla } from "./generators/vanilla";
import { generateReact } from "./generators/react";
import { generateNode } from "./generators/node";
import { generateNext } from "./generators/next";
import { generateTailwind } from "./generators/tailwind";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "webinit.start",
    async () => {
      const projectName = await vscode.window.showInputBox({
        prompt: "Enter your project name",
      });

      if (!projectName) return;

      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("Please open a folder first.");
        return;
      }

      const rootPath = workspaceFolders[0].uri.fsPath;
      const projectPath = path.join(rootPath, projectName);
      // Step 2: Library selection
      const libraryItems: vscode.QuickPickItem[] = [
        {
          label: "📄 Vanilla JS",
          description: "Basic HTML/CSS/JS (your current setup)",
        },
        {
          label: "⚛️ React + Vite",
          description: "React 18 + Vite + TypeScript",
        },
        { label: "🚀 Next.js", description: "Next.js 15 + TypeScript" },
        {
          label: "🐳 Node.js + Express",
          description: "Node.js backend project",
        },
        { label: "💨 Tailwind CSS", description: "HTML + Tailwind + JS" },
      ];

      const selectedLibrary = await vscode.window.showQuickPick(libraryItems, {
        placeHolder: "Choose your library/framework",
        canPickMany: false,
      });

      if (!selectedLibrary) return;

      try {
        // Create main folder & assets/images (keeping your structure!)
        fs.mkdirSync(projectPath, { recursive: true });
        fs.mkdirSync(path.join(projectPath, "assets", "images"), {
          recursive: true,
        });

        // Call appropriate generator
        let successMessage = "";
        switch (selectedLibrary.label) {
          case "📄 Vanilla JS":
            await generateVanilla(projectPath, projectName);
            successMessage = "Vanilla JS project";
            break;
          case "⚛️ React + Vite":
            await generateReact(projectPath, projectName);
            successMessage = "React + Vite project";
            break;
          case "🚀 Next.js":
            await generateNext(projectPath, projectName);
            successMessage = "Next.js project";
            break;
          case "🐳 Node.js + Express":
            await generateNode(projectPath, projectName);
            successMessage = "Node.js project";
            break;
          case "💨 Tailwind CSS":
            await generateTailwind(projectPath, projectName);
            successMessage = "Tailwind project";
            break;
        }

        vscode.window.showInformationMessage(
          `✅ ${successMessage} created: ${projectName}`,
        );

        // Open the project folder
        vscode.commands.executeCommand(
          "vscode.openFolder",
          vscode.Uri.file(projectPath),
        );
      } catch (error) {
        vscode.window.showErrorMessage(`❌ Error: ${error}`);
      }
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
