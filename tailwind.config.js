export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         gridTemplateColumns: {
            'main': '1fr 3fr 1fr',
            'topbar': 'min-content 1fr min-content',
            'footer': 'min-content 1fr  min-content min-content',
            'history': 'min-content 1fr'
         },
         animation: {
            'fade-in': '300ms fade-in forwards',
            'slide-up': '300ms slide-up forwards',
            'fade-up': '300ms slide-up forwards, 300ms fade-in forwards',
            'fade-down': '300ms slide-up reverse, 300ms fade-in forwards',
         },
         keyframes: {
            'fade-in': {
               '0%': {
                  opacity: 0
               },
               '100%': {
                  opacity: 1
               }
            },
            'slide-up': {
               '0%': {
                  transform: 'translateY(15px)'
               },
               '100%': {
                  transform: 'translateY(0px)'
               }
            }
         }
      }
   }
}