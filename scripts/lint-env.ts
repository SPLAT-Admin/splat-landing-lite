import * as fs from "fs";

const envPath = ".env.local";
if (!fs.existsSync(envPath)) {
  console.error(`❌ ${envPath} not found`);
  process.exit(1);
}

const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

const raw = fs.readFileSync(envPath, "utf8");
const lines = raw.split("\n");

console.log(`🔍 Reviewing ${envPath}...\n`);
let allGood = true;

for (const [i, line] of lines.entries()) {
  if (!line.trim() || line.trim().startsWith("#")) continue;

  if (!line.includes("=")) {
    console.error(`❌ Line ${i + 1}: Missing "=" → ${line}`);
    allGood = false;
  }

  if (/['"]/.test(line)) {
    console.error(`⚠️ Line ${i + 1}: Contains quotes → ${line}`);
    allGood = false;
  }
}

for (const key of requiredVars) {
  if (!raw.includes(`${key}=`)) {
    console.error(`❌ Missing required variable: ${key}`);
    allGood = false;
  } else {
    console.log(`✅ Found ${key}`);
  }
}

if (allGood) {
  console.log("\n🎉 .env.local looks good!");
} else {
  console.error("\n⚠️ Issues detected in .env.local. Fix above and rerun.");
  process.exit(1);
}
