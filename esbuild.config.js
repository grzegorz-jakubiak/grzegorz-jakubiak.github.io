require('esbuild').build({
  entryPoints: ['esbuild/index.js'],
  bundle: true,
  outfile: 'assets/javascript/index.js',
}).catch(() => process.exit(1))