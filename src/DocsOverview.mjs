// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Url from "./common/Url.mjs";
import * as Next from "./bindings/Next.mjs";
import * as React from "react";
import * as Markdown from "./components/Markdown.mjs";
import * as Constants from "./common/Constants.mjs";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as VersionSelect from "./components/VersionSelect.mjs";

function DocsOverview$Card(Props) {
  var title = Props.title;
  var hrefs = Props.hrefs;
  var style = {
    maxWidth: "21rem"
  };
  return React.createElement("div", {
              className: "border border-gray-10 bg-gray-5 px-5 py-8 rounded-lg",
              style: style
            }, React.createElement("h2", {
                  className: "font-bold text-24 mb-4"
                }, title), React.createElement("ul", undefined, Belt_Array.map(hrefs, (function (param) {
                        var text = param[0];
                        return React.createElement("li", {
                                    key: text,
                                    className: "text-16 mb-1 last:mb-0"
                                  }, React.createElement(Markdown.A.make, {
                                        href: param[1],
                                        children: text
                                      }));
                      }))));
}

function DocsOverview$default(Props) {
  var showVersionSelectOpt = Props.showVersionSelect;
  var showVersionSelect = showVersionSelectOpt !== undefined ? showVersionSelectOpt : true;
  var router = Next.Router.useRouter(undefined);
  var url = Url.parse(router.route);
  var version = url.version;
  var version$1 = typeof version === "number" ? "latest" : version._0;
  var languageManual = [
    [
      "Overview",
      " /docs/manual/" + version$1 + "/introduction"
    ],
    [
      "Language Features",
      "/docs/manual/" + version$1 + "/overview"
    ],
    [
      "JS Interop",
      "/docs/manual/" + version$1 + "/embed-raw-javascript"
    ],
    [
      "Build System",
      "/docs/manual/" + version$1 + "/build-overview"
    ]
  ];
  var ecosystem = [
    [
      "Package Index",
      "/packages"
    ],
    [
      "rescript-react",
      "/docs/react/latest/introduction"
    ],
    [
      "GenType",
      "/docs/gentype/latest/introduction"
    ],
    [
      "Reanalyze",
      "https://github.com/reason-association/reanalyze"
    ]
  ];
  var tools = [[
      "Syntax Lookup",
      "/syntax-lookup"
    ]];
  var versionSelect;
  if (showVersionSelect) {
    var onChange = function (evt) {
      evt.preventDefault();
      var version = evt.target.value;
      var url = Url.parse(router.route);
      var targetUrl = "/" + (url.base.join("/") + ("/" + (version + ("/" + url.pagepath.join("/")))));
      return Next.Router.push(router, targetUrl);
    };
    versionSelect = React.createElement("div", {
          className: "text-fire"
        }, React.createElement(VersionSelect.make, {
              onChange: onChange,
              version: version$1,
              availableVersions: Constants.allManualVersions
            }));
  } else {
    versionSelect = null;
  }
  return React.createElement(React.Fragment, undefined, React.createElement("div", undefined, versionSelect, React.createElement("div", {
                      className: "mb-6"
                    }), React.createElement(Markdown.H1.make, {
                      children: "Docs"
                    })), React.createElement("div", {
                  className: "grid grid-cols-1 xs:grid-cols-2 gap-8"
                }, React.createElement(DocsOverview$Card, {
                      title: "Language Manual",
                      hrefs: languageManual
                    }), React.createElement(DocsOverview$Card, {
                      title: "Ecosystem",
                      hrefs: ecosystem
                    }), React.createElement(DocsOverview$Card, {
                      title: "Tools",
                      hrefs: tools
                    })));
}

var $$default = DocsOverview$default;

export {
  $$default ,
  $$default as default,
  
}
/* Next Not a pure module */
