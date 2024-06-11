import React from "react";
import Summary from "./summary";
import DebtChart from "./debt-chart";
import { NotFoundIcon } from "@/components/icons";

export default function DashboardContainer({ debts }: { debts: any }) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold leading-8 text-gray-900 ">Özet</h1>
      <section className="flex flex-col gap-10">
        {debts?.length > 0 ? (
          <>
            <Summary debts={debts} />
            <DebtChart debts={debts} />
          </>
        ) : (
          <div className="w-full h-full flex flex-col mt-10 items-center justify-center">
            <p className="text-base text-zinc-600 leading-10 font-bold">
              Ödenecek borç bulunamadı
            </p>
            <NotFoundIcon />
          </div>
        )}
      </section>
    </main>
  );
}
