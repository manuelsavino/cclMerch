import React from "react";
import { Link } from "react-router-dom";

import { StyledNavbar } from "../styled/Navbar";
import { StyledNavBrand } from "../styled/Navbar";
import { StyledNavItems } from "../styled/Navbar";
import { StyledLinkButton } from "../styled/Navbar";
import { Accent } from "../styled/Random";

import { useAuth0 } from "../auth";

export default function NavBar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to="/">
          CCL Past <Accent>Merch</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLinkButton to="/">Home</StyledLinkButton>
        </li>
        <li>
          <StyledLinkButton to="/new">New</StyledLinkButton>
        </li>
        {!isAuthenticated && (
          <li>
            <button onClick={loginWithRedirect}>Login</button>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </StyledNavItems>
    </StyledNavbar>
  );
}
