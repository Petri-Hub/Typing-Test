export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      gridTemplateColumns: {
         'topbar': 'min-content 1fr min-content',
         'footer': 'min-content 1fr  min-content min-content',
      }
   }
}