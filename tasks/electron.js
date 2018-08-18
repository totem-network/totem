const gulp = require('gulp');
const { execSync, spawn } = require('child_process');

gulp.task('electron:build', () => {
    
});

gulp.task('electron:serve', () => {

    const renderer = spawn(
        'npm',
        [
            'run',
            'webpack-dev-server',
            '--',
            '--config',
            './webpack.development.js',
            '--target',
            'electron-renderer'
        ],
        {stdio: "inherit"}
    );

    // TODO: hmr for electron main process
    // TODO: split console view and display both outputs in different boxes
    const main = spawn(
        'npm',
        [
            'run',
            'webpack',
            '--',
            '--config',
            './scripts/electron/webpack.development.js'
        ]
    );

    main.on('exit', () => {
        const electron = spawn(
            'npm',
            [
                'run',
                'electron',
                '--',
                './build/electron/main.js'
            ]
        );

        electron.on('close', (code) => {
            process.exit(code);
        });
    });

    process.on('exit', function () {
        // TODO: not working!
        renderer.kill();
    });
});