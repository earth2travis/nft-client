import { createPublicClient, createWalletClient, custom, http } from "viem";
import { baseSepolia } from "viem/chains";
import "viem/window";

function handleClient(){
  if(typeof window === "undefined"){
    return http()
  } else {
    return custom(window.ethereum)
  }
}

export const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: handleClient()
});

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});
