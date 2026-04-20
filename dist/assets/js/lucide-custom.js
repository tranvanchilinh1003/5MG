/**
 * @license lucide v0.544.0 - ISC
 * Custom Build - Chỉ chứa 25 icons đã sử dụng
 * Generated: 2026-04-20T09:19:57.895Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.lucide = {}));
})(this, (function (exports) { 'use strict';

  const defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  const createSVGElement = ([tag, attrs, children]) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach((name) => {
      element.setAttribute(name, String(attrs[name]));
    });
    if (children?.length) {
      children.forEach((child) => {
        const childElement = createSVGElement(child);
        element.appendChild(childElement);
      });
    }
    return element;
  };

  const createElement = (iconNode, customAttrs = {}) => {
    const tag = "svg";
    const attrs = {
      ...defaultAttributes,
      ...customAttrs
    };
    return createSVGElement([tag, attrs, iconNode]);
  };

  const getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});

  const getClassNames = (attrs) => {
    if (typeof attrs === "string") return attrs;
    if (!attrs || !attrs.class) return "";
    if (attrs.class && typeof attrs.class === "string") {
      return attrs.class.split(" ");
    }
    if (attrs.class && Array.isArray(attrs.class)) {
      return attrs.class;
    }
    return "";
  };

  const combineClassNames = (arrayOfClassnames) => {
    const classNameArray = arrayOfClassnames.flatMap(getClassNames);
    return classNameArray.map((classItem) => classItem.trim()).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index).join(" ");
  };

  const toPascalCase = (string) => string.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());

  const replaceElement = (element, { nameAttr, icons, attrs }) => {
    const iconName = element.getAttribute(nameAttr);
    if (iconName == null) return;
    const ComponentName = toPascalCase(iconName);
    const iconNode = icons[ComponentName];
    if (!iconNode) {
      return console.warn(
        `${element.outerHTML} icon name was not found in the provided icons object.`
      );
    }
    const elementAttrs = getAttrs(element);
    const iconAttrs = {
      ...defaultAttributes,
      "data-lucide": iconName,
      ...attrs,
      ...elementAttrs
    };
    const classNames = combineClassNames(["lucide", `lucide-${iconName}`, elementAttrs, attrs]);
    if (classNames) {
      Object.assign(iconAttrs, {
        class: classNames
      });
    }
    const svgElement = createElement(iconNode, iconAttrs);
    return element.parentNode?.replaceChild(svgElement, element);
  };

  const Palette = [
  [
    "path",
    {
      "d": "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
    }
  ],
  [
    "circle",
    {
      "cx": "13.5",
      "cy": "6.5",
      "r": ".5",
      "fill": "currentColor"
    }
  ],
  [
    "circle",
    {
      "cx": "17.5",
      "cy": "10.5",
      "r": ".5",
      "fill": "currentColor"
    }
  ],
  [
    "circle",
    {
      "cx": "6.5",
      "cy": "12.5",
      "r": ".5",
      "fill": "currentColor"
    }
  ],
  [
    "circle",
    {
      "cx": "8.5",
      "cy": "7.5",
      "r": ".5",
      "fill": "currentColor"
    }
  ]
];
  const X = [
  [
    "path",
    {
      "d": "M18 6 6 18"
    }
  ],
  [
    "path",
    {
      "d": "m6 6 12 12"
    }
  ]
];
  const ChevronDown = [
  [
    "path",
    {
      "d": "m6 9 6 6 6-6"
    }
  ]
];
  const Save = [
  [
    "path",
    {
      "d": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
    }
  ],
  [
    "path",
    {
      "d": "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"
    }
  ],
  [
    "path",
    {
      "d": "M7 3v4a1 1 0 0 0 1 1h7"
    }
  ]
];
  const RotateCcw = [
  [
    "path",
    {
      "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
    }
  ],
  [
    "path",
    {
      "d": "M3 3v5h5"
    }
  ]
];
  const Delete = [
  [
    "path",
    {
      "d": "M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"
    }
  ],
  [
    "path",
    {
      "d": "m12 9 6 6"
    }
  ],
  [
    "path",
    {
      "d": "m18 9-6 6"
    }
  ]
];
  const UserCog = [
  [
    "path",
    {
      "d": "M10 15H6a4 4 0 0 0-4 4v2"
    }
  ],
  [
    "path",
    {
      "d": "m14.305 16.53.923-.382"
    }
  ],
  [
    "path",
    {
      "d": "m15.228 13.852-.923-.383"
    }
  ],
  [
    "path",
    {
      "d": "m16.852 12.228-.383-.923"
    }
  ],
  [
    "path",
    {
      "d": "m16.852 17.772-.383.924"
    }
  ],
  [
    "path",
    {
      "d": "m19.148 12.228.383-.923"
    }
  ],
  [
    "path",
    {
      "d": "m19.53 18.696-.382-.924"
    }
  ],
  [
    "path",
    {
      "d": "m20.772 13.852.924-.383"
    }
  ],
  [
    "path",
    {
      "d": "m20.772 16.148.924.383"
    }
  ],
  [
    "circle",
    {
      "cx": "18",
      "cy": "15",
      "r": "3"
    }
  ],
  [
    "circle",
    {
      "cx": "9",
      "cy": "7",
      "r": "4"
    }
  ]
];
  const HelpCircle = [
  [
    "circle",
    {
      "cx": "12",
      "cy": "12",
      "r": "10"
    }
  ],
  [
    "path",
    {
      "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
    }
  ],
  [
    "path",
    {
      "d": "M12 17h.01"
    }
  ]
];
  const Menu = [
  [
    "path",
    {
      "d": "M4 5h16"
    }
  ],
  [
    "path",
    {
      "d": "M4 12h16"
    }
  ],
  [
    "path",
    {
      "d": "M4 19h16"
    }
  ]
];
  const Home = [
  [
    "path",
    {
      "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
    }
  ],
  [
    "path",
    {
      "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    }
  ]
];
  const Search = [
  [
    "path",
    {
      "d": "m21 21-4.34-4.34"
    }
  ],
  [
    "circle",
    {
      "cx": "11",
      "cy": "11",
      "r": "8"
    }
  ]
];
  const Sun = [
  [
    "circle",
    {
      "cx": "12",
      "cy": "12",
      "r": "4"
    }
  ],
  [
    "path",
    {
      "d": "M12 2v2"
    }
  ],
  [
    "path",
    {
      "d": "M12 20v2"
    }
  ],
  [
    "path",
    {
      "d": "m4.93 4.93 1.41 1.41"
    }
  ],
  [
    "path",
    {
      "d": "m17.66 17.66 1.41 1.41"
    }
  ],
  [
    "path",
    {
      "d": "M2 12h2"
    }
  ],
  [
    "path",
    {
      "d": "M20 12h2"
    }
  ],
  [
    "path",
    {
      "d": "m6.34 17.66-1.41 1.41"
    }
  ],
  [
    "path",
    {
      "d": "m19.07 4.93-1.41 1.41"
    }
  ]
];
  const Moon = [
  [
    "path",
    {
      "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
    }
  ]
];
  const Bell = [
  [
    "path",
    {
      "d": "M10.268 21a2 2 0 0 0 3.464 0"
    }
  ],
  [
    "path",
    {
      "d": "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
    }
  ]
];
  const CheckCircle = [
  [
    "path",
    {
      "d": "M21.801 10A10 10 0 1 1 17 3.335"
    }
  ],
  [
    "path",
    {
      "d": "m9 11 3 3L22 4"
    }
  ]
];
  const FileText = [
  [
    "path",
    {
      "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
    }
  ],
  [
    "path",
    {
      "d": "M14 2v4a2 2 0 0 0 2 2h4"
    }
  ],
  [
    "path",
    {
      "d": "M10 9H8"
    }
  ],
  [
    "path",
    {
      "d": "M16 13H8"
    }
  ],
  [
    "path",
    {
      "d": "M16 17H8"
    }
  ]
];
  const AlertTriangle = [
  [
    "path",
    {
      "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
    }
  ],
  [
    "path",
    {
      "d": "M12 9v4"
    }
  ],
  [
    "path",
    {
      "d": "M12 17h.01"
    }
  ]
];
  const LockKeyhole = [
  [
    "circle",
    {
      "cx": "12",
      "cy": "16",
      "r": "1"
    }
  ],
  [
    "rect",
    {
      "x": "3",
      "y": "10",
      "width": "18",
      "height": "12",
      "rx": "2"
    }
  ],
  [
    "path",
    {
      "d": "M7 10V7a5 5 0 0 1 10 0v3"
    }
  ]
];
  const LogOut = [
  [
    "path",
    {
      "d": "m16 17 5-5-5-5"
    }
  ],
  [
    "path",
    {
      "d": "M21 12H9"
    }
  ],
  [
    "path",
    {
      "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }
  ]
];
  const Trash2 = [
  [
    "path",
    {
      "d": "M10 11v6"
    }
  ],
  [
    "path",
    {
      "d": "M14 11v6"
    }
  ],
  [
    "path",
    {
      "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
    }
  ],
  [
    "path",
    {
      "d": "M3 6h18"
    }
  ],
  [
    "path",
    {
      "d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
    }
  ]
];
  const Loader2 = [
  [
    "path",
    {
      "d": "M21 12a9 9 0 1 1-6.219-8.56"
    }
  ]
];
  const Plus = [
  [
    "path",
    {
      "d": "M5 12h14"
    }
  ],
  [
    "path",
    {
      "d": "M12 5v14"
    }
  ]
];
  const Unlock = [
  [
    "rect",
    {
      "width": "18",
      "height": "11",
      "x": "3",
      "y": "11",
      "rx": "2",
      "ry": "2"
    }
  ],
  [
    "path",
    {
      "d": "M7 11V7a5 5 0 0 1 9.9-1"
    }
  ]
];
  const SquarePen = [
  [
    "path",
    {
      "d": "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
    }
  ],
  [
    "path",
    {
      "d": "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
    }
  ]
];
  const Copy = [
  [
    "rect",
    {
      "width": "14",
      "height": "14",
      "x": "8",
      "y": "8",
      "rx": "2",
      "ry": "2"
    }
  ],
  [
    "path",
    {
      "d": "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
    }
  ]
];

  var iconAndAliases = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Palette: Palette,
    X: X,
    ChevronDown: ChevronDown,
    Save: Save,
    RotateCcw: RotateCcw,
    Delete: Delete,
    UserCog: UserCog,
    HelpCircle: HelpCircle,
    Menu: Menu,
    Home: Home,
    Search: Search,
    Sun: Sun,
    Moon: Moon,
    Bell: Bell,
    CheckCircle: CheckCircle,
    FileText: FileText,
    AlertTriangle: AlertTriangle,
    LockKeyhole: LockKeyhole,
    LogOut: LogOut,
    Trash2: Trash2,
    Loader2: Loader2,
    Plus: Plus,
    Unlock: Unlock,
    SquarePen: SquarePen,
    Copy: Copy,
  });

  const createIcons = ({
    icons = iconAndAliases,
    nameAttr = "data-lucide",
    attrs = {},
    root = document
  } = {}) => {
    if (!Object.values(icons).length) {
      throw new Error(
        "Please provide an icons object.If you want to use all the icons you can import it like: import { createIcons, icons } from 'lucide'; lucide.createIcons({icons});"
      );
    }
    if (typeof root === "undefined") {
      throw new Error("`createIcons()` only works in a browser environment.");
    }
    const elementsToReplace = root.querySelectorAll(`[${nameAttr}]`);
    Array.from(elementsToReplace).forEach(
      (element) => replaceElement(element, { nameAttr, icons, attrs })
    );
    if (nameAttr === "data-lucide") {
      const deprecatedElements = root.querySelectorAll("[icon-name]");
      if (deprecatedElements.length > 0) {
        console.warn(
          "[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"
        );
        Array.from(deprecatedElements).forEach(
          (element) => replaceElement(element, { nameAttr: "icon-name", icons, attrs })
        );
      }
    }
  };

  exports.Palette = Palette;
  exports.X = X;
  exports.ChevronDown = ChevronDown;
  exports.Save = Save;
  exports.RotateCcw = RotateCcw;
  exports.Delete = Delete;
  exports.UserCog = UserCog;
  exports.HelpCircle = HelpCircle;
  exports.Menu = Menu;
  exports.Home = Home;
  exports.Search = Search;
  exports.Sun = Sun;
  exports.Moon = Moon;
  exports.Bell = Bell;
  exports.CheckCircle = CheckCircle;
  exports.FileText = FileText;
  exports.AlertTriangle = AlertTriangle;
  exports.LockKeyhole = LockKeyhole;
  exports.LogOut = LogOut;
  exports.Trash2 = Trash2;
  exports.Loader2 = Loader2;
  exports.Plus = Plus;
  exports.Unlock = Unlock;
  exports.SquarePen = SquarePen;
  exports.Copy = Copy;
  exports.icons = iconAndAliases;
  exports.createIcons = createIcons;

}));
// Auto Run lucide.createIcons() khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lucide.createIcons);
} else {
    lucide.createIcons();
}
//# sourceMappingURL=lucide-custom.js.map