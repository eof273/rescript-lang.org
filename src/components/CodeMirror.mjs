// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Id from "rescript/lib/es6/belt_Id.js";
import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Caml_obj from "rescript/lib/es6/caml_obj.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Codemirror from "codemirror";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Belt_HashMap from "rescript/lib/es6/belt_HashMap.js";

var useWindowWidth = (() => {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0
    };
  }

  const [windowSize, setWindowSize] = React.useState(getSize);

  let throttled = false;
  React.useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      if(!throttled) {
        setWindowSize(getSize());

        throttled = true;
        setTimeout(() => { throttled = false }, 300);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  if(windowSize) {
    return windowSize.width;
  }
  return null;
  });

var errorGutterId = "errors";

var $$Error = {};

var HoverHint = {};

var make = (function() {
    const tooltip = document.createElement("div");
    tooltip.id = "hover-tooltip"
    tooltip.className = "absolute hidden select-none font-mono text-12 z-10 bg-sky-10 py-1 px-2 rounded"

    return tooltip
  });

var hide = (function(tooltip){
    tooltip.classList.add("hidden")
  });

var update = (function(tooltip, top, left, text){
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";

    tooltip.classList.remove("hidden");

    tooltip.innerHTML = text;
  });

var attach = (function(tooltip) {
    document.body.appendChild(tooltip);
  });

var clear = (function(tooltip) {
    tooltip.remove()
  });

var tooltip = Curry._1(make, undefined);

var isSpanToken = (function(el) {
  return el.tagName.toUpperCase() === "SPAN" && el.getAttribute("role") !== "presentation"
});

function useHoverTooltip(cmStateRef, cmRef, param) {
  var stateRef = React.useRef(/* Hidden */0);
  var markerRef = React.useRef(undefined);
  React.useEffect((function () {
          attach(tooltip);
          return (function (param) {
                    return clear(tooltip);
                  });
        }), []);
  var checkIfTextMarker = (function(el) {
    let isToken = el.tagName.toUpperCase() === "SPAN" && el.getAttribute("role") !== "presentation";
    return isToken && /CodeMirror-hover-hint-marker/.test(el.className)
  });
  var onMouseOver = function (evt) {
    var cm = cmRef.current;
    if (cm !== undefined) {
      var cm$1 = Caml_option.valFromOption(cm);
      var target = evt.target;
      if (!checkIfTextMarker(target) && isSpanToken(target)) {
        var match = cmStateRef.current;
        var hoverHints = match.hoverHints;
        var pageX = evt.pageX;
        var pageY = evt.pageY;
        var coords = cm$1.coordsChar({
              top: pageY,
              left: pageX
            });
        var col = coords.ch;
        var line = coords.line + 1 | 0;
        var found = hoverHints.find(function (item) {
              var end = item.end;
              var start = item.start;
              if (line >= start.line && line <= end.line && col >= start.col) {
                return col <= end.col;
              } else {
                return false;
              }
            });
        if (found !== undefined) {
          update(tooltip, pageY - 35 | 0, pageX, found.hint);
          var from_line = found.start.line - 1 | 0;
          var from_ch = found.start.col;
          var from = {
            line: from_line,
            ch: from_ch
          };
          var to__line = found.end.line - 1 | 0;
          var to__ch = found.end.col;
          var to_ = {
            line: to__line,
            ch: to__ch
          };
          var markerObj = {
            className: "CodeMirror-hover-hint-marker border-b"
          };
          var match$1 = stateRef.current;
          if (match$1) {
            var hideTimer = match$1.hideTimer;
            if (hideTimer !== undefined) {
              clearTimeout(Caml_option.valFromOption(hideTimer));
            }
            match$1.marker.clear();
            var marker = cm$1.markText(from, to_, markerObj);
            stateRef.current = {
              el: match$1.el,
              marker: marker,
              hoverHint: found,
              hideTimer: undefined,
              [Symbol.for("name")]: "Shown"
            };
          } else {
            var marker$1 = cm$1.markText(from, to_, markerObj);
            markerRef.current = Caml_option.some(marker$1);
            stateRef.current = {
              el: target,
              marker: marker$1,
              hoverHint: found,
              hideTimer: undefined,
              [Symbol.for("name")]: "Shown"
            };
          }
        }
        
      }
      
    }
    
  };
  var onMouseOut = function (_evt) {
    var match = stateRef.current;
    if (!match) {
      return ;
    }
    var hideTimer = match.hideTimer;
    var marker = match.marker;
    if (hideTimer !== undefined) {
      clearTimeout(Caml_option.valFromOption(hideTimer));
    }
    marker.clear();
    var timerId = setTimeout((function (param) {
            stateRef.current = /* Hidden */0;
            return hide(tooltip);
          }), 200);
    stateRef.current = {
      el: match.el,
      marker: marker,
      hoverHint: match.hoverHint,
      hideTimer: Caml_option.some(timerId),
      [Symbol.for("name")]: "Shown"
    };
    
  };
  var onMouseMove = function (evt) {
    var match = stateRef.current;
    if (!match) {
      return ;
    }
    var pageX = evt.pageX;
    var pageY = evt.pageY;
    update(tooltip, pageY - 35 | 0, pageX, match.hoverHint.hint);
    
  };
  return [
          onMouseOver,
          onMouseOut,
          onMouseMove
        ];
}

function make$1(rowCol, kind, param) {
  var marker = document.createElement("div");
  var colorClass = kind === "Error" ? "text-fire bg-fire-100" : "text-orange bg-orange-15";
  marker.id = "gutter-marker_" + rowCol[0] + "-" + rowCol[1];
  marker.className = "flex items-center justify-center text-14 text-center ml-1 h-6 font-bold hover:cursor-pointer " + colorClass;
  marker.innerHTML = "!";
  return marker;
}

function extractRowColFromId(id) {
  var match = id.split("_");
  if (match.length !== 2) {
    return ;
  }
  var rowColStr = match[1];
  var match$1 = rowColStr.split("-");
  if (match$1.length !== 2) {
    return ;
  }
  var rowStr = match$1[0];
  var colStr = match$1[1];
  var row = Belt_Int.fromString(rowStr);
  var col = Belt_Int.fromString(colStr);
  if (row !== undefined && col !== undefined) {
    return [
            row,
            col
          ];
  }
  
}

function hash(a) {
  return a;
}

var eq = Caml_obj.caml_equal;

var ErrorHash = Belt_Id.MakeHashable({
      hash: hash,
      eq: eq
    });

function updateErrors(state, onMarkerFocus, onMarkerFocusLeave, cm, errors) {
  Belt_Array.forEach(state.marked, (function (mark) {
          mark.clear();
          
        }));
  var errorsMap = Belt_HashMap.make(errors.length, ErrorHash);
  state.marked = [];
  cm.clearGutter(errorGutterId);
  var wrapper = cm.getWrapperElement();
  Belt_Array.forEachWithIndex(errors, (function (idx, e) {
          if (Belt_HashMap.has(errorsMap, e.row)) {
            return ;
          }
          var marker = make$1([
                e.row,
                e.column
              ], e.kind, undefined);
          Belt_HashMap.set(errorsMap, e.row, idx);
          wrapper.appendChild(marker);
          var row = e.row - 1 | 0;
          var endRow = e.endRow - 1 | 0;
          cm.setGutterMarker(row, errorGutterId, marker);
          var from_ch = e.column;
          var from = {
            line: row,
            ch: from_ch
          };
          var to__ch = e.endColumn;
          var to_ = {
            line: endRow,
            ch: to__ch
          };
          var match = e.kind;
          var markTextColor = match === "Error" ? "border-fire" : "border-orange";
          var __x = cm.markText(from, to_, {
                className: "border-b border-dotted hover:cursor-pointer " + markTextColor,
                attributes: {
                  id: "text-marker_" + (String(e.row) + ("-" + (String(e.column) + "")))
                }
              });
          state.marked.push(__x);
          
        }));
  var isMarkerId = function (id) {
    if (id.startsWith("gutter-marker")) {
      return true;
    } else {
      return id.startsWith("text-marker");
    }
  };
  wrapper.onmouseover = (function (evt) {
      var target = evt.target;
      var id = target.id;
      if (!isMarkerId(id)) {
        return ;
      }
      var rowCol = extractRowColFromId(id);
      if (rowCol !== undefined) {
        return Belt_Option.forEach(onMarkerFocus, (function (cb) {
                      return Curry._1(cb, rowCol);
                    }));
      }
      
    });
  wrapper.onmouseout = (function (evt) {
      var target = evt.target;
      var id = target.id;
      if (!isMarkerId(id)) {
        return ;
      }
      var rowCol = extractRowColFromId(id);
      if (rowCol !== undefined) {
        return Belt_Option.forEach(onMarkerFocusLeave, (function (cb) {
                      return Curry._1(cb, rowCol);
                    }));
      }
      
    });
  
}

function CodeMirror(Props) {
  var errorsOpt = Props.errors;
  var hoverHintsOpt = Props.hoverHints;
  var minHeight = Props.minHeight;
  var maxHeight = Props.maxHeight;
  var className = Props.className;
  var style = Props.style;
  var onChange = Props.onChange;
  var onMarkerFocus = Props.onMarkerFocus;
  var onMarkerFocusLeave = Props.onMarkerFocusLeave;
  var value = Props.value;
  var mode = Props.mode;
  var readOnlyOpt = Props.readOnly;
  var lineNumbersOpt = Props.lineNumbers;
  var scrollbarStyleOpt = Props.scrollbarStyle;
  var lineWrappingOpt = Props.lineWrapping;
  var errors = errorsOpt !== undefined ? errorsOpt : [];
  var hoverHints = hoverHintsOpt !== undefined ? hoverHintsOpt : [];
  var readOnly = readOnlyOpt !== undefined ? readOnlyOpt : false;
  var lineNumbers = lineNumbersOpt !== undefined ? lineNumbersOpt : true;
  var scrollbarStyle = scrollbarStyleOpt !== undefined ? scrollbarStyleOpt : "overlay";
  var lineWrapping = lineWrappingOpt !== undefined ? lineWrappingOpt : false;
  var inputElement = React.useRef(null);
  var cmRef = React.useRef(undefined);
  var cmStateRef = React.useRef({
        marked: [],
        hoverHints: hoverHints
      });
  var windowWidth = Curry._1(useWindowWidth, undefined);
  var match = useHoverTooltip(cmStateRef, cmRef, undefined);
  var onMouseMove = match[2];
  var onMouseOut = match[1];
  var onMouseOver = match[0];
  React.useEffect((function () {
          var input = inputElement.current;
          if (input == null) {
            return ;
          }
          var options = {
            theme: "material",
            gutters: [
              errorGutterId,
              "CodeMirror-linenumbers"
            ],
            mode: mode,
            lineNumbers: lineNumbers,
            readOnly: readOnly,
            lineWrapping: lineWrapping,
            fixedGutter: false,
            scrollbarStyle: scrollbarStyle
          };
          var cm = Codemirror.fromTextArea(input, options);
          Belt_Option.forEach(minHeight, (function (minHeight) {
                  cm.getScrollerElement().style.minHeight = minHeight;
                  
                }));
          Belt_Option.forEach(maxHeight, (function (maxHeight) {
                  cm.getScrollerElement().style.maxHeight = maxHeight;
                  
                }));
          Belt_Option.forEach(onChange, (function (onValueChange) {
                  cm.on("change", (function (instance) {
                          return Curry._1(onValueChange, instance.getValue());
                        }));
                  
                }));
          cm.setValue(value);
          var wrapper = cm.getWrapperElement();
          Codemirror.on(wrapper, "mouseover", Curry.__1(onMouseOver));
          Codemirror.on(wrapper, "mouseout", Curry.__1(onMouseOut));
          Codemirror.on(wrapper, "mousemove", Curry.__1(onMouseMove));
          cmRef.current = Caml_option.some(cm);
          return (function (param) {
                    Codemirror.off(wrapper, "mouseover", Curry.__1(onMouseOver));
                    Codemirror.off(wrapper, "mouseout", Curry.__1(onMouseOut));
                    Codemirror.off(wrapper, "mousemove", Curry.__1(onMouseMove));
                    cm.toTextArea();
                    cmRef.current = undefined;
                    
                  });
        }), []);
  React.useEffect((function () {
          cmStateRef.current.hoverHints = hoverHints;
          
        }), [hoverHints]);
  var cm = cmRef.current;
  if (cm !== undefined) {
    var cm$1 = Caml_option.valFromOption(cm);
    if (cm$1.getValue() !== value) {
      var state = cmStateRef.current;
      cm$1.operation(function () {
            return updateErrors(state, onMarkerFocus, onMarkerFocusLeave, cm$1, errors);
          });
      cm$1.setValue(value);
    }
    
  }
  var errorsFingerprint = Belt_Array.map(errors, (function (e) {
            return "" + e.row + "-" + e.column;
          })).join(";");
  React.useEffect((function () {
          var state = cmStateRef.current;
          var cm = cmRef.current;
          if (cm !== undefined) {
            var cm$1 = Caml_option.valFromOption(cm);
            cm$1.operation(function () {
                  return updateErrors(state, onMarkerFocus, onMarkerFocusLeave, cm$1, errors);
                });
          }
          
        }), [errorsFingerprint]);
  React.useEffect((function () {
          var cm = Belt_Option.getExn(cmRef.current);
          cm.setOption("mode", mode);
          
        }), [mode]);
  React.useEffect((function () {
          var cm = cmRef.current;
          if (cm !== undefined) {
            Caml_option.valFromOption(cm).refresh();
          }
          
        }), [
        className,
        windowWidth
      ]);
  var tmp = {};
  if (className !== undefined) {
    tmp.className = Caml_option.valFromOption(className);
  }
  if (style !== undefined) {
    tmp.style = Caml_option.valFromOption(style);
  }
  return React.createElement("div", tmp, React.createElement("textarea", {
                  ref: inputElement,
                  className: "hidden"
                }));
}

var CM = {
  Options: {
    t: (function (prim0, prim1, prim2, prim3, prim4, prim5, prim6, prim7, prim8) {
        var tmp = {
          theme: prim0,
          mode: prim2
        };
        if (prim1 !== undefined) {
          tmp.gutters = Caml_option.valFromOption(prim1);
        }
        if (prim3 !== undefined) {
          tmp.lineNumbers = Caml_option.valFromOption(prim3);
        }
        if (prim4 !== undefined) {
          tmp.readOnly = Caml_option.valFromOption(prim4);
        }
        if (prim5 !== undefined) {
          tmp.lineWrapping = Caml_option.valFromOption(prim5);
        }
        if (prim6 !== undefined) {
          tmp.fixedGutter = Caml_option.valFromOption(prim6);
        }
        if (prim7 !== undefined) {
          tmp.scrollbarStyle = Caml_option.valFromOption(prim7);
        }
        return tmp;
      })
  }
};

var make$2 = CodeMirror;

export {
  $$Error ,
  HoverHint ,
  CM ,
  useWindowWidth ,
  make$2 as make,
  
}
/* tooltip Not a pure module */
