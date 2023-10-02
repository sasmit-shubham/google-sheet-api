const {google} = require("googleapis")
class sheetController{
    async getSheet(req,res){
        const auth =  new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        })
        const spreadsheetId = process.env.spreadSheetId
        const client = await auth.getClient()
        const googleheets = google.sheets({version:"v4", auth:client})
        const rows = await googleheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range:"Sheet1"
        })
        return res.json(rows?.data?.values)
    }

    async add(req,res){
        const {rowValues} = req.body;
        console.log(rowValues)
        const auth =  new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        })
        const spreadsheetId = process.env.spreadSheetId
        const client = await auth.getClient()
          // Instance of Google Sheets API
        const googleSheets = google.sheets({ version: "v4", auth: client });

  

        // Get metadata about spreadsheet
        const metaData = await googleSheets.spreadsheets.get({
            auth,
            spreadsheetId,
        });

        // Read rows from spreadsheet
        const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A:A",
        });

        // Write row(s) to spreadsheet
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1",
            valueInputOption: "USER_ENTERED",
            resource: {
            values:[rowValues],
            },
        });

        res.send("Successfully submitted! Thank you!");
    }
}
module.exports = new sheetController;