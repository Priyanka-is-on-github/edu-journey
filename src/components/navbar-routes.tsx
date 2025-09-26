

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";


const NavbarRoutes = () => {
  const { pathname } = useLocation();
const isSearchPage = pathname === '/search';
const isTeacherPage = pathname?.startsWith("/teacher");
const isPlayerPage = pathname?.includes('/courses')


  return (
    <>
   {isSearchPage && (<div className="hidden md:block">
    {/* <SearchInput/> */}
    </div>)}


    <div className="flex gap-x-2 ml-auto items-center">

      {isTeacherPage || isPlayerPage ? (
        <Link to="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link to="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}

      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
    </>
  );
};
export default NavbarRoutes;
