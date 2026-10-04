import { ConnectForm } from "@/components/ConnectForm";

export default async function ConnectWalletPage({
  params,
}: {
  params: Promise<{ wallet: string }>;
}) {
  const { wallet } = await params;

  return (
    <main>
      <section className="wrap hero">
        <ConnectForm walletId={wallet} />
      </section>
    </main>
  );
}
