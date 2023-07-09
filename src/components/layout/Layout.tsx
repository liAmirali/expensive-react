import { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";

type Props = {} & PropsWithChildren;

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
