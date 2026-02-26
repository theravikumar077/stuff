import * as fs from 'fs';
import * as path from 'path';

export async function generateReact(projectPath: string, projectName: string) {
    // 1. package.json (latest Vite React TS template)
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

    // 2. index.html
    const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"><!-- Thanks for using WebInit :) --></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

    // 3. vite.config.ts
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
`;

    // 4. tsconfig.json
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

    // 5. tsconfig.node.json
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

    // 6. src/main.tsx
    const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;

    // 7. src/App.tsx (Your WebInit branding!)
    const appTsx = `import { useState } from 'react'
import reactLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-8 animate-pulse">
            Thanks for using WebInit 🚀
          </h1>
          <div className="flex gap-8 items-center mb-8 flex-wrap justify-center">
            <a href="https://vite.dev" target="_blank">
              <img src={reactLogo} className="h-24 w-24 animate-spin" alt="Vite logo" />
            </a>
            <div>
              <p className="text-2xl mb-4">React + Vite + TypeScript</p>
              <div className="card bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
                <button 
                  className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={() => setCount((count) => count + 1)}
                >
                  count is {count}
                </button>
              </div>
            </div>
          </div>
          <p className="text-xl opacity-90">
            Edit <code className="bg-white/20 px-3 py-1 rounded-lg font-mono">src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </>
  )
}

export default App
`;

    // 8. src/App.css
    const appCss = `:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

.card {
  padding: 2em;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}`;

    // 9. src/index.css
    const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

    // 10. .gitignore
    const gitignore = `node_modules
dist
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.DS_Store`;

    // Write all files
    const files = {
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

    // Create src folder
    fs.mkdirSync(path.join(projectPath, 'src'), { recursive: true });

    // Write all files
    for (const [fileName, content] of Object.entries(files)) {
        fs.writeFileSync(path.join(projectPath, fileName), content);
    }

    // Create your assets/images folder inside React project too
    fs.mkdirSync(path.join(projectPath, 'public', 'assets', 'images'), { recursive: true });
}
