import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedDummy() {
  console.log("🌱 Seeding 500 email signups + 500 merch sales...");

  // 500 fake signups
  const fakeUsers = Array.from({ length: 500 }).map(() => ({
    email: faker.internet.email(),
    created_at: faker.date.recent({ days: 30 }),
    is_seed: true,
  }));

  const { error: signupError } = await supabase
    .from("email_signups")
    .insert(fakeUsers);

  if (signupError) console.error("❌ Failed to seed signups:", signupError);
  else console.log("✅ Inserted 500 fake signups.");

  // 500 fake merch sales
  const fakeSales = Array.from({ length: 500 }).map(() => ({
    item: faker.commerce.productName(),
    amount: parseFloat(faker.commerce.price({ min: 10, max: 200 })),
    created_at: faker.date.recent({ days: 30 }),
    is_seed: true,
  }));

  const { error: salesError } = await supabase
    .from("merch_sales")
    .insert(fakeSales);

  if (salesError) console.error("❌ Failed to seed sales:", salesError);
  else console.log("✅ Inserted 500 fake sales.");

  console.log("✨ All done seeding SPL@T dummy data!");
}

seedDummy();
