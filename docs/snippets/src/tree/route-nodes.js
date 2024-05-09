class Node {
    // Common prefix
    prefix;

    // The value to return in case of exact match
    store;

    // The value to return in case of wildcard match
    wildcardStore;

    // Store all children node
    children;

    // Store an URL parameter that goes after the node, eg. /path/:id
    paramNode;
}

class ParametricNode {
    // A nornal node that represents the next part after the parameter, eg. /:id/path
    child;

    // The value to return if the path matches the pattern
    store;

    // The parameter name
    name;
}
