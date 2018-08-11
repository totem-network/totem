const gulp = require('gulp');
const IPFS = require('ipfs');

gulp.task('ipfs', function() {
    // TODO: use ipfs-ctl for api endpoint

    const node = new IPFS({});

    node.on('ready', () => {
        //console.log(node.isOnline());
    });
});