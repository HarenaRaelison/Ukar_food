import React, { useEffect, useState } from "react";
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
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Stockage() {
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMovements, setSelectedMovements] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get("http://localhost:8000/ingredient");
      setIngredients(response.data);

      const lowStockIngredients = response.data.filter(
        (ingredient) => ingredient.qteIngred < 5
      );

      if (lowStockIngredients.length > 0) {
        const message = `Attention: Les ingrédients suivants sont en stock faible: ${lowStockIngredients
          .map((ing) => ing.nomIngred)
          .join(", ")}`;
        showSnackbar(message, "warning");
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { message, severity: "warning" }
        ]);
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      showSnackbar(
        "Une erreur s'est produite lors du chargement des ingrédients.",
        "error"
      );
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          message:
            "Une erreur s'est produite lors du chargement des ingrédients.",
          severity: "error"
        }
      ]);
    }
  };

  const handleClickOpen = () => {
    setSelectedMovements([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMovements = [...selectedMovements];
    updatedMovements[index][name] = value;
    setSelectedMovements(updatedMovements);
  };

  const handleAddMovement = () => {
    setSelectedMovements([
      ...selectedMovements,
      { idIngred: "", typemouvstock: "", qteUtils: 0, datestock: "" }
    ]);
  };

  const handleRemoveMovement = (index) => {
    const updatedMovements = [...selectedMovements];
    updatedMovements.splice(index, 1);
    setSelectedMovements(updatedMovements);
  };

  const handleSubmit = async () => {
    try {
      const stockMovements = selectedMovements.map((movement) => ({
        idIngred: movement.idIngred,
        typemouvstock: movement.typemouvstock,
        qteUtils: parseInt(movement.qteUtils, 10),
        datestock: new Date().toISOString().split("T")[0]
      }));
      console.log(stockMovements);

      await axios.post("http://localhost:8000/stockage", { stockMovements });
      showSnackbar(
        "Les mouvements de stock ont été ajoutés avec succès.",
        "success"
      );
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          message: "Les mouvements de stock ont été ajoutés avec succès.",
          severity: "success"
        }
      ]);
      fetchIngredients();
      handleClose();
    } catch (error) {
      console.error("Error submitting stock movement:", error);
      showSnackbar(
        "Une erreur s'est produite lors de la soumission des mouvements de stock.",
        "error"
      );
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          message:
            "Une erreur s'est produite lors de la soumission des mouvements de stock.",
          severity: "error"
        }
      ]);
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

  const handleNotificationsClickOpen = () => {
    setNotificationsOpen(true);
  };

  const handleNotificationsClose = () => {
    setNotificationsOpen(false);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestion des Stocks
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Ajouter un mouvement de stock
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleNotificationsClickOpen}
        style={{ marginLeft: "1rem" }}
      >
        Voir les notifications
      </Button>
      <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
        Répartition des quantités disponibles
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={ingredients}
            dataKey="qteIngred"
            nameKey="nomIngred"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {ingredients.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
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
        <DialogTitle>Ajouter un mouvement de stock</DialogTitle>
        <DialogContent>
          {selectedMovements.map((movement, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Ingrédient"
                  name="idIngred"
                  value={movement.idIngred}
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
                  select
                  label="Type de mouvement"
                  name="typemouvstock"
                  value={movement.typemouvstock}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  margin="dense"
                >
                  <MenuItem value="entrée">Entrée</MenuItem>
                  <MenuItem value="sortie">Sortie</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Quantité"
                  name="qteUtils"
                  type="number"
                  value={movement.qteUtils}
                  onChange={(e) => handleChange(e, index)}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveMovement(index)}
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
            onClick={handleAddMovement}
            style={{ marginTop: "16px" }}
          >
            Ajouter un mouvement
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
      <Dialog
        open={notificationsOpen}
        onClose={handleNotificationsClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={notification.message}
                  secondary={notification.severity}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotificationsClose} color="primary">
            Fermer
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
