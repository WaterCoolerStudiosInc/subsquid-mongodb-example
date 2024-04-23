require('dotenv/config')
import app from "../api/index"
app.listen(3001, () => console.info('Server started'))
