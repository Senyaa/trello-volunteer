import Container from "@/app/components/ui/Container";
import Header from "@/app/components/ui/Header";
import UserRow from "./UserRow";
import getAllUsers from "@/actions/getAllUsers";

const AdminUsersPage = async () => {
  const users = await getAllUsers();

  return (
    <Container>
      <Header>Lista uzytkownikow</Header>
      {users?.map(user => <UserRow key={user.name} username={user.name} isAdmin={user.userType === "ADMIN"}/>)}
    </Container>
  );
};
export default AdminUsersPage;
