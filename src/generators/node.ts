import * as fs from 'fs';
import * as path from 'path';

export async function generateNode(projectPath: string, projectName: string, useTypeScript: boolean = true) {
  if (useTypeScript) {
    await generateNodeTS(projectPath, projectName);
  } else {
    await generateNodeJS(projectPath, projectName);
  }
}

// ─── TypeScript Version ───────────────────────────────────────────────────────

async function generateNodeTS(projectPath: string, projectName: string) {
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: "Node.js + Express + TypeScript API",
    main: "dist/index.js",
    scripts: {
      dev: "npm i && tsx watch src/index.ts",
      build: "tsc",
      start: "node dist/index.js",
    },
    dependencies: {
      express: "^4.21.1",
      cors: "^2.8.5",
      dotenv: "^16.4.5"
    },
    devDependencies: {
      "@types/node": "^22.10.0",
      "@types/express": "^4.17.21",
      "@types/cors": "^2.8.17",
      typescript: "^5.6.3",
      tsx: "^4.19.1"
    }
  };

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

  const indexTs = `import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './routes/users';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

app.get('/health', (req: Request, res: Response) => {
  res.json({
    project: '${projectName}',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Thanks for using WebInit 🚀',
    stack: 'Node.js + Express + TypeScript',
    endpoints: ['/health', '/api/users']
  });
});

app.listen(PORT, () => {
  console.log(\`🚀 ${projectName} running on http://localhost:\${PORT}\`);
});
`;

  const usersRouter = `import { Router, Request, Response } from 'express';

export const userRouter = Router();

userRouter.get('/', (req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'WebInit User', email: 'user@webinit.com' }
  ]);
});

userRouter.get('/:id', (req: Request, res: Response) => {
  res.json({ id: req.params.id, name: 'WebInit User', email: 'user@webinit.com' });
});
`;

  const envExample = `PORT=3000\nNODE_ENV=development`;
  const gitignore = `node_modules\ndist\n.env\n*.log\n.DS_Store`;

  fs.mkdirSync(path.join(projectPath, 'src', 'routes'), { recursive: true });

  const files: Record<string, string> = {
    'package.json': JSON.stringify(packageJson, null, 2),
    'tsconfig.json': tsConfig,
    'src/index.ts': indexTs,
    'src/routes/users.ts': usersRouter,
    '.env.example': envExample,
    '.gitignore': gitignore,
    'README.md': `# ${projectName}\n\nNode.js + Express + TypeScript\n\n## Quick Start\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\nVisit http://localhost:3000/health`
  };

  for (const [fileName, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(projectPath, fileName), content);
  }
}

// ─── JavaScript Version ───────────────────────────────────────────────────────

async function generateNodeJS(projectPath: string, projectName: string) {
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: "Node.js + Express API",
    main: "src/index.js",
    type: "module",
    scripts: {
      dev: "node --watch src/index.js",
      start: "node src/index.js",
    },
    dependencies: {
      express: "^4.21.1",
      cors: "^2.8.5",
      dotenv: "^16.4.5"
    }
  };

  const indexJs = `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

app.get('/health', (req, res) => {
  res.json({
    project: '${projectName}',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Thanks for using WebInit 🚀',
    stack: 'Node.js + Express + JavaScript',
    endpoints: ['/health', '/api/users']
  });
});

app.listen(PORT, () => {
  console.log(\`🚀 ${projectName} running on http://localhost:\${PORT}\`);
});
`;

  const usersRouterJs = `import { Router } from 'express';

export const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'WebInit User', email: 'user@webinit.com' }
  ]);
});

userRouter.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'WebInit User', email: 'user@webinit.com' });
});
`;

  const envExample = `PORT=3000\nNODE_ENV=development`;
  const gitignore = `node_modules\n.env\n*.log\n.DS_Store`;

  fs.mkdirSync(path.join(projectPath, 'src', 'routes'), { recursive: true });

  const files: Record<string, string> = {
    'package.json': JSON.stringify(packageJson, null, 2),
    'src/index.js': indexJs,
    'src/routes/users.js': usersRouterJs,
    '.env.example': envExample,
    '.gitignore': gitignore,
    'README.md': `# ${projectName}\n\nNode.js + Express + JavaScript\n\n## Quick Start\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\nVisit http://localhost:3000/health`
  };

  for (const [fileName, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(projectPath, fileName), content);
  }
}