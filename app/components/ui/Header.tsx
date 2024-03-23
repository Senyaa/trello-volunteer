
const Header = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return <h2 className="font-extrabold my-2 text-lg">{children}</h2>
}

export default Header;