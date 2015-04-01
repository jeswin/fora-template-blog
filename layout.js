/*
    This file contains the basic structure of every page.
    Page contents go into the body.
    If you want to add additional scripts (like Google Analytics, do it here)
*/
import React from "react";

export default function*(reactClass, request) {
    var props;

    if (reactClass.getPropsOnServer)
        props = yield* reactClass.getPropsOnServer(request);

    props = props || {};
    var component = React.createFactory(reactClass)(props);
    var html = `
<!DOCTYPE html>
<html>
    <head>
        <title>${props.title}</title>
        <link href="/css/main.css" rel="stylesheet" media="screen" />
        <script src="/js/app.bundle.js" />
        <script>
            var __initialProps = ${JSON.stringify(props)};
        </script>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </head>
    <body class="${props.pageName}">
        <div class="app-container">
        ${React.renderToString(component)}
        </div>
    </body>
</html>
    `;

    return html;
}
