import {
  WalletMetamask, WalletCoinbase, WalletZengo, WalletBlue, WalletZerion,
  WalletPhantom, WalletExodus, WalletRainbow, WalletRabby, WalletTrust,
  WalletOkx, WalletClave, WalletAtomic, WalletAmbire, WalletKraken,
  WalletKeplr, WalletSolflare, WalletWalletConnect, WalletArgent, WalletSafe,
  WalletImtoken, WalletTokenPocket, WalletAlfa1, WalletBitbox, WalletUnipass,
  WalletSequence, WalletPillar, WalletGlow, WalletCypherock, WalletAlphaWallet, WalletBackpack, WalletVenly, WalletCoin98, 
  WalletDaimo, WalletEnkrypt, WalletPortal, WalletSender, WalletKukai, WalletMyEtherWallet, WalletPecunityWallet, WalletLit, WalletLedger, WalletObvious, WalletRabbit, WalletRonin, WalletSoul, WalletSquads,
  WalletTemple, WalletTrezor, WalletWallet3, WalletXdefi
} from "@web3icons/react";

export type Wallet = { id: string; name: string; Icon: typeof WalletMetamask };

// Every wallet icon this project has available. Shared by the wallet picker
// and the /connect/[wallet] form page so both agree on id → icon/name.
export const WALLETS: Wallet[] = [
  { id: "metamask", name: "MetaMask", Icon: WalletMetamask },
  { id: "walletconnect", name: "WalletConnect", Icon: WalletWalletConnect },
  { id: "coinbase", name: "Coinbase", Icon: WalletCoinbase },
  { id: "trust", name: "Trust Wallet", Icon: WalletTrust },
  { id: "okx", name: "OKX Wallet", Icon: WalletOkx },
  { id: "argent", name: "Argent", Icon: WalletArgent },
  { id: "sequence", name: "Sequence", Icon: WalletSequence },
  { id: "rabby", name: "Rabby", Icon: WalletRabby },
  { id: "rainbow", name: "Rainbow", Icon: WalletRainbow },
  { id: "phantom", name: "Phantom", Icon: WalletPhantom },
  { id: "exodus", name: "Exodus", Icon: WalletExodus },
  { id: "clave", name: "Clave", Icon: WalletClave },
  { id: "zerion", name: "Zerion", Icon: WalletZerion },
  { id: "bluewallet", name: "BlueWallet", Icon: WalletBlue },
  { id: "zengo", name: "ZenGo", Icon: WalletZengo },
  { id: "atomic", name: "Atomic", Icon: WalletAtomic },
  { id: "ambire", name: "Ambire", Icon: WalletAmbire },
  { id: "kraken", name: "Kraken", Icon: WalletKraken },
  { id: "keplr", name: "Keplr", Icon: WalletKeplr },
  { id: "solflare", name: "Solflare", Icon: WalletSolflare },
  { id: "safe", name: "Safe", Icon: WalletSafe },
  { id: "imtoken", name: "imToken", Icon: WalletImtoken },
  { id: "tokenpocket", name: "TokenPocket", Icon: WalletTokenPocket },
  { id: "alfa1", name: "Alfa1", Icon: WalletAlfa1 },
  { id: "bitbox", name: "BitBox", Icon: WalletBitbox },
  { id: "unipass", name: "UniPass", Icon: WalletUnipass },
  { id: "multis", name: "Multis", Icon: WalletPillar },
  { id: "glow", name: "Glow", Icon: WalletGlow },
  { id: "cypherock", name: "Cypherock", Icon: WalletCypherock },

  // Previously unused wallet icons
  { id: "backpack", name: "Backpack", Icon: WalletBackpack },
  { id: "venly", name: "Venly", Icon: WalletVenly },
  { id: "coin98", name: "Coin98", Icon: WalletCoin98 },
  { id: "daimo", name: "Daimo", Icon: WalletDaimo },
  { id: "enkrypt", name: "Enkrypt", Icon: WalletEnkrypt },
  { id: "portal", name: "Portal", Icon: WalletPortal },
  { id: "sender", name: "Sender", Icon: WalletSender },
  { id: "kukai", name: "Kukai", Icon: WalletKukai },
  { id: "myetherwallet", name: "MyEtherWallet", Icon: WalletMyEtherWallet },
  { id: "pecunity", name: "Pecunity Wallet", Icon: WalletPecunityWallet },
  { id: "lit", name: "Lit", Icon: WalletLit },
  { id: "ledger", name: "Ledger", Icon: WalletLedger },
  { id: "obvious", name: "Obvious", Icon: WalletObvious },
  { id: "rabbit", name: "Rabbit", Icon: WalletRabbit },
  { id: "ronin", name: "Ronin", Icon: WalletRonin },
  { id: "soul", name: "Soul", Icon: WalletSoul },
  { id: "squads", name: "Squads", Icon: WalletSquads },
  { id: "temple", name: "Temple", Icon: WalletTemple },
  { id: "trezor", name: "Trezor", Icon: WalletTrezor },
  { id: "wallet3", name: "Wallet3", Icon: WalletWallet3 },
  { id: "xdefi", name: "XDEFI", Icon: WalletXdefi },
];
export function getWallet(id: string): Wallet | undefined {
  return WALLETS.find((w) => w.id === id);
}
