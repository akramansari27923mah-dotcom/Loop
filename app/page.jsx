import MailLayout from "@/components/MainLayout";

export default function Home({ children }) {
  return (
    <>
      <MailLayout>{children}</MailLayout>
    </>
  );
}
