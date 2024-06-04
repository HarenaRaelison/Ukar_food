/* eslint-disable */
import * as React from 'react';
import { AppBar, Toolbar, Typography, List, ListItem, Button } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import './SideBar.css';

const drawerWidth = 240;

export default function SideBar() {
  return (
    <AppBar position="static" style={{ backgroundColor: 'rgb(23, 81, 136)' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component={Link} to="/" className="title" style={{ color: 'rgb(245, 222, 99)', textDecoration: 'none' }}>
          U'kar Food
        </Typography>
        <List style={{ display: 'flex', padding: 0 }}>
          <ListItem style={{ width: 'auto' }}>
            <NavLink to="/ingredient" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <Button className={isActive ? 'active' : ''} style={{ color: 'rgb(253, 253, 252)' }}>
                  Ingrédient
                </Button>
              )}
            </NavLink>
          </ListItem>
          <ListItem style={{ width: 'auto' }}>
            <NavLink to="/Categorie" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <Button className={isActive ? 'active' : ''} style={{ color: 'rgb(253, 253, 252)' }}>
                  Catégorie
                </Button>
              )}
            </NavLink>
          </ListItem>
          <ListItem style={{ width: 'auto' }}>
            <NavLink to="/achat" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <Button className={isActive ? 'active' : ''} style={{ color: 'rgb(253, 253, 252)' }}>
                  Achat
                </Button>
              )}
            </NavLink>
          </ListItem>
          <ListItem style={{ width: 'auto' }}>
            <NavLink to="/stockage" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <Button className={isActive ? 'active' : ''} style={{ color: 'rgb(253, 253, 252)' }}>
                  Stockage
                </Button>
              )}
            </NavLink>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
}
