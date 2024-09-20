const path = require('path');

module.exports = {
    entry: {
        auth: './src/handlers/auth.js',
        inventory: './src/handlers/inventory.js'
    },
    target: 'node', // Objetivo de compilación para Node.js
    mode: 'development', // Modo de compilación (development o production)
    output: {
        path: path.resolve(__dirname, 'dist'), // Carpeta de salida
        filename: '[name].js', // Nombre del archivo de salida
        libraryTarget: 'commonjs2' // Formato del módulo de salida
    },
    externals: {
        'aws-sdk': 'aws-sdk' // Excluir aws-sdk ya que está disponible en Lambda
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Aplicar esta regla a archivos .js
                exclude: /node_modules/, // Excluir la carpeta node_modules
                use: {
                    loader: 'babel-loader', // Usar babel-loader para transpilar
                    options: {
                        presets: ['@babel/preset-env'] // Usar el preset-env de Babel
                    }
                }
            }
        ]
    }
};