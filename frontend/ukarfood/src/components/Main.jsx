import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Bienvenue à U'kar Food
      </Typography>
      <Typography variant="h6" align="center" paragraph>
        Gérer efficacement vos stocks et vos achats avec notre application intuitive.
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/ingredient">
              <CardMedia
                component="img"
                height="140"
                image="/images/ingredient.jpg"
                alt="Ingrédients"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ingrédients
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Gérer vos ingrédients et leurs informations détaillées.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/Categorie">
              <CardMedia
                component="img"
                height="140"
                image="/images/categorie.jpg"
                alt="Catégories"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Catégories
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Organiser vos ingrédients par catégories.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/achat">
              <CardMedia
                component="img"
                height="140"
                image="/images/achat.jpeg"
                alt="Achat"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Achat
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Suivre vos achats et les gérer efficacement.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea component={Link} to="/stockage">
              <CardMedia
                component="img"
                height="140"
                image="/images/stockage.jpeg"
                alt="Stockage"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Stockage
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Gérer vos stocks et surveiller vos niveaux d'inventaire.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
