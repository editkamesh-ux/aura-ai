import { c as createLucideIcon, j as jsxRuntimeExports, d as cn } from "./index-CBgNZDlk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const sizeMap = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3"
};
function ProgressBar({
  value,
  className,
  showLabel = false,
  size = "md",
  animated = true
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("w-full", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "w-full rounded-full overflow-hidden bg-muted/50",
          sizeMap[size]
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "h-full rounded-full bg-primary transition-all duration-700 ease-out",
              animated && "shadow-glow"
            ),
            style: { width: `${clamped}%` }
          }
        )
      }
    ),
    showLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground mt-1 block", children: [
      clamped,
      "%"
    ] })
  ] });
}
export {
  ProgressBar as P,
  TrendingUp as T
};
