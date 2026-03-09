import * as fs from 'fs';
import * as path from 'path';

export async function generateTailwind(projectPath: string, projectName: string) {

    const closeScript = '<' + '/script>';

    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4">${closeScript}
</head>
<body class="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600">
    <div class="container mx-auto px-6 py-24 max-w-4xl">
        <div class="text-center text-white">
            <h1 class="text-6xl font-black mb-12 drop-shadow-2xl">
                Thanks for using WebInit 🚀
            </h1>
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-4xl font-bold mb-8">Tailwind CSS + HTML + JS</h2>
                    <div class="space-y-4 text-xl opacity-90">
                        <div class="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                            <span class="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                            Tailwind via CDN
                        </div>
                        <div class="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                            <span class="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                            Zero build step needed
                        </div>
                    </div>
                </div>
                <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-500 group">
                    <div class="text-5xl mb-6">✨</div>
                    <div class="text-3xl font-bold mb-4">Live Preview</div>
                    <button id="counterBtn" class="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                        Count: <span id="counter">0</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js">${closeScript}
</body>
</html>`;

    const scriptJs = `console.log('${projectName} started 🚀');

let count = 0;
const counterBtn = document.getElementById('counterBtn');
const counterSpan = document.getElementById('counter');

counterBtn?.addEventListener('click', () => {
    count++;
    counterSpan.textContent = count;
    console.log('Counter:', count);
});
`;

    const files: Record<string, string> = {
        'index.html': indexHtml,
        'script.js': scriptJs,
    };

    const dirs = [
        path.join(projectPath, 'assets'),
        path.join(projectPath, 'assets', 'images'),
    ];

    for (const dir of dirs) {
        fs.mkdirSync(dir, { recursive: true });
    }

    for (const [fileName, content] of Object.entries(files)) {
        fs.writeFileSync(path.join(projectPath, fileName), content);
    }
}