import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand
} from 'reactstrap';

export const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand style={{ userSelect: 'none' }}>
                    HackerNews
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <NavLink activeClassName="active" to="/stories/new" className="nav-link">
                        New Stories
                    </NavLink>

                    <NavLink activeClassName="active" to="/stories/top" className="nav-link">
                        Top Stories
                    </NavLink>

                    <NavLink activeClassName="active" to="/stories/best" className="nav-link">
                        Best Stories
                    </NavLink>
                </Collapse>
            </Navbar>
        </div>
    );
}
