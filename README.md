# MyNFT Client

[YouTube](https://www.youtube.com/watch?v=4ToR-z15Xfc)

```bash
git clone https://github.com/earth2travis/nft-client.git
```

```bash
cd nft-client
```

```bash
pnpm install
```

add `.env.local`

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=
PINATA_JWT=
```

```bash
pnpm run dev
```

## What I Did

```bash
git clone https://github.com/PinataCloud/viem-pinata-minting-template.git
```

```bash
cd viem-pinata-minting-template
```

```bash
pnpm install
```

add `.env.local`

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=
PINATA_JWT=
```

Replace `contract.json`

```bash
pnpm run dev
```

Replace `page.tsx`

Update these constants in `page.tsx` to allow the input element to switch from being uncontrolled (without a value set by React) to controlled (with a value set by React).

```tsx
const [name, setName] = useState<string>('');
const [description, setDescription] = useState<string>('');
const [externalUrl, setExternalUrl] = useState<string>('');
```

### Fix build errors in `route.ts`

Add Edge runtime

```ts
export const runtime = 'edge';
```

Change require to import for the UUID module:

```ts
import { v4 as uuidv4 } from 'uuid';
```

Remove the res parameter from the GET function:

```ts
export async function GET(req: NextRequest) {
  // Existing code remains unchanged
}
```

Added Error Handling Check:

```ts
if (!keyRes.ok) {
  throw new Error('Failed to create API key');
}
```

Resolve TypeScript errors in `route.ts`

```bash
pnpm install --save-dev @types/uuid
```

Add Compatibility flags to Cloudflare function settings:

Production:

Compatibility flags: nodejs_compat

Preview:

Compatibility flags: nodejs_compat
