/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Utility script to generate a bcrypt hash for the admin password.
 *
 * Usage:
 *   node scripts/hash-password.js "YourStrongPassword"
 *
 * Then paste the output into .env.local as ADMIN_PASSWORD_HASH
 */

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("❌ Usage: node scripts/hash-password.js <password>");
  console.error("   Example: node scripts/hash-password.js \"MyStr0ngP@ssw0rd!\"");
  process.exit(1);
}

if (password.length < 8) {
  console.error("❌ Password must be at least 8 characters long.");
  process.exit(1);
}

const SALT_ROUNDS = 12;

bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
  if (err) {
    console.error("❌ Failed to hash password:", err.message);
    process.exit(1);
  }

  const escapedHash = hash.replace(/\$/g, "\\$");
  console.log("\n✅ Bcrypt hash generated successfully!\n");
  console.log("Raw Hash:", hash);
  console.log("\nAdd this to your .env.local file (escaped for Next.js env parsing):");
  console.log(`ADMIN_PASSWORD_HASH="${escapedHash}"`);
  console.log("");
});
