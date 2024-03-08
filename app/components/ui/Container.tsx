const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-4 pt-4 pb-16 flex flex-col w-full">{children}</div>;
};
export default Container;
