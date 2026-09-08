import HomePage from "@/components/Home";
import MailLayout from "@/components/MainLayout";
import Image from "next/image";

export default function Home({children}) {
  return (
    <>
   <MailLayout>
    {children}
   </MailLayout>
    </>
  );
}
