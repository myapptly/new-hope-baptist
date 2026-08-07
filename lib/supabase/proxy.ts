import { createClient as createBrowserClient } from "./client";
import { createServerClient as createServerSupabaseClient } from "./server";

export async function createSupabaseProxy() {
  if (typeof window === "undefined") {
    return createServerSupabaseClient();
  }

  return createBrowserClient();
}
