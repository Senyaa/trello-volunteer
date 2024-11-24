import Container from "@/app/components/ui/Container";
import Header from "@/app/components/ui/Header";
import Link from "next/link";

const AdminPage = () => {
  return (
    <Container>
      <Header>Panel admina</Header>
      <Link
        href="/admin/links"
        className="my-1 bg-white dark:bg-neutral-900 rounded-md px-4 p-2"
      >
        Linki z głównej
      </Link>
      <Link
        href="/admin/users"
        className="my-1 bg-white dark:bg-neutral-900 rounded-md px-4 p-2"
      >
        Zarządzaj uzytkownikami
      </Link>
    </Container>
  );
};

export default AdminPage;
