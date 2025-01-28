"use client";

import { useTheme } from "next-themes";
import React from "react";

const ExampleComponent = () => {
  const { resolvedTheme } = useTheme();

  // Avoid rendering until the theme is resolved
  if (!resolvedTheme) return null;

  return (
    <div className={`bg-red-300 w-10 h-10 dark:bg-green-400`}>
      This box adapts to {resolvedTheme} mode.
    </div>
  );
};

export default ExampleComponent;