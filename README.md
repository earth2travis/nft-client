# MyNFT Client

[YouTube](https://www.youtube.com/watch?v=4ToR-z15Xfc)

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

````bash
NEXT_PUBLIC_CONTRACT_ADDRESS=
PINATA_JWT=
```bash

Replace `contract.json`

```bash
pnpm run dev
```bash

Update `page.tsx`

Update these constants to allow the input element to switch from being uncontrolled (without a value set by React) to controlled (with a value set by React).

```tsx
const [name, setName] = useState<string>('');
const [description, setDescription] = useState<string>('');
const [externalUrl, setExternalUrl] = useState<string>('');
````
