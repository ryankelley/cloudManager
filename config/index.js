
module.exports = {
    port: 3555,
    otterConfig: {
        "directory": "actions",
        "routerName": "cloudRouter",
        "diagnostics": true,
        "methods": {
            "get": "get",
            "list": "get",
            "view": "get",
            "change": "put",
            "put": "put",
            "update": "put",
            "post": "post",
            "create": "post",
            "delete": "delete",
            "remove": "delete"
        },
        "fileMatchersForId": ["get", "put", "update", "delete"],
        "routeParamMatchers": {}
    }
};