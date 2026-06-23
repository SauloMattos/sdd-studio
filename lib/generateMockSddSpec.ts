import { generateLocalSddSpec } from "@/lib/local-sdd/generateLocalSddSpec";
import type { LocalSddInput, SddSpec } from "@/types/sdd";

export { generateLocalSddSpec } from "@/lib/local-sdd/generateLocalSddSpec";

export function generateMockSddSpec(input: LocalSddInput): SddSpec {
  return generateLocalSddSpec(input);
}
