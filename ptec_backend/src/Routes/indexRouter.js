const express = require('express')
const router = express.Router();
const userController = require ('../Controller/userController')
const adminController = require ('../Controller/adminController')

router.post("/login", userController.login);

router.post("/registrar", adminController.registerUser);
router.get("/adm/obtenerEncuestas", adminController.obtenerEncuestas);
router.post("/adm/addEncuesta", adminController.crearEncuesta);
router.post("/adm/addPregunta", adminController.agregarPregunta);
router.post("/adn/addOpcion", adminController.agregarOpcion);

router.post("/getPreguntas", adminController.getPreguntas);
router.post("/getOpciones", adminController.getOpciones);
router.post("/getEncuesta", adminController.obtenerEncuesta)
router.post("/getResultados", adminController.getResultados)

//Dashboard Data
router.get("/getUsuarios", adminController.getUsuarios);
router.get("/datosEncuestas", adminController.getDatosEncuestas);

router.post("/insertarRespuestas", userController.insertarRespuestas)
router.post("/getAcceso", userController.getAcceso)


module.exports = router;