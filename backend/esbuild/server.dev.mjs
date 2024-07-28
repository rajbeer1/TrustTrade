import * as esbuild from 'esbuild';

try {
    const ctx = await esbuild.context({
        entryPoints: ['src/index.ts'],
        bundle: true,
        sourcemap: true,
        minify: true,
        platform: 'node',
        target: ['ES2020'],
        packages: 'external',
        define: {
            'process.env.NODE_ENV': "'deployment'"
        },
        outdir: 'dist',
    })

    await ctx.watch()

    console.log('Watching Server....')

} catch (error) {
    console.log('An error occurred: ', error)
    process.exit(1)
}


