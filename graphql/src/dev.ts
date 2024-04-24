require('dotenv/config')
import { app } from './index'

app.listen(3001, () => console.info('Server started'))
