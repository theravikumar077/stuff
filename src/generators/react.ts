import * as fs from 'fs';
import * as path from 'path';

export async function generateReact(projectPath: string, projectName: string, useTypeScript: boolean = true) {
  if (useTypeScript) {
    await generateReactTS(projectPath, projectName);
  } else {
    await generateReactJS(projectPath, projectName);
  }
}

// ─── TypeScript Version ───────────────────────────────────────────────────────

async function generateReactTS(projectPath: string, projectName: string) {
  const packageJson = {
    name: projectName,
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc -b && vite build",
      lint: "eslint .",
      preview: "vite preview",
      "type-check": "tsc --noEmit"
    },
    dependencies: {
      react: "^19.1.0",
      "react-dom": "^19.1.0"
    },
    devDependencies: {
      "@eslint/js": "^9.27.0",
      "@types/react": "^19.1.5",
      "@types/react-dom": "^19.1.5",
      "@vitejs/plugin-react": "^4.5.0",
      "eslint": "^9.27.0",
      "eslint-plugin-react-hooks": "^5.2.0",
      "eslint-plugin-react-refresh": "^0.4.20",
      "globals": "^16.2.0",
      "typescript": "~5.8.3",
      "vite": "^6.3.5"
    }
  };

  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"><!-- Thanks for using WebInit :) --></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true }
})`;

  const tsConfig = `{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;

  const tsConfigNode = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}`;

  const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

  const appTsx = `import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]">
          <h1 className="text-4xl font-semibold text-white tracking-tight mb-4">
            Thanks for using WebInit
          </h1>
          <p className="text-gray-400 text-base mb-8">
            React · Vite · TypeScript
            <br />
            Built for speed. Designed for simplicity.
          </p>
          <button
            className="px-7 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:opacity-90 transition-all duration-300"
            onClick={() => setCount(c => c + 1)}
          >
            Count: {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App`;

  const appCss = `* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; font-family: Inter, system-ui, sans-serif; }`;

  const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

  const gitignore = `node_modules\ndist\n.env\n.env.local\n.DS_Store`;

  fs.mkdirSync(path.join(projectPath, 'src'), { recursive: true });
  fs.mkdirSync(path.join(projectPath, 'public', 'assets', 'images'), { recursive: true });

  const files: Record<string, string> = {
    'package.json': JSON.stringify(packageJson, null, 2),
    'index.html': indexHtml,
    'vite.config.ts': viteConfig,
    'tsconfig.json': tsConfig,
    'tsconfig.node.json': tsConfigNode,
    'src/main.tsx': mainTsx,
    'src/App.tsx': appTsx,
    'src/App.css': appCss,
    'src/index.css': indexCss,
    '.gitignore': gitignore,
    'README.md': `# ${projectName}\n\nReact + Vite + TypeScript\n\n## Quick Start\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\``
  };

  for (const [fileName, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(projectPath, fileName), content);
  }
}

// ─── JavaScript Version ───────────────────────────────────────────────────────

async function generateReactJS(projectPath: string, projectName: string) {
  const packageJson = {
    name: projectName,
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "npm i && vite",
      build: "npm i && vite build",
      lint: "npm i && eslint .",
      preview: "npm i && vite preview"
    },
    dependencies: {
      react: "^19.1.0",
      "react-dom": "^19.1.0"
    },
    devDependencies: {
      "@eslint/js": "^9.27.0",
      "@vitejs/plugin-react": "^4.5.0",
      "eslint": "^9.27.0",
      "eslint-plugin-react-hooks": "^5.2.0",
      "eslint-plugin-react-refresh": "^0.4.20",
      "globals": "^16.2.0",
      "vite": "^6.3.5"
    }
  };

  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"><!-- Thanks for using WebInit :) --></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true }
})`;

  const mainJsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

  const appJsx = `import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]">
          <h1 className="text-4xl font-semibold text-white tracking-tight mb-4">
            Thanks for using WebInit
          </h1>
          <p className="text-gray-400 text-base mb-8">
            React · Vite · JavaScript
            <br />
            Built for speed. Designed for simplicity.
          </p>
          <button
            className="px-7 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:opacity-90 transition-all duration-300"
            onClick={() => setCount(c => c + 1)}
          >
            Count: {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App`;

  const appCss = `* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; font-family: Inter, system-ui, sans-serif; }`;

  const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

  const gitignore = `node_modules\ndist\n.env\n.env.local\n.DS_Store`;

  fs.mkdirSync(path.join(projectPath, 'src'), { recursive: true });
  fs.mkdirSync(path.join(projectPath, 'public', 'assets', 'images'), { recursive: true });

  const files: Record<string, string> = {
    'package.json': JSON.stringify(packageJson, null, 2),
    'index.html': indexHtml,
    'vite.config.js': viteConfig,
    'src/main.jsx': mainJsx,
    'src/App.jsx': appJsx,
    'src/App.css': appCss,
    'src/index.css': indexCss,
    '.gitignore': gitignore,
    'README.md': `# ${projectName}\n\nReact + Vite + JavaScript\n\n## Quick Start\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\``
  };

  for (const [fileName, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(projectPath, fileName), content);
  }
}