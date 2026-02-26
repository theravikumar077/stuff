import * as fs from 'fs';
import * as path from 'path';

export async function generateNode(projectPath: string, projectName: string) {
    // 1. package.json
    const packageJson = {
        name: projectName,
        version: "1.0.0",
        description: "Node.js + Express + TypeScript API",
        main: "dist/index.js",
        scripts: {
            "dev": "tsx watch src/index.ts",
            "build": "tsc",
            "start": "node dist/index.js",
            "test": "vitest"
        },
        dependencies: {
            express: "^4.21.1",
            cors: "^2.8.5",
            helmet: "^8.1.0",
            "express-rate-limit": "^7.4.0"
        },
        devDependencies: {
            "@types/node": "^22.10.0",
            "@types/express": "^4.17.21",
            "@types/cors": "^2.8.17",
            "typescript": "^5.6.3",
            "tsx": "^4.19.1",
            "vitest": "^2.1.3",
            "ts-node": "^10.9.2"
        }
    };

    // 2. tsconfig.json
    const tsConfig = `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`;

    // 3. src/index.ts (Your WebInit branding!)
    const indexTs = `import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ 
        message: 'Thanks for using WebInit 🚀', 
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// API routes
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Node.js + Express + TypeScript API',
        endpoints: ['/health', '/api/users', '/api/posts']
    });
});

app.get('/api/users', (req: Request, res: Response) => {
    res.json([
        { id: 1, name: 'WebInit User', email: 'user@webinit.com' }
    ]);
});

app.listen(PORT, () => {
    console.log(\`🚀 \${projectName} running on http://localhost:\${PORT}\`);
    console.log('Health check: http://localhost:3000/health');
});
`;

    // 4. .env.example
    const envExample = `PORT=3000
NODE_ENV=development
`;

    // 5. .gitignore
    const gitignore = `node_modules
dist
.env
*.log
.DS_Store
coverage
`;

    const files = {
        'package.json': JSON.stringify(packageJson, null, 2),
        'tsconfig.json': tsConfig,
        'src/index.ts': indexTs,
        '.env.example': envExample,
        '.gitignore': gitignore,
        'README.md': `# ${projectName}\n\nNode.js + Express + TypeScript\n\n## Quick Start\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\nVisit http://localhost:3000/health`
    };

    // Create directories
    fs.mkdirSync(path.join(projectPath, 'src'), { recursive: true });
    fs.mkdirSync(path.join(projectPath, 'assets', 'images'), { recursive: true });

    // Write files
    for (const [fileName, content] of Object.entries(files)) {
        fs.writeFileSync(path.join(projectPath, fileName), content);
    }
}
