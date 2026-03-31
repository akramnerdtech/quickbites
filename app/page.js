import { Suspense } from "react";
import Herosection from "./heroSection/Herosection";

export default function Page() {
  return (
    <Suspense fallback={<main className="min-h-screen pt-24" />}>
      <Herosection />
    </Suspense>
  );
}
