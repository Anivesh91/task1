const dotenv = require('dotenv');
dotenv.config();
const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/config/db');



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

