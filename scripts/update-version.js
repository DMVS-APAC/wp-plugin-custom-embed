'use strict';

const replaceInFile = require('replace-in-file');

const PACKAGE = require('../package.json');

const replaceInFileWithLog = async ( options ) => {
    const results = await replaceInFile( options );
    console.log( 'Replacement results:', results, 'options: ', options );
};

const run = async () => {
    try {
        await replaceInFileWithLog( {
            files: './wp-plugin-custom-embed.php',
            from: /Version:.*$/m,
            to: `Version: ${ PACKAGE.version }`,
        } );

        await replaceInFileWithLog( {
            files: './wp-plugin-custom-embed.php',
            from: /version .*$/m,
            to: `version ${ PACKAGE.version }`,
        } );

        await replaceInFileWithLog( {
            files: './wp-plugin-custom-embed.php',
            from: /\'DM_CE__VERSION\',\s.*$/m,
            to: `'DM_CE__VERSION', '${ PACKAGE.version }');`,
        } );
    } catch ( err ) {
        console.error( 'Error occurred:', err );
        process.exit( 1 );
    }
};

run();
