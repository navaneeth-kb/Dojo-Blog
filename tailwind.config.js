module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        'KolkerBrush':['Kolker Brush', 'cursive'],
        'ProtestGuerrilla':['ProtestGuerrilla','sans-serif'], 
        'KodeMono':['Kode Mono', 'monospace']
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
