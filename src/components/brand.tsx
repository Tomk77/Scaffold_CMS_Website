import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link className="brand" href="/" aria-label="Scaffold CMS home">
      <Image
        src="/brand/scaffold-icon.png"
        alt=""
        width={compact ? 30 : 36}
        height={compact ? 30 : 36}
        priority={!compact}
      />
      <span>
        Scaffold <b>CMS</b>
      </span>
    </Link>
  );
}
