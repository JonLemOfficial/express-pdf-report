const { Router } = require("express");
const InvoiceController = require("./controllers/InvoiceController");

const router = Router();

router.get("/invoices", InvoiceController.get);
router.get("/invoices/pdf", InvoiceController.getPDF);
router.get("/invoices/create", InvoiceController.create);
router.post("/invoices/create", InvoiceController.create);
router.get("/invoices/:id", InvoiceController.get);
router.put("/invoices/update/:id", InvoiceController.update);
router.delete("/invoices/delete/:id", InvoiceController.delete);

module.exports = router;