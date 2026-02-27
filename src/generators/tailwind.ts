import * as fs from 'fs';
import * as path from 'path';

export async function generateTailwind(projectPath: string, projectName: string) {
    // 1. package.json (Tailwind CLI)
    const packageJson = {
        name: projectName,
        version: "1.0.0",
        scripts: {
            "dev": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch",
            "build": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify"
        },
        devDependencies: {
            "tailwindcss": "^3.4.17",
            "autoprefixer": "^10.4.20",
            "postcss": "^8.5.1",
            "postcss-cli": "^11.0.1"
        }
    };

    // 2. tailwind.config.js
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

    // 3. postcss.config.js
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;

    // 4. src/input.css
    const inputCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

    // 5. index.html (Your WebInit branding!)
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link href="./dist/output.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600">
    <div class="container mx-auto px-6 py-24 max-w-4xl">
        <div class="text-center text-white">
            <h1 class="text-6xl font-black mb-12 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                Thanks for using WebInit 🚀
            </h1>
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-bold mb-8">Tailwind CSS + HTML + JS</h2>
                    <div class="space-y-4 text-xl opacity-90">
                        <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                            Tailwind JIT mode
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                            Zero runtime CSS
                        </div>
                    </div>
                </div>
                <div class="card bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-500 group">
                    <div class="text-5xl mb-6">✨</div>
                    <div class="text-3xl font-bold mb-4 group-hover:text-white transition-colors">Live Preview</div>
                    <button id="counterBtn" class="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 hover:bg-opacity-90">
                        Count: <span id="counter">0</span>
                    </button>
                </div>
            </div>
            <div class="mt-16 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                <code class="text-lg font-mono bg-white/20 px-4 py-2 rounded-xl border border-white/30">
                    npm run dev → dist/output.css updates live!
                </code>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`;

    // 6. script.js
    const scriptJs = `console.log('${projectName} started 🚀');

let count = 0;
const counterBtn = document.getElementById('counterBtn');
const counterSpan = document.getElementById('counter');

counterBtn?.addEventListener('click', () => {
    count++;
    counterSpan!.textContent = count;
    console.log('Counter:', count);
});
`;

    const files = {
        'package.json': JSON.stringify(packageJson, null, 2),
        'tailwind.config.js': tailwindConfig,
        'postcss.config.js': postcssConfig,
        'src/input.css': inputCss,
        'index.html': indexHtml,
        'script.js': scriptJs,
        'README.md': `# ${projectName}\n\nTailwind CSS + HTML + JS\n\n## Quick Start\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\``
    };

    // Create directories
    const dirs = [
        path.join(projectPath, 'src'),
        path.join(projectPath, 'dist'), 
        path.join(projectPath, 'assets', 'images')
    ];
    
    for (const dir of dirs) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Write files
    for (const [fileName, content] of Object.entries(files)) {
        fs.writeFileSync(path.join(projectPath, fileName), content);
    }
}