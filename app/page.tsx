"use client";

import { useState } from "react";
import { createPublicClient, createWalletClient, custom, http, type Address } from "viem";
import contractData from "@/utils/contract.json";
import {
  generatePinataKey,
  uploadFile,
  uploadJson,
} from "@/utils/uploads";
import { baseSepolia } from "viem/chains";

export default function Home() {
  const [account, setAccount] = useState<Address>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [externalUrl, setExternalUrl] = useState<string>();
  const [file, setFile] = useState<File | undefined>();

  async function connect() {
    const walletClient = createWalletClient({
      chain: baseSepolia,
      transport: custom(window.ethereum),
    });

    const [address] = await walletClient.requestAddresses();
    setAccount(address);
  }

  async function mintNft() {
    if (!account) return;

    const walletClient = createWalletClient({
      chain: baseSepolia,
      transport: custom(window.ethereum),
    });
    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });

    const keyData = await generatePinataKey();

    const fileCID = await uploadFile(file, keyData.JWT);

    const metadata = {
      name: name,
      description: description,
      image: fileCID,
      external_url: externalUrl,
    };

    const uriCID = await uploadJson(metadata, keyData.JWT);

    const { request } = await publicClient.simulateContract({
      account,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x`,
      abi: contractData.abi,
      functionName: "safeMint",
      args: [account, `ipfs://${uriCID}`],
    });

    const res = await walletClient.writeContract(request);
    alert(res);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      {account ? (
        <>
          <div>Connected: {account}</div>
          <input
            className="border border-black rounded-md p-2"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border border-black rounded-md p-2"
            placeholder="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="border border-black rounded-md p-2"
            placeholder="https://pinata.cloud"
            type="text"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
          />
          <input
            className="border border-black rounded-md p-2"
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files && e.target.files.length > 0
                  ? e.target.files[0]
                  : undefined,
              )
            }
          />
          <button
            className="border border-black rounded-md p-2"
            onClick={mintNft}
          >
            Mint NFT
          </button>
        </>
      ) : (
        <button
          className="border border-black rounded-md p-2"
          onClick={connect}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
