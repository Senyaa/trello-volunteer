import Container from "@/app/components/ui/Container";
import LinkList from "./LinkList";
import Header from "@/app/components/ui/Header";
import getLinks from "@/actions/getLinks";
import { deleteLink } from "@/actions/deleteLink";

const Links = async () => {
  const links = await getLinks();

  const handleRemove = async (idToRemove?: string) => {
    "use server";
    //TODO: add modal
    if (!idToRemove) {
      console.error("No id to remove");
    } else {
      delete links[Number(idToRemove)];
      await deleteLink(idToRemove);
    }
  };

  return (
    <Container>
      <Header>Zarządzaj linkami</Header>
      <LinkList linkList={links} onRemove={handleRemove} />
    </Container>
  );
};

export default Links;
