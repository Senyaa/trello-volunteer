const Container = ({ classNames, children }: { classNames?: string, children: React.ReactNode }) => {
  return <div className={`px-4 pt-4 pb-16 flex flex-col w-full ${classNames}`}>{children}</div>;
};
export default Container;
