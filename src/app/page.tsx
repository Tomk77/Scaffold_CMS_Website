import { MarketingHome } from "@/features/marketing/marketing-home";
import { getCmsBootstrapOrNull } from "@/lib/cms/client";

export default async function Home() {
  const cms = await getCmsBootstrapOrNull();
  return <MarketingHome cms={cms} />;
}
