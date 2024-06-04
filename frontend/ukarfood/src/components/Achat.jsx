import {
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Snackbar,
    TextField,
    Typography
  } from "@mui/material";
  import MuiAlert from "@mui/material/Alert";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  
  export default function Achat() {
    const [ingredients, setIngredients] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
    useEffect(() => { 
      fetchIngredients();
    }, []);
  
    const fetchIngredients = async () => {
      try {
        const response = await axios.get("http://localhost:8000/ingredient");
        setIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        showSnackbar(
          "Une erreur s'est produite lors du chargement des ingrédients.",
          "error"
        );
      }
    };
  
    const handleClickOpen = () => {
      setSelectedIngredients([]);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (e, index) => {
      const { name, value } = e.target;
      const updatedIngredients = [...selectedIngredients];
      updatedIngredients[index][name] = name === 'qteAchat' ? parseInt(value, 10) : value;
      setSelectedIngredients(updatedIngredients);
    };
  
    const handleAddIngredient = () => {
      setSelectedIngredients([...selectedIngredients, { idIngred: "", qteAchat: 0 }]);
    };
  
    const handleRemoveIngredient = (index) => {
      const updatedIngredients = [...selectedIngredients];
      updatedIngredients.splice(index, 1);
      setSelectedIngredients(updatedIngredients);
    };
  
    const handleSubmit = async () => {
      try {
        const achats = selectedIngredients.map((ingredient) => ({
          idIngred: ingredient.idIngred,
          qteAchat: ingredient.qteAchat,
          dateAchat: new Date().toISOString().split('T')[0], // Date de soumission du formulaire
        }));
        console.log('Achats à soumettre:', achats);
  
        const response = await axios.post("http://localhost:8000/achat", { achats });
        console.log('Réponse du serveur:', response.data);
  
        showSnackbar("Les achats ont été ajoutés avec succès.", "success");
        fetchIngredients();
        handleClose();
      } catch (error) {
        console.error("Error submitting achat:", error);
        if (error.response) {
          console.error("Data:", error.response.data);
          console.error("Status:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request:", error.request);
        } else {
          console.error("Error Message:", error.message);
        }
        showSnackbar("Une erreur s'est produite lors de la soumission des achats.", "error");
      }
    };
  
    const showSnackbar = (message, severity) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    };
  
    const handleSnackbarClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setSnackbarOpen(false);
    };
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Achats
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Ajouter un achat
        </Button>
        <Grid container spacing={4} style={{ marginTop: "2rem" }}>
          {ingredients.map((ingredient) => (
            <Grid item xs={12} sm={6} md={4} key={ingredient.idIngred}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{ingredient.nomIngred}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantité disponible: {ingredient.qteIngred}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ajouter un achat</DialogTitle>
          <DialogContent>
            {selectedIngredients.map((ingredient, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Ingrédient"
                    name="idIngred"
                    value={ingredient.idIngred}
                    onChange={(e) => handleChange(e, index)}
                    fullWidth
                    margin="dense"
                  >
                    {ingredients.map((ingred) => (
                      <MenuItem key={ingred.idIngred} value={ingred.idIngred}>
                        {ingred.nomIngred}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Quantité"
                    name="qteAchat"
                    type="number"
                    value={ingredient.qteAchat}
                    onChange={(e) => handleChange(e, index)}
                    fullWidth
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveIngredient(index)}
                    style={{ marginTop: "16px" }}
                  >
                    Supprimer
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddIngredient}
              style={{ marginTop: "16px" }}
            >
              Ajouter un ingrédient
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
    );
  }
  