const gulp = require('gulp');
const ipfsAPI = require('ipfs-api');

gulp.task('ipfs:api', function() {
    const ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5002');

    ipfs.add(new Buffer('Test'), (error, files) => {
        if (error) {
            console.log(error);
        } else {
            console.log(files.path);
            /*ipfs.cat(files.path, (err, file) => {
                console.log(file.toString('utf-8'));
            });*/
        }
    });

    /*ipfs.cat('QmQrXZ4iXdEKQMiQT6GRg2Wy3vxb9exR25sYdaqoHwWWuR', (err, file) => {
        console.log(file.toString('utf-8'));
    });*/
});