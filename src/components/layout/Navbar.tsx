const Navbar = () => {
  return (
    <nav className="py-6 px-4">
      <div className="flex space-x-2">
        <div className="w-10 h-10 rounded-full border overflow-hidden">
          <img src="/boy.png" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm">Amirali Lotfi</span>
          <span className="text-xs">liamirali.lotfi@gmail.com</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
