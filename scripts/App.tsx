import type { AppContext } from "@netless/window-manager";
import React from "react";

export interface AppProps {
  context: AppContext;
}
export default function App({ context }: AppProps) {
  context.addPage;

  return (
    <div className="tic-tac-toe"><h1>fdd</h1></div>
  );
}
