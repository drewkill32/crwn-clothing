import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.util";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import { ReactComponent as Logo } from "../../assests/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { selectCartHidden } from "../../redux/cart/cart.selectors";

import { selectCurrentUser } from "../../redux/user/user.selector";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink className="option" to="/shop">
        SHOP
      </OptionLink>
      <OptionLink className="option" to="/contact">
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionLink as="div" className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
