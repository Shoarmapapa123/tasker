this["spa_templates"] = this["spa_templates"] || {};
this["spa_templates"]["templates"] = this["spa_templates"]["templates"] || {};
this["spa_templates"]["templates"]["chart"] = this["spa_templates"]["templates"]["chart"] || {};
this["spa_templates"]["templates"]["chart"]["difference"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section id='chartDifferencesSection'><canvas id='chartDifferences'></canvas>\r\n<script id='chatDifferencesScript'>\r\n    var x = document.getElementById('chartDifferences');\r\n    var xLC= new Chart(x,\r\n{\r\n    type: \"line\",\r\n    data: {\r\n        labels: ["
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"turns") : depth0), depth0))
    + "],\r\n        datasets:[{\r\n                data:["
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"difference") : depth0), depth0))
    + "],\r\n                label: \"Verschil\",\r\n                borderColor: \"#000000\",\r\n                fill: false\r\n                \r\n        }]\r\n    },\r\n    options: {\r\n        title:{\r\n            display: true,\r\n            text: \"Verschil\"\r\n        }\r\n    }\r\n})\r\n</script></section>";
},"useData":true});
Handlebars.registerPartial("fiche", Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "fiche fiche--"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"colour") || (depth0 != null ? lookupProperty(depth0,"colour") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"colour","hash":{},"data":data,"loc":{"start":{"line":1,"column":13},"end":{"line":1,"column":23}}}) : helper)))
    + " growAndFade";
},"useData":true}));
this["spa_templates"]["templates"]["chart"]["piecesonboard"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section id='chartPiecesSection'><canvas id='chartPieces'></canvas>\r\n<script id='chatPiecesScript'>\r\n    var x = document.getElementById('chartPieces');\r\n    var xLC= new Chart(x,\r\n{\r\n    type: \"line\",    \r\n    data: {\r\n        labels: ["
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"turns") : depth0), depth0))
    + "],\r\n        datasets:[{\r\n                data:["
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"black") : depth0), depth0))
    + "],\r\n                label: \"Black\",\r\n                borderColor: \"#000000\",\r\n                fill: false\r\n                \r\n        },{\r\n                data:["
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"white") : depth0), depth0))
    + "],\r\n                label: \"White\",\r\n                borderColor: \"#cccccc\",\r\n                fill: false\r\n        }]\r\n    },\r\n    options: {\r\n        title:{\r\n            display: true,\r\n            text: \"Pieces on board\"\r\n        }\r\n    }\r\n})\r\n</script></section>";
},"useData":true});
this["spa_templates"]["templates"]["board"] = this["spa_templates"]["templates"]["board"] || {};
this["spa_templates"]["templates"]["board"]["board"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"board--tile\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ColourWhite") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":8,"column":19}}})) != null ? stack1 : "")
    + "        </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class = \""
    + ((stack1 = container.invokePartial(lookupProperty(partials,"fiche"),depth0,{"name":"fiche","hash":{"colour":"white"},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\"></div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"ColourBlack") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":8,"column":12}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class = \""
    + ((stack1 = container.invokePartial(lookupProperty(partials,"fiche"),depth0,{"name":"fiche","hash":{"colour":"black"},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\"></div>            \r\n            ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id='gameBoardHBS' class='board'>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"boardTile") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":10,"column":13}}})) != null ? stack1 : "")
    + "</div>  ";
},"usePartial":true,"useData":true});
this["spa_templates"]["templates"]["feedbackWidget"] = this["spa_templates"]["templates"]["feedbackWidget"] || {};
this["spa_templates"]["templates"]["feedbackWidget"]["body"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section class=\"body\">\r\n "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"bericht") || (depth0 != null ? lookupProperty(depth0,"bericht") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"bericht","hash":{},"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":2,"column":12}}}) : helper)))
    + "\r\n </section>";
},"useData":true});
this["spa_templates"]["templates"]["game"] = this["spa_templates"]["templates"]["game"] || {};
this["spa_templates"]["templates"]["game"]["api"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<article id='randomAmiibo' class='amiibo'>\r\n    <h3>Random Amiibo:</h3>\r\n    <h5>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"amiibo") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + " ("
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"amiibo") : depth0)) != null ? lookupProperty(stack1,"gameSeries") : stack1), depth0))
    + ")</h5>\r\n    <img src='"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"amiibo") : depth0)) != null ? lookupProperty(stack1,"image") : stack1), depth0))
    + "'/>\r\n</article>";
},"useData":true});