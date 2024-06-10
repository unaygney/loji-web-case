import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Image
      src={"/lojiper.jpeg"}
      alt="lojiper logo"
      width={48}
      height={48}
      className="object-cover"
    />
  );
}
