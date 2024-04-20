class Node {
    // The common prefix of child nodes
    part;

    // The value of the node to return on match
    store;

    // Children nodes
    inert;

    // A node to hold the URL parameter info
    params;

    // The value to return on wildcard matches
    wildcardStore;
}

class ParamNode {
    // The value of the parametric node to return on match
    store;

    // The next static node
    inert;

    // The parameter name
    name;
}
