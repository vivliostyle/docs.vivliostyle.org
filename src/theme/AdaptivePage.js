import urljoin from "url-join";
import React from "react";
import { State, Observe } from "mdx-observable";
import Switch from "react-input-switch";

export const AdaptiveLink = ({ path, children }) => (
  <Observe>
    {({ isLocal }) => {
      const host = isLocal
        ? "http://localhost:8080"
        : "https://vivliostyle.org";
      return (
        <a href={`${host}/${path}`}>
          {children ? children : urljoin(host, path)}
        </a>
      );
    }}
  </Observe>
);

export function Layout({ children }) {
  return (
    <State initialState={{ isLocal: false }}>
      <div
        style={{
          border: "1px solid #aaa",
          borderRadius: "4px",
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <div style={{ marginRight: "10px" }}>Local Server Mode</div>
        <Observe>
          {({ setState, isLocal }) => (
            <Switch
              value={isLocal}
              onChange={checked => setState({ isLocal: checked })}
            />
          )}
        </Observe>
      </div>
      {children}
    </State>
  );
}
