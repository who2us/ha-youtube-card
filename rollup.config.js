import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

// Are we building for production? (set NODE_ENV=production before running)
const production = process.env.NODE_ENV === 'production';

export default {
  // Entry point — Rollup starts here and follows all the imports
  input: 'src/ha-youtube-card.js',

  output: {
    // Single output file in the repo root — this is what HACS delivers to HA
    file: 'ha-youtube-card.js',
    format: 'es',      // ES module format, understood by modern HA
    sourcemap: !production,
  },

  plugins: [
    // Lets Rollup find packages inside node_modules (e.g. 'lit')
    resolve(),

    // Transpiles modern JS down to something old Android WebViews understand
    babel({
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          // Chrome 67 = Android tablets from ~2016 running WebView
          // This covers virtually everything still running HA native app
          targets: { chrome: '67' },
          // Only include polyfills that are actually used in the code
          useBuiltIns: false,
        }],
      ],
      // Don't transpile files already in node_modules
      exclude: 'node_modules/**',
    }),

    // Minify in production to keep the bundle small
    production && terser({
      format: { comments: false },
    }),
  ].filter(Boolean),
};
