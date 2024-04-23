const route = routesMap[path];
if (route) {
    // Run some stuff with route
}

for (const route of dynamicRoutes) {
    const matchArr = path.match(route.pattern);

    if (matchArr) {
        // Extract params and run some stuff
    }
}
