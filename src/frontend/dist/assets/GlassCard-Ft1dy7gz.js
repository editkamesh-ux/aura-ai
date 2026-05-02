import { r as reactExports, j as jsxRuntimeExports, d as cn } from "./index-CBgNZDlk.js";
const paddingMap = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6"
};
const GlassCard = reactExports.forwardRef(
  ({
    className,
    glow = false,
    hover = false,
    padding = "md",
    children,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-ocid": "glass_card",
        className: cn(
          "glassmorphism rounded-xl transition-smooth",
          paddingMap[padding],
          glow && "gold-glow",
          hover && "gold-glow-hover cursor-pointer",
          className
        ),
        ...props,
        children
      }
    );
  }
);
GlassCard.displayName = "GlassCard";
export {
  GlassCard as G
};
