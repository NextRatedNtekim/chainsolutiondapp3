import { redirect } from "next/navigation";

// The complaint step moved to the chat widget; keep old /care links working.
export default function CarePage() {
  redirect("/verify");
}
