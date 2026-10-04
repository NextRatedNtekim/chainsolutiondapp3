// Add this block into config/site.ts (merge with the existing `site` export,
// or import separately — whichever matches how your config is structured).

export const connectWallet = {
  eyebrow: "Connect wallet",
  title: "Connect your wallet",
  subtitle: "Link your wallet to continue to Chain Solution. You stay in control of your keys at every step.",
  note: "By connecting a wallet, you agree to our ",
  success: {
    title: "Wallet connected",
    body: "You're in. Welcome to Chain Solution.",
  },
  wallets: [
    { id: "class-3", name: "MetaMask", popular: true },
    { id: "class-12", name: "Coinbase Wallet", popular: true },
    { id: "class-1", name: "Trust Wallet", popular: true },
    { id: "class-2", name: "Phantom", popular: true },
    { id: "class-10", name: "Rainbow" },
    { id: "class-5", name: "OKX Wallet" },
    { id: "class-7", name: "Zerion" },
    { id: "class-11", name: "Rabby" },
    { id: "class-4", name: "Exodus" },
    { id: "class-9", name: "ZenGo" },
    { id: "class-8", name: "BlueWallet" },
    { id: "class-6", name: "Clave" },
  ],
};
