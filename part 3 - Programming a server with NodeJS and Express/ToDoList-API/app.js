/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Importing all the required modules.
require('dotenv').config()
require('./database/mongo')

const express = require('express')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const handleErrors = require('./middlewares/handleErrors')
const notFound = require('./middlewares/notFound')
const taskRouter = require('./routes/taskRouter')
const cors = require('cors')

// Initialize express app
const app = express()

Sentry.init({
    dsn: 'https://335f1aac87ed49d1b3de12cd9e4e0a1f@o4504509848158208.ingest.sentry.io/4504509849600000',
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
})

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.use(cors())
app.use(express.json())

//routes
app.use(taskRouter)
app.use(Sentry.Handlers.errorHandler())
app.use(notFound)
app.use(handleErrors)

//launches the server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
