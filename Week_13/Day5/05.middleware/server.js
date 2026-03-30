const logger = (req, res, next) => {
  console.log(req.url);
  console.log(req.params);
  console.log(req.query);
  next();
};

app.use(logger); // execute your middleware for all requests

app.get("/about", (req, res) => {
  return res.send("About Page");
});

/*When a user visits /about, Express will execute app.get(). But just before that, it will execute the middleware specified in app.use(). Once the middleware is executed, next() continues the execution of app.get().

Execution sequence:

client request → /about ⇒ logger() → app.get() → client response


When creating middleware, you aren’t forced to use next(). You can send your own response and override/omit app.get() entirely:

const logger = (req, res, next) => {
    console.log(req.url)
    console.log(req.params)
    console.log(req.query)
    res.send('Custom About page')
}


Execution sequence:

client request → /about ⇒ logger() → client response


If the middleware applies to only one or two routes, you can use this syntax to execute the middleware only for those routes:

const logger = (req, res, next) => {
    console.log(req.url)
    console.log(req.params)
    console.log(req.query)
    next()
}

app.get('/about', logger, (req, res) => {
    return res.send('About Page')
})


Note that we didn’t use app.use() but instead specified a middleware function as a parameter of app.get().

You can also execute your middleware only for requests that are under a specific path, e.g., /api:

app.use('/api', logger)


Multiple middleware can be used:

app.use([logger, auth])


Note that the middleware will be executed in the order they are declared.

Middleware can change the request object:

const auth = (req, res, next) => {
    const user = req.query.user
    if (user === 'admin') {
        req.user = { name: 'admin', id: 1 }
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
}


In this example, we added a user object to the request. This user object can now be used in the routes:

app.use(auth)

app.get('/about', (req, res) => {
    console.log(req.user)
    return res.send('About Page')
})
*/
