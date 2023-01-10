const fs = require("fs");
const { join } = require("path");
const jsreport = require("../config/jsreport");
const InvoiceModel = require("../models/InvoiceModel");

const InvoiceController = {
    
    async get(req, res) {
        const { id = null } = req.params;

        if ( id ) {
            const invoice = await InvoiceModel.findOne({ id });
            return res.json(invoice);
        }
        
        const invoices = await InvoiceModel.find();
        return res.json(invoices);
    },

    async getPDF(req, res) {

        const invoices = await InvoiceModel.find();
        const result = await jsreport.render({
            template: {
                content: fs.readFileSync(
                    join(__dirname, "..", "views", "chart.ejs")
                ).toString(),
                engine: "ejs",
                recipe: "chrome-pdf"
            },
            data: {
                invoices
            }
        });

        await fs.promises.writeFile(
            join(__dirname, "..", "files", "invoices.pdf"),
            result.content
        );
            
        return res.download(
            join(__dirname, "..", "files", "invoices.pdf")
        );

    },

    async create(req, res) {
        if ( req.method === "GET" ) {
            res.status(200).render("create-invoice");
        } else if ( req.method === "POST" ) {
            const { product_name, price } = req.body;

            try {
                await InvoiceModel.create({ product_name, price });
                // console.log(created);
                res.json({ msg: "Invoice created succesfully."});
            } catch (err) {
                res.json({ err: "Could not create the invoice."});
            }
        }
    },
    
    async update(req, res) {
        const { product_name, price } = req.body;
        const { id = null } = req.params;
        
        try {
            await InvoiceModel.updateOne({ id }, { product_name, price });
            res.json({ msg: "Invoice edited succesfully."});
        } catch (err) {
            res.json({ err: "Could not edit the invoice."});
        }
    },
    
    async delete(req, res) {
        const { id = null } = req.params;
        
        try {
            await InvoiceModel.deleteOne({ id })
            res.json({ msg: "Invoice deleted succesfully."});
        } catch (err) {
            res.json({ err: "Could not delete the invoice."});
        }
    }
};

module.exports = InvoiceController;