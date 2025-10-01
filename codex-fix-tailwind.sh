apply_patch <<'PATCH'
*** Begin Patch
*** Update File: tailwind.config.js
 module.exports = {
   content: [
     "./pages/**/*.{js,ts,jsx,tsx}",
     "./components/**/*.{js,ts,jsx,tsx}",
     "./lib/**/*.{js,ts,jsx,tsx}"
   ],
   theme: {
-    extend: {},
+    extend: {
+      colors: {
+        "jet-black": "#0A0A0A",
+        "acid-white": "#FFFFFF",
+        "deep-crimson": "#851025",
+      },
+    },
   },
   plugins: [],
 }
*** End Patch
PATCH
