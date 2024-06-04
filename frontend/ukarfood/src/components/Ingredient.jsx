import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Ingredient() {
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({
    "idIngred": 0,
    "nomIngred": "",
    "qteIngred": 0,
    "idCate": 0,
    "prixIngred": 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleClickOpen = (
    ingredient = {
      "idIngred": 0,
      "nomIngred": "",
      "qteIngred": 0,
      "idCate": 0,
      "prixIngred": 0,
    }
  ) => {
    setCurrentIngredient(ingredient);
    setEditMode(!!ingredient.idIngred);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentIngredient({
      "idIngred": 0,
      "nomIngred": "",
      "qteIngred": 0,
      "idCate": 0,
      "prixIngred": 0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentIngredient({ ...currentIngredient, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (
        !currentIngredient.nomIngred ||
        !currentIngredient.qteIngred ||
        !currentIngredient.idCate ||
        !currentIngredient.prixIngred
      ) {
        showSnackbar(
          "Veuillez remplir tous les champs du formulaire.",
          "warning"
        );
        return;
      }
  
      const newIngredientData = {
        "nomIngred": currentIngredient.nomIngred,
        "qteIngred": parseInt(currentIngredient.qteIngred),
        "idCate": parseInt(currentIngredient.idCate),
        "prixIngred": parseInt(currentIngredient.prixIngred),
      };
  
      if (editMode) {
        await axios.put(
          `http://localhost:8000/ingredient/${currentIngredient.idIngred}`,
          newIngredientData
        );
        showSnackbar("L'ingrédient a été modifié avec succès.", "success");
      } else {
        try {
          await axios.post("http://localhost:8000/ingredient/", newIngredientData);
          showSnackbar("L'ingrédient a été ajouté avec succès.", "success");
        } catch (error) {
          console.log(error)
        }
       
        
      }
      fetchIngredients();
      handleClose();
    } catch (error) {
      console.error("Error submitting ingredient:", error);
      showSnackbar(
        "Une erreur s'est produite lors de la soumission de l'ingrédient.",
        "error"
      );
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet ingrédient ?")) {
      try {
        await axios.delete(`http://localhost:8000/ingredient/${id}`);
        showSnackbar("L'ingrédient a été supprimé avec succès.", "success");
        fetchIngredients();
      } catch (error) {
        console.error("Error deleting ingredient:", error);
        showSnackbar(
          "Une erreur s'est produite lors de la suppression de l'ingrédient.",
          "error"
        );
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.nomIngred.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        Ingrédients
      </Typography>
      <TextField
        label="Rechercher"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen()}
      >
        Ajouter un ingrédient
      </Button>
      <Grid container spacing={4} style={{ marginTop: "2rem" }}>
        {filteredIngredients.map((ingredient) => (
          <Grid item xs={12} sm={6} md={4} key={ingredient.idIngred}>
            <Card>
              <CardContent>
                <Typography variant="h5">{ingredient.nomIngred}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantité: {ingredient.qteIngred}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleClickOpen(ingredient)}
                >
                  Modifier
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleDelete(ingredient.idIngred)}
                >
                  Supprimer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Modifier l'ingrédient" : "Ajouter un ingrédient"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nomIngred"
            label="Nom"
            type="text"
            fullWidth
            value={currentIngredient.nomIngred}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="qteIngred"
            label="Quantité"
            type="text"
            fullWidth
            value={currentIngredient.qteIngred}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="idCate"
            label="ID Catégorie"
            type="text"
            fullWidth
            value={currentIngredient.idCate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="prixIngred"
            label="Prix"
            type="text"
            fullWidth
            value={currentIngredient.prixIngred}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? "Modifier" : "Ajouter"}
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

