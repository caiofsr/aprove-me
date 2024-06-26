import Link from "next/link";
import { Button } from "./ui/button";
import PayableCard from "./payable-card";
import getPayables from "@/api/getPayables";

export async function PayableList() {
  const data = await getPayables();

  return (
    <div className="flex flex-col items-end max-w-7xl w-full mx-auto mt-5">
      <Link href="payables/create">
        <Button className="mb-5">Cadastrar novo pagável</Button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-14">
        {data?.map((payable) => (
          <Link href={`/payables/${payable.id}`} key={payable.id}>
            <PayableCard payable={payable} key={payable.id} />
          </Link>
        ))}
      </div>
    </div>
  );
}
