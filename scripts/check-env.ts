const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

console.log("🔎 Checking required env vars...\n");
let allGood = true;

for (const v of requiredVars) {
  if (!process.env[v]) {
    console.error(`❌ Missing: ${v}`);
    allGood = false;
  } else {
    console.log(`✅ ${v} present`);
  }
}

if (allGood) {
  console.log("\n🎉 All required env vars are set!");
} else {
  console.error("\n⚠️ Some required env vars are missing. Check your .env.local file.");
}
