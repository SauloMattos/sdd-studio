import type { SddInput, SddSpec } from "@/types/sdd";
import { generateLocalSddSpec } from "@/lib/local-sdd/generateLocalSddSpec";

export { generateLocalSddSpec } from "@/lib/local-sdd/generateLocalSddSpec";

export function generateMockSddSpec(input: SddInput): SddSpec {
  return generateLocalSddSpec(input);
}
