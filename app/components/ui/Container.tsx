const Container = ({ classNames, children }: { classNames?: string, children: React.ReactNode }) => {
  return <div className={`px-4 md:px-36 pt-4 pb-16 md:pb-4 flex flex-col w-full ${classNames}`}>{children}</div>;
};
export default Container;
