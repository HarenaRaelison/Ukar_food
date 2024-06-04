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

export default function Categorie() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCategorie, setCurrentCategorie] = useState({
    idCate: 0,
    NomCate: "",
    descriCate: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/categorie");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showSnackbar(
        "Une erreur s'est produite lors du chargement des catégories.",
        "error"
      );
    }
  };

  const handleClickOpen = (
    categorie = {
      idCate: 0,
      NomCate: "",
      descriCate: "",
    }
  ) => {
    setCurrentCategorie(categorie);
    setEditMode(!!categorie.idCate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCategorie({
      idCate: 0,
      NomCate: "",
      descriCate: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategorie({ ...currentCategorie, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!currentCategorie.NomCate || !currentCategorie.descriCate) {
        showSnackbar(
          "Veuillez remplir tous les champs du formulaire.",
          "warning"
        );
        return;
      }

      if (editMode) {
        await axios.put(
          `http://localhost:8000/categorie/${currentCategorie.idCate}`,
          currentCategorie
        );
        showSnackbar("La catégorie a été modifiée avec succès.", "success");
      } else {
        await axios.post(
          "http://localhost:8000/categorie/",
          currentCategorie
        );
        showSnackbar("La catégorie a été ajoutée avec succès.", "success");
      }
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error("Error submitting categorie:", error);
      showSnackbar(
        "Une erreur s'est produite lors de la soumission de la catégorie.",
        "error"
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await axios.delete(`http://localhost:8000/categorie/${id}`);
        showSnackbar("La catégorie a été supprimée avec succès.", "success");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting categorie:", error);
        showSnackbar(
          "Une erreur s'est produite lors de la suppression de la catégorie.",
          "error"
        );
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.filter((categorie) =>
    categorie.NomCate.toLowerCase().includes(searchTerm.toLowerCase())
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
        Catégories
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
        Ajouter une catégorie
      </Button>
      <Grid container spacing={4} style={{ marginTop: "2rem" }}>
        {filteredCategories.map((categorie) => (
          <Grid item xs={12} sm={6} md={4} key={categorie.idCate}>
            <Card>
              <CardContent>
                <Typography variant="h5">{categorie.NomCate}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {categorie.descriCate}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleClickOpen(categorie)}
                >
                  Modifier
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleDelete(categorie.idCate)}
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
          {editMode ? "Modifier la catégorie" : "Ajouter une catégorie"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="NomCate"
            label="Nom"
            type="text"
            fullWidth
            value={currentCategorie.NomCate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="descriCate"
            label="Description"
            type="text"
            fullWidth
            value={currentCategorie.descriCate}
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
