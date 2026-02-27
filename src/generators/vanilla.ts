import * as fs from 'fs';
import * as path from 'path';

export async function generateVanilla(projectPath: string, projectName: string) {
    // index.html (your exact code)
    fs.writeFileSync(
        path.join(projectPath, 'index.html'),
`

<!DOCTYPE html>
<html class="dark" lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>WebInit - Premium VS Code Extension</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
<script>
tailwind.config={darkMode:"class",theme:{extend:{colors:{primary:"#135bec","background-dark":"#0c111b"},fontFamily:{display:["Inter","sans-serif"]}}}}
</script>
<style>
body{font-family:Inter,sans-serif}
.grid{background-size:40px 40px;background-image:linear-gradient(to right,rgba(255,255,255,.03)1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.03)1px,transparent 1px)}
.glass{background:rgba(255,255,255,.04);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.08)}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-25px)}}.float{animation:float 8s ease-in-out infinite}
.fade{opacity:0;transform:translateY(40px);transition:1s}.fade.show{opacity:1;transform:none}
.gradient{background:linear-gradient(90deg,#135bec,#7c3aed,#135bec);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite}
@keyframes shimmer{to{background-position:200% center}}
.glow{position:relative;overflow:hidden}.glow:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent,rgba(255,255,255,.4),transparent);transform:translateX(-100%);transition:.8s}.glow:hover:before{transform:translateX(100%)}
.persp{perspective:1200px}.tilt{transition:.4s}.tilt:hover{transform:rotateX(8deg) rotateY(-10deg) scale(1.03)}
.cursor:after{content:"|";margin-left:4px;animation:blink 1s infinite}@keyframes blink{50%{opacity:0}}
</style>
</head>
<body class="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary/30">

<div class="relative min-h-screen overflow-hidden grid">
<div class="absolute -top-20 -left-20 w-1/2 h-1/2 rounded-full bg-primary/20 blur-[120px] float"></div>
<div class="absolute -bottom-20 -right-20 w-2/5 h-2/5 rounded-full bg-purple-600/20 blur-[120px] float"></div>

<main class="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
<div class="grid lg:grid-cols-2 gap-16 items-center">

<div class="flex flex-col gap-6">
<div class="px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold w-fit fade">v2.4 Now Available</div>
<h1 class="text-5xl md:text-7xl font-black gradient fade">WebInit</h1>
<p class="text-lg text-slate-600 dark:text-slate-400 max-w-lg fade">Instantly generate production-ready HTML, CSS & JS projects — without the boilerplate.</p>
<button class="glow glass px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition w-fit fade flex items-center gap-2">
<span class="material-symbols-outlined">storefront</span>View on Marketplace
</button>
</div>

<div class="persp hidden lg:block fade">
<div class="tilt glass rounded-2xl p-6 relative">
<div class="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 blur-3xl rounded-full"></div>

<div class="flex gap-1.5 mb-6">
<div class="w-3 h-3 rounded-full bg-red-500/60"></div>
<div class="w-3 h-3 rounded-full bg-yellow-500/60"></div>
<div class="w-3 h-3 rounded-full bg-green-500/60"></div>
</div>

<div class="font-mono text-sm text-slate-300 space-y-2">
<div class="text-primary">📁 project-name/</div>
<div class="pl-4">📁 assets/</div>
<div class="pl-8 text-slate-500">🖼 images/</div>
<div class="pl-4">📄 index.html</div>
<div class="pl-4">🎨 style.css</div>
<div class="pl-4">⚡ script.js</div>
<div class="pl-4">📘 README.md</div>
</div>

<div class="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-primary/80">
<span class="text-green-500">$</span> <span id="type" class="cursor"></span>
<div class="text-slate-500 mt-1">Creating structure... Done!</div>
</div>

</div>
</div>

</div>
</main>
</div>

<script>
const o=new IntersectionObserver(e=>e.forEach(i=>i.isIntersecting&&i.target.classList.add("show")));document.querySelectorAll(".fade").forEach(e=>o.observe(e));
let t='webinit init --name "my-awesome-app"',i=0;(function type(){if(i<t.length){document.getElementById("type").innerHTML+=t[i++];setTimeout(type,40)}})();
</script>

</body>
</html>`
    );

    // style.css (your exact code)
    fs.writeFileSync(
        path.join(projectPath, 'style.css'),
`/* Add your custom styles here */`
    );

    // script.js (your exact code)
    fs.writeFileSync(
        path.join(projectPath, 'script.js'),
`console.log("${projectName} started 🚀");
alert("JS is working");`
    );
}





