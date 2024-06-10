import Image from "next/image";
import React from "react";
import { Percent } from "lucide-react";
export default function Logo() {
  return (
    // <Image
    //   src={"/lojiper.png"}
    //   alt="lojiper logo"
    //   width={48}
    //   height={48}
    //   className="object-cover"
    // />
    <>
      <Percent width={48} height={48} />
    </>
  );
}
